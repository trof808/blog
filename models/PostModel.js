const mongoose = require('mongoose');

const PostScheme = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    description: {type: String},
    links: {type: String},
    date: { type: String },
    image: {type: String},
    tags: { type: Array},
    likes: { type: Number },
    watches: {type: String},
    comments: { type: Number },
    translation: { type: Boolean, default: false },
    tutorial: {type: Boolean, default: false}
});

PostScheme.virtual('link').get(() => {
  return this.title.split(' ').join('_').toLowerCase();
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

PostScheme.set('toObject', { getters: true, setters: true, virtual: true });
PostScheme.set('toJSON', { getters: true, setters: true, virtual: true });

Post = mongoose.model('Post', PostScheme);

module.exports = Post;
