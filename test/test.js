const assert = require('assert');
const mongoose = require('mongoose');
const Post = require('../models/PostModel');
const config = require('../config');

describe('Creating new post', () => {

  it('creates new post', (done) => {

    let post = new Post({
      title: 'Тестовый пост',
      content: 'Тестовый контент тестового поста',
      date: '18.04.2017',
      image: 'test-post.png',
      tags: ['js', 'py', 'node'],
      likes: 12,
      watches: 30,
      comments: 2,
      translation: true,
      tutorial: false
    });

    post.save().then(() => {
      Post.findOne({'title': 'Тестовый пост'}).then((post, done) => {
        assert(post);
      }).catch(done);
    }).then(done, done);

  });

});
