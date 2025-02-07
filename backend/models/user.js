const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        // unique: true
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password:{
        type : String,
        required : true,
    },
    gender:{
        type : String,
        required : true,
    },
    phone:{
        type : Number,
        required : true,
    },
    address:{
        type : String,
        required : true,
    },
    city:{
        type : String,
        required : true,
    },
    state:{
        type : String,
        required : true,
    },
    pincode:{
        type: Number,
        required:true,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
