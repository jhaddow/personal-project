angular.module('twitterListViewer')
    .controller('listCtrl', function listCtrl($scope, user, listService) {
        $scope.user = user;
        $scope.listId = '';
        $scope.tweets = [];

        listService.getLists()
            .then(function(data) {
                $scope.lists = data;
                console.log($scope.lists);
            });
        $scope.getTweets = function(list_id, since_id) {
            listService.getTweets(list_id, since_id)
                .then(function(data) {
                    if (data.length > 0) {
                        if (since_id && (data[0].id !== $scope.tweets[0].id)) {
                            $scope.tweets = data.concat($scope.tweets);
                            console.log('data[0] id: ' + data[0].id);
                            console.log('tweets[0].id: ' + $scope.tweets[0].id);
                            console.log('since_id: ' + since_id);
                        } else if ($scope.listId !== list_id || !$scope.tweets) {
                            $scope.listId = list_id;
                            $scope.tweets = data;
                        }
                    }


                });
        };


        setInterval(function() {
            if ($scope.listId) {
                console.log('getting tweets again: \n list: ' + $scope.listId + ' \ntweet: ' + $scope.tweets[0].id);
                $scope.getTweets($scope.listId, $scope.tweets[0].id);
            }
        }, 1000 * 60);

    });
