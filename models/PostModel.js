const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'field name is required'],
      unique: true
    },
    link: {
      type: String,
      required: [true, 'field email is required']
    },
    subs: {
      type: Number,
      default: 0
    }
});

const PostScheme = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    description: {type: String},
    date: { type: String },
    image: {type: String},
    tags: {type: Array},
    likes: { type: Number },
    watches: {type: String},
    comments: { type: Number },
    translation: { type: Boolean, default: false },
    tutorial: {type: Boolean, default: false}
});

PostScheme.methods.getDecription = (content) => {
    return content.split(' ').splice(0, 40).join(' ') + '...';
};

PostScheme.methods.getCorrectDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    monthIndex = monthIndex.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }

    let nowDate = day + '.' + monthIndex + '-' + year;

    return nowDate;
};

Post = mongoose.model('Post', PostScheme);
Category = mongoose.model('Category', CategoryScheme);

module.exports = Post;
