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
    	T.get('lists/statuses', {list_id: req.params.id}, function(err, data, response){
    		res.status(200).json(data);
    	});
    }
}
