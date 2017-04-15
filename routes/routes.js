const express = require('express')
const router = express.Router();
const Posts = require('../models/PostModel');

// const User = require('../models/UserModel');

router.get('/', (req, res, next) => {
    let options = {
        title: 'this is main page',
        posts: {}
    };
    Posts.find({}).then((posts) => {
        options = {
            posts: posts.map((post) => {
                return {
                    title: post.title,
                    content: post.content,
                    description: post.getDecription(post.content),
                    date: post.date,
                    image: post.image,
                    tags: post.tags,
                    likes: post.likes,
                    watches: post.watches,
                    comments: post.comments,
                    translation: post.translation
                }
            })
        };
        res.render('index', {options: options});
    }).catch(next);

});

module.exports = router;
