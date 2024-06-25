// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello I am Up!");
})
// Register auth routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
            // print success message once the connection is established.
            console.log("connection established");
        });
    })
    .catch((err) => {
        console.log(err);
    });


