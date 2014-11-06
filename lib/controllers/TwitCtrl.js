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
        if(req.params.since_id){
            params.since_id = req.params.since_id;
        }
    	T.get('lists/statuses', params, function(err, data, response){
    		res.status(200).json(data);
    	});
    }
};
