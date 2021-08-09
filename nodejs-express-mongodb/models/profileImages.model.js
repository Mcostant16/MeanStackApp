const mongoose = require('mongoose');

var profileImagesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profile_id: {type: mongoose.Schema.Types.ObjectId,  
               required: 'Profile ID can\'t be empty'},
    description: {type: String },
    comment: {type: String },
    album: {type: String },
    image: {type: String}
}, {timestamps: true});




mongoose.model('profileImages', profileImagesSchema);