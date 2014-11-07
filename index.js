"use-strict";
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
    secret: process.env.EXPRESS_SECRET || '80087355',
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
app.get('/logout', auth.logout);

//Endpoints for getting lists and tweets
app.get('/api/lists', requireAuth, twitCtrl.getLists);
app.get('/api/list-tweets/:list_id/:since_id', requireAuth, twitCtrl.getListTweets);
app.get('/api/list-tweets/:list_id', requireAuth, twitCtrl.getListTweets);
app.get('/api/list-tweets-maxid/:list_id/:max_id', requireAuth, twitCtrl.getListTweetsByMaxId);
app.post('/api/retweet/:tweet_id', requireAuth, twitCtrl.retweet);
app.post('/api/favorite/:tweet_id', requireAuth, twitCtrl.favorite);



app.listen(process.env.EXPRESS_PORT || 9901, function() {
    console.log('Listening...' );
});
