const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileImg: String,
    coverImg: String,
    userName: String,
    bio: String,
    userEmail: String,
    website: String,
    address: String,
    status: {
        type: Number,
        default: 0
    }
});

const profileModel = mongoose.model('Profile', profileSchema);
module.exports = profileModel;