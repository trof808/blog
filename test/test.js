const assert = require('assert');
const mongoose = require('mongoose');
const Post = require('../models/PostModel');
const config = require('../config');

describe("a test", function(){

  // ...

  it("should pass", function(done){

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
    // simulate async expecation
    setTimeout(function(){


      post.save();
      Post.findOne({'title': 'Тестовый пост'}, (err, post) => {
        if(err) done(err);
        done();
      })

    }, 10000);

  });

});

// describe('database testing', () => {
//
//     it('creates new post', (done) => {
//
//     let post = new Post({
//       title: 'Тестовый пост',
//       content: 'Тестовый контент тестового поста',
//       date: '18.04.2017',
//       image: 'test-post.png',
//       tags: ['js', 'py', 'node'],
//       likes: 12,
//       watches: 30,
//       comments: 2,
//       translation: true,
//       tutorial: false
//     })
//
//     post.save();
//
//     Post.findOne({'title': 'Тестовый пост'}, (err, post) => {
//       if(err) done(err);
//       done();
//     })
//
//   });
//
// });
