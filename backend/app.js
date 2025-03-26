const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { db } = require('./db/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

db();
app.listen(process.env.PORT, () => console.log("Server running"));
