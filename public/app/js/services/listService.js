var app = angular.module('twitterListViewer');

app.service('listService', function($http, $q){

	this.currentUser = function(){
		var deferred = $q.defer();
		$http.get('/api/current-user')
			.then(function(response){
				
				deferred.resolve(response.data);
			});

		return deferred.promise;
	}

	this.getLists = function() {
		var deferred = $q.defer();
		$http.get('/api/lists')
			.then(function(response){
				deferred.resolve(response.data);
			})

		return deferred.promise;
	}

	this.getTweets = function(id){
		var deferred = $q.defer();
		$http.get('api/list-tweets/' + id)
			.then(function(response){
				deferred.resolve(response.data);
			})
		return deferred.promise;
	}
})