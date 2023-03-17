const express = require('express');
const route = express.Router();
const DB = require('../Modules/UsersDB');

route.get('/', (req, res) => {
    res.render('login');
});

route.post('/', (req, res) => {
    if (req.body.username && req.body.password) {
        const username = req.body.username;
        const password = req.body.password;

        if (!DB.UsernameExists(username)) return res.render('login', { error: 'Invalid Username!' });

        const User = DB.GetUser(username, password);
        if (User) {
            // Update session
            req.session.user = User;

            // return to home
            return res.redirect('/');
        }
        else {
            return res.render('login', { error: 'Incorrect Username or Password!' });
        }
    }
    
    return res.render('login');
});

module.exports = route;