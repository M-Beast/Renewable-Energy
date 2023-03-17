const express = require('express');
const route = express.Router();
const DB = require('../Modules/UsersDB');

route.get('/', (req, res) => {
    res.render('signup');
});

route.post('/', (req, res) => {
    if (req.body.username && req.body.email && req.body.password && req.body.cfpassword) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const cfpassword = req.body.cfpassword;

        if (password != cfpassword) return res.render('signup', { error: "The password does not match!" });
        if (DB.UserExists(email)) return res.render('signup', { error: 'That email already registered!' });
        if (DB.UsernameExists(username)) return res.render('signup', { error: 'That username already exists!' });

        const User = DB.CreateUser(email, username, password);
        if (User) return res.redirect('login');
        else return res.render('signup', { error: 'Error occurred while signing up!' });
    }

    return res.render('signup');
});

module.exports = route;