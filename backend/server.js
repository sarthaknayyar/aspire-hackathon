require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {connectDB} = require('./connection');
const mongouri = process.env.MONGO_URI;
const userRouter = require('./routers/user');
const grievanceRouter = require('./routers/grievance');
const cookieParser = require('cookie-parser');
// const { checkLogin } = require("./middlewares/auth");
// const dotenv = require('dotenv');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// dotenv.config();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Add your frontend domain here
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Connect to MongoDB
connectDB(mongouri);
// app.use(cookieParser());


// Routes
app.use('/user', userRouter);
app.use('/grievance', grievanceRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
