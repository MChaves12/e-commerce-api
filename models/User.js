const { Schema, model } = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        enum: ['admin', 'user'],
        default: 'user',
    }

},{timestamps: true});

module.exports = model('User', userSchema);
