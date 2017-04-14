const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'field password is required']
    }
});

module.exports = mongoose.model('Post', PostScheme);
