const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('payment', { user: req.user });
});

module.exports = route;