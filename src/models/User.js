const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    background: {
        type: String,
        required: false,
    }
})

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

const User = mongoose.model('User', UserSchema)

module.exports = User