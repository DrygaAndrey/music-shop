const express = require('express');
const router = express.Router();
require('dotenv').config();
const crypto = require('crypto');
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// Rout to auth with Google

const tempCodes = new Map();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name, googleId: user.googleId, cart: user.cart, bookmarks: user.bookmarks },
        process.env.JWT_SECRET_CLIENT,
        { expiresIn: '1h' }
    );
};

router.get('/auth', (req, res) => {
    const url = req.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
    });
    res.json({ url });
});

router.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await req.oauth2Client.getToken(code);
        req.oauth2Client.setCredentials(tokens);

        const ticket = await req.oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, } = payload;


        // Searching by email or googleId
        let user = await User.findOne({ $or: [{ email }, { googleId }] });
        if (user) {
            if (!user.googleId) {//If we have user but he registered without google
                //we send message to him that he should authenticate with his email and password
                const tempCode = crypto.randomBytes(32).toString('hex');
                tempCodes.set(tempCode, "You've been registered with this email but without google services. Please login with your email and password.");
                return res.redirect(`${process.env.CLIENT_URL}/googleAuth/message/${tempCode}`);
            }
        }
        if (!user) {
            // If user is not exist in database, create new user
            user = new User({
                email,
                name,
                googleId,
                cart: [],
                bookmarks: [],
            });
            console.log('New user created, Name:', name, 'Email:', email, 'GoogleId:', googleId);
            await user.save();
        }
        console.log('User exist, Name:', name, 'Email:', email, 'GoogleId:', googleId);

        // Generate token
        const token = generateToken(user);
        const tempCode = crypto.randomBytes(32).toString('hex');

        tempCodes.set(tempCode, token);

        setTimeout(() => {
            tempCodes.delete(tempCode);
        }, 1 * 60 * 1000);// 1 minute

        res.redirect(`${process.env.CLIENT_URL}/googleAuth/${tempCode}`);
    } catch (error) {
        console.error('Error during Google auth:', error);
        res.status(500).json({ message: 'Server error', error: error.toString() });
    }
});

const mergeCartArrays = (dbCart, clientCart) => {
    const cartMap = new Map();

    dbCart.forEach(item => {
        cartMap.set(item.product.toString(), item.quantity);
    });

    clientCart.forEach(item => {
        const itemId = item.product.toString();
        if (cartMap.has(itemId)) {
            cartMap.set(itemId, Math.max(cartMap.get(itemId), item.quantity));
        } else {
            cartMap.set(itemId, item.quantity);
        }
    });

    return Array.from(cartMap, ([product, quantity]) => ({
        product: new mongoose.Types.ObjectId(product),
        quantity
    }));
};

router.post('/auth/exchange', async (req, res) => {
    const { code, bookmarks, cart } = req.body;
    if (!code || !tempCodes.has(code)) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }
    const token = tempCodes.get(code);

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_CLIENT);

    const userBookmarks = new Set(decodedUser.bookmarks);
    bookmarks.forEach(bookmark => userBookmarks.add(bookmark));

    const mergedCart = mergeCartArrays(decodedUser.cart, cart);

    await User.updateOne({ _id: decodedUser.id }, { $set: { bookmarks: Array.from(userBookmarks), cart: mergedCart } });

    tempCodes.delete(code);
    res.cookie('clientToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
    });

    res.json({ token, bookmarks: Array.from(userBookmarks), cart: mergedCart });
});

router.get('/auth/exchange/message', (req, res) => {
    const { code } = req.query;


    if (!code || !tempCodes.has(code)) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }

    const message = tempCodes.get(code);
    tempCodes.delete(code);
    res.json({ message });
});

module.exports = router;