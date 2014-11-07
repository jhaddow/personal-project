(function() {
    "use-strict";
    angular
        .module('twitterListViewer')
        .service('ListService', function ListService($http, $q) {
            this.getLists = getLists;
            this.getTweets = getTweets;
            this.currentUser = currentUser;
            this.send_retweet = send_retweet;
            this.send_favorite = send_favorite;

            function getLists() {
                var deferred = $q.defer();
                $http.get('/api/lists')
                    .then(function(response) {
                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }

            function getTweets(list_id, since_id) {
                var deferred = $q.defer();
                var endpoint = 'api/list-tweets/' + list_id;
                if (since_id) {
                    endpoint = endpoint + '/' + since_id;
                }
                $http.get(endpoint)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            function currentUser() {
                var deferred = $q.defer();
                $http.get('/api/current-user')
                    .then(function(response) {

                        deferred.resolve(response.data);
                    });

                return deferred.promise;
            }


            function send_retweet(tweet_id) {
                var deferred = $q.defer();
                $http.post('/api/retweet/' + tweet_id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }

            function send_favorite(tweet_id) {
                var deferred = $q.defer();
                $http.post('/api/favorite/' + tweet_id)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    });
                return deferred.promise;
            }
        });
})();
