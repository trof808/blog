const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    authId: {
      type: String
    },
    username: {
        type: String,
        required: [true, 'field name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'field email is required']
    },
    role: {
      type: String
    },
    created: {
      type: Date
    }
});

module.exports = mongoose.model('User', UserScheme);
