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
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "https://admirable-quokka-c4bf0c.netlify.app", "https://sweet-dango-ca4344.netlify.app"], // Add your frontend domain here
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Connect to MongoDB
connectDB(mongouri);
// app.use(cookieParser());


// Routes
app.use('/user',userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 