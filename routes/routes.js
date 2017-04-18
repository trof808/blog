const express = require('express')
const router = express.Router();
const Posts = require('../models/PostModel');

// const User = require('../models/UserModel');

let options = {
    title: 'this is main page',
    posts: {},
    justVizited: '',
    vizited: {},
    post: ''
};

const justVizited = (req, res, next) => {
  if(!!req.session.justVizited) {
    console.log('да')
    options.justVizited = req.session.justVizited;
    Posts.findById(req.session.justVizited, (err, post) => {
      if(err) console.log(err.stack);
      options.vizited = post;
      next();
    });
  } else {
    next();
  }
}

router.get('/', justVizited,  (req, res, next) => {

    Posts.find({}).sort({"date": "1"}).then((posts) => {
        options.posts = posts.map((post) => {
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
                    translation: post.translation,
                    links: post.links
                }
            });
        console.log(options);
        res.render('index', {options: options});
    }).catch(next);
});

router.get('/:links', (req, res, next) => {
  Posts.findOne({'links': req.params.links}).then((post) => {
    options.post = post
    res.render('post', {options: options});
  }).catch(next);
});

module.exports = router;
