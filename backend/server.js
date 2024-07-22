require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const Grid = require('gridfs-stream');
// const mongoose = require('mongoose');



const app = express();
const PORT = 3001;

const allowedOrigins = [
    'https://music-shop-client.vercel.app',
    'https://music-shop-admin-panel.netlify.app',
    'http://localhost:3000',
    'http://localhost:3000',
];

console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('ADMIN_URL:', process.env.ADMIN_URL);
console.log('DEV_ADMIN_URL:', process.env.DEV_ADMIN_URL);
console.log('DEV_CLIENT_URL:', process.env.DEV_CLIENT_URL);


const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin); // Логируем заблокированные запросы
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};



// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
// };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const db = require('./db');

// let gfs;
// db.once('open', () => {
//     gfs = Grid(db.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

app.use('/api', require('./routes/api'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});