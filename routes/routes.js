const express = require('express')
const router = express.Router();

// const User = require('../models/UserModel');

router.get('/', (req, res, next) => {
    let options = {
        title: 'this is main page'
    };
    res.render('index', {options: options})
});

module.exports = router;
