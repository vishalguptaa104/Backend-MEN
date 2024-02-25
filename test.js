const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/testing').then(()=>{console.log("DB CONNECTED");}).catch(error => console.log(error))

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        lastName: String,
    },
    email :{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type:String,
    },
    jobTitle : {
        type:String
    }
})

const User = mongoose.model('user',userSchema)

