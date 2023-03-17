const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

module.exports = route;