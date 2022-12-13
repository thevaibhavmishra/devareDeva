const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a name" ],
        minlength:4
    },

    
    email: {
        type: String,
        required: [true, "Email must be present"],
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },

    password: {
        type: String,
        required: true
    },

    confirm_password: {
        type: String,
        required: true
    },

    phone: Number,

    age : Number,

    payment: {
        status: Boolean,
        slot: String,
        date: Number
    }

}, {timestamps: true})

// userSchema.plugin(uniqueValidator)

userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.confirm_password = this.password;
    }

    next();
})


userSchema.methods.generateAuthToken = async function(next){

    try{
        const token = jwt.sign({_id: this._id.toString(), role: this.role},"MySuperSecretKey123", {expiresIn: '1d'} );
        return token;
    }catch(err){

        console.log("The Error part "+err);
        response.send("The Error part "+err);
    }
    next();
}

const User = new mongoose.model("user",userSchema);

module.exports = User