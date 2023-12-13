const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    nombreCompleto:{
        type:String,
        required:true
    },
    Cedula:{
        type:Number,
        required:true
    },
    Edad:{
        type:Number,
        required:true
    },
    Especialidad:{
        type:String,
        required:true
    },
    Provincia:{
        type:String,
        required:true
    },
    FechaIngreso:{
        type:String,
        required:true
    },
    PasswordMaestro:{
        type:String,
        required:true
    }
})

const UserDB = mongoose.model('maestrodb',schema);

module.exports = UserDB;