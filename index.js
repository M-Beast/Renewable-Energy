const express = require('express');
const path = require('path');
const app = express();
const Port = 3000; //server port

// The Defined routes
const routes = {
    main: require('./routes/index')
}

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname + '/public/css')));
app.use('/js', express.static(path.join(__dirname + '/public/js')));
app.use('/img', express.static(path.join(__dirname + '/public/img')));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);

// App Routers
app.use('/', routes.main);

app.listen(Port, (err) => {
    if (err) console.log(`Error occurred while starting the server.\n${err}`);
    else console.log(`The Server is Listening on: ${Port}`);
})