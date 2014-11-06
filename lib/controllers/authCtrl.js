//Passport Modules
var TwitterStrategy = require('passport-twitter').Strategy,
    passport = require('passport');
TwitCtrl = require('./TwitCtrl');
//API Keys
var tokens = {};
tokens.consumer_key = '71X5pnw5f3j4joC2OIiRXqW6V';
tokens.consumer_secret = 'yzEEirfGIQshJvsOHp2RP4kRdnQU47gXMHnWPFIHXe2G7vNaaz';

module.exports = {
    strategy: new TwitterStrategy({
        consumerKey: tokens.consumer_key,
        consumerSecret: tokens.consumer_secret,
        callbackURL: "/auth/twitter/callback"
    }, function(token, tokenSecret, profile, done) {
        tokens.access_token = token;
        tokens.access_token_secret = tokenSecret;
        TwitCtrl.initialize(tokens);
        return done(null, profile);
    }),

    authenticate: passport.authenticate('twitter', {
        successRedirect: '/#/home',
        failureRedirect: '/'
    }),

    currentUser: function(req, res) {
        return res.status(200).json(req.user);
    }

};
