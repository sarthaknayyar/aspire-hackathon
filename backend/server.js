require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {connectDB} = require('./connection');
const mongouri = process.env.MONGO_URI;
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser');



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(mongouri);
app.use(cookieParser());


// Routes
app.use('/user',userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 