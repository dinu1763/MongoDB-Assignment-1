const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    first_name : {type: String, required:true},
    last_name : {type: String, required:true},
    gender : {type: String, required:true},
    dob : {type: Date, required:true},
},{
    versionKey:false,
    timestamps:true
});


module.exports = mongoose.model('user', userSchema); //users collection