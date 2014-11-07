"use-strict";
var Twit = require('twit');
var T;

module.exports = {
    initialize: function(tokens) {

        T = new Twit(tokens);
    },

    getLists: function(req, res) {
        T.get('lists/list', {
            user_id: req.user.id
        }, function(err, data, response) {
            res.status(200).json(data);
        });
    },

    getListTweets: function(req, res) {
        var params = {};
        params.list_id = req.params.list_id;
        if (req.params.since_id) {
            params.since_id = req.params.since_id;
        }
        T.get('lists/statuses', params, function(err, data, response) {
            res.status(200).json(data);
        });
    },

    getListTweetsByMaxId: function(req, res) {
        var params = {};
        params.list_id = req.params.list_id;
        params.max_id = req.params.max_id;
        T.get('lists/statuses', params, function(err, data, response) {
            res.status(200).json(data);
        });
    },

    retweet: function(req, res) {
        T.post('statuses/retweet/' + req.params.tweet_id, {
            id: req.params.tweet_id
        }, function(err, data, response) {
            if (!err)
                res.status(200).json(data);
            else
                console.log(err);
        });
    },

    favorite: function(req, res) {

        T.post('favorites/create', {
            id: req.params.tweet_id
        }, function(err, data, response) {
            if (!err)
                res.status(200).json(data);
            else
                console.log(err);
        });
    }
};
