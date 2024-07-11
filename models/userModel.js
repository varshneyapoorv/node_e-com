const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is required']
    },
    email:{
        type: String,
        required:[true, 'email is required'],
        unique:[true, 'email already taken']
    },
    password:{
        type: String,
        required:[true,'password is required'],
        minilength:[6,'password length is greater than 6 character']
    },
    address:{
        type:String,
        require:[true, 'adress is required'],
    },
    city:{
        type:String,
        required:[true,'city name is required']
    },
    country:{
        type: String,
        required: [true,'country name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required']
    },
    profilePic:{
        type:String,
    },
},{timestamps:true});

// for hash

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next()
})
// compare function
userSchema.methods.comparePassword = async function(plainPassword){
    return await bcrypt.compare(plainPassword, this.password)
}

const User = mongoose.model("Users", userSchema);
module.exports =  User;

