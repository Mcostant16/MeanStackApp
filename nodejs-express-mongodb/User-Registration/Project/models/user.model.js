const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4, 'Password must be at least 4 character long']
    },
    role: {
        type: String,
        required: 'Role can\'t be empty',
        minlength : [4, 'Role must be at least 4 character long']
    },
    first_name: {
        type: String,
        required: 'Role can\'t be empty',
        minlength : [4, 'Role must be at least 4 character long']
    },
    last_name: {
        type: String,
        required: 'Role can\'t be empty',
        minlength : [4, 'Role must be at least 4 character long']
    },
    role: {
        type: String,
        required: 'Role can\'t be empty',
        minlength : [4, 'Role must be at least 4 character long']
    },
    mobile: {
        type: Number,
        required: 'Role can\'t be empty',
        minlength : [7, 'Phone must be at least 7 digits long']
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    gender: {
        type: String
    },
    department: {
        type: String
    },
    dob: {
        type: Date
    },
    isActive: {
        type: Boolean
    },
    saltSecret: String
});

// Custom vlidation for email
userSchema.path('email').validate((val) => {
    emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
},  'Invalid email.');
//Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

mongoose.model('User', userSchema);