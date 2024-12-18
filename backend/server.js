const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

const app = express();
const PORT = 3001;

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    "http://localhost:3000",
    "http://localhost:3002"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const db = require('./db');

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Adding oauth2Client to request so it can be used in routes
app.use((req, res, next) => {
    req.oauth2Client = oauth2Client;
    next();
});

console.log("Allowed:", allowedOrigins);

app.use('/api', require('./routes/api'));

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});