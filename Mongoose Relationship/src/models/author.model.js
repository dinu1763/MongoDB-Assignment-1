const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    "first_name" : {type: String, require:true},
    "last_name":{type: String, require:false},
},{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model('author', authorSchema);