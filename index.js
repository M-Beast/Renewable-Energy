const express = require('express');
const session = require("express-session");
const path = require('path');
const app = express();
const Port = 3000; //server port

// The Defined routes
const routes = {
    main: require('./routes/index'),
    login: require('./routes/login'),
    signup: require('./routes/signup'),
    logout: require('./routes/logout'),
    payment: require('./routes/payment')
}

// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the express session password and configuration
app.use(session({
    secret: 'bf13044a-7ff5-4bd3-8ecb-c595ce87fa56',
    resave: false,
    saveUninitialized: false
}));

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname + '/public/css')));
app.use('/js', express.static(path.join(__dirname + '/public/js')));
app.use('/img', express.static(path.join(__dirname + '/public/img')));
app.use('/scss', express.static(path.join(__dirname + '/public/scss')));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

app.use(async function(req, res, next){
    req.user = req.session.user;
    next();
});

// App Routers
app.use('/', routes.main);
app.use('/login', routes.login);
app.use('/signup', routes.signup);
app.use('/logout', routes.logout);
app.use('/payment', routes.payment);

app.listen(Port, (err) => {
    if (err) console.log(`Error occurred while starting the server.\n${err}`);
    else console.log(`The Server is Listening on: ${Port}`);
})