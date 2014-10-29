var app = angular.module('twitterListViewer');

app.controller('listCtrl', function($scope, user, listService){
	listService.getLists()
		.then(function(data){
			$scope.lists = data;
			console.log($scope.lists);
		});

	$scope.user = user;

	$scope.getTweets = function(id){
		console.log(id);
		listService.getTweets(id)
			.then(function(data){
				$scope.tweets = data;
			});
	}
	
})