var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    request = require('request'),
    passport = require('passport'),
    auth = require('./lib/controllers/authCtrl'),
    twitCtrl = require('./lib/controllers/TwitCtrl');
    

//middleware for all endpoints
var app = express();
app.use(session({
    secret: '80087355',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//optional middleware to check authentication state
var requireAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).end();
    }
    return next();
};

//Set tokens for passport session
passport.use(auth.strategy);

//serialize user for some reason
passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(obj, done) {
    return done(null, obj);
});

//authentication endpoints
app.get('/auth/twitter', auth.authenticate);
app.get('/auth/twitter/callback', auth.authenticate);
app.get('/api/current-user', requireAuth, auth.currentUser);

//Endpoints for getting lists and tweets
app.get('/api/lists', requireAuth, twitCtrl.getLists);
app.get('/api/list-tweets/:list_id/:since_id', requireAuth, twitCtrl.getListTweets);
app.get('/api/list-tweets/:list_id', requireAuth, twitCtrl.getListTweets);


app.listen(9901, function() {
    console.log('Listening on port 9901');
});
