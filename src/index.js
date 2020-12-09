const express = require('express');
const app = express();
const path = require('path');

//APP SETTINGS
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//MIDDLEWARES

//ROUTES
app.get('/', (req, res) => {
    res.render('index.html');
});

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//LISTENING SERVER
app.listen(app.get('port'), () => {
    console.log('Server on Port ', app.get('port'));
});
