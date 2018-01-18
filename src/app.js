const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

//local dependencies
const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');
const api = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(session({
	secret: 'session-secret',
	resave: 'false',
	saveUninitialized: 'true',
}));

//set up passport
app.use(passport.initialize());
app.use(passport.session());

//authentification routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate(
    'facebook',
    { failureRedirect: '/' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.use('/', views);
app.use('/api', api); // for when we're ready
app.use('/static', express.static('public'));

//404 error handler
app.use(function(req, res, next){
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//route error handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.send({
		status: err.status,
		message: err.message,
	});
});

// port config
const port = 3000;
const server = http.Server(app);
server.listen(port, function() {
  console.log('Server running on port: ' + port);
});