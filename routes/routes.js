const express = require('express')
const router = express.Router();
const Posts = require('../models/PostModel');

// const User = require('../models/UserModel');

router.get('/', (req, res, next) => {
    let options = {
        title: 'this is main page',
        posts: {},
        justVizited: '',
        vizited: {}
    };
    // if(req.session.justVizited) {
    //   console.log('да')
    //   options.justVizited = req.session.justVizited;
    //   Posts.findById(req.session.justVizited).then((post) => {
    //     options.vizited = post;
    //   }).catch(next);
    // }
    Posts.find({}).sort({"date": "1"}).then((posts) => {
        options = {
            posts: posts.map((post) => {
                return {
                    id: post._id,
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

router.get('/:id', (req, res, next) => {
  req.session.justVizited = req.params.id;
  let options = {};
  Posts.findById(req.params.id).then((post) => {
    options = {
      post: post
    }
    res.render('post', {options: options});
  }).catch(next);
});

module.exports = router;
