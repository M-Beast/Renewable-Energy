const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('login');
});

module.exports = route;