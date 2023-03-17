const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    req.session.destroy(function(err) {
        if (err) console.log(err);
        res.redirect('/');
    });
});

module.exports = route;