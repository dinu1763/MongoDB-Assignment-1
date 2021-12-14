const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
},{
    versionKey:false,
    timestamps:true,
});

userSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.checkPassword = function (password){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, function(err, same){
            if(err) return reject(err);
            return resolve(same);
        })
    })
}

const User = model('user', userSchema);
module.exports = User;