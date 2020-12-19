const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const apiRoutes = require('./routes');
const path = require('path');
const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', apiRoutes);
app.listen(app.get('port'), () => {
    console.log(`server running on ${app.get('port')}`);
});