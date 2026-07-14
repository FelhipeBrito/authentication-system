const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(helmet());

const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://192.168.1.8:5500'
];

app.use(
    cors({

        origin(origin, callback) {

            // Permite ferramentas que não enviam Origin,
            // como Postman e curl.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            callback(
                new Error('Origem não permitida pelo CORS')
            );
        }

    })
);


app.use(express.json());

app.use('/auth', authRoutes);

module.exports = app;