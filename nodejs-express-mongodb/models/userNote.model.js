const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var noteSchema = new mongoose.Schema({
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Profile_id can\'t be empty'
    },
    bible_id: {
        type: String,
        required: 'Bible_ID can\'t be empty'
    },
    books_id: {
        type: String,
        required: 'Books_id can\'t be empty'
    },
    chapter_id: {
        type: String,
        required: 'Chapter_id can\'t be empty'
    },
    reference: {
        type: String
    },
    verses: {
        type: String
    },
    date: {
        type: Date
    },
    title: {
        type: String
    },
    notes: {
        type: String
    }
}, {timestamps: true});

// Custom vlidation for email


mongoose.model('userNote', noteSchema);