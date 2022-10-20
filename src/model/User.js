const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value =>{
            if(!validator.isEmail(value)) {
                throw new Error({error: "Invalid Email address"});
            }
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 7
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
});

userSchema.pre("save", async function(next) {
    // Hash password
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findByCredentinals = async(email, password) =>{
    // Search for a user by email and password.
    const user = await User.findOne({email});
    if (!user) {
        throw new Error({error: "invalid login credentials"});
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        throw new Error({ error: "invalid login credentials" });
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports= User;