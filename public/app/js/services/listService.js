var app = angular.module('twitterListViewer');

app.service('listService', function($http, $q){

	this.currentUser = function(){
		var deferred = $q.defer();
		$http.get('/api/current-user')
			.then(function(response){
				
				deferred.resolve(response.data);
			});

		return deferred.promise;
	};

	this.getLists = function() {
		var deferred = $q.defer();
		$http.get('/api/lists')
			.then(function(response){
				deferred.resolve(response.data);
			});

		return deferred.promise;
	};

	this.getTweets = function(list_id, since_id){
		var deferred = $q.defer();
		var endpoint = 'api/list-tweets/' + list_id;
		if(since_id){
			endpoint = endpoint + '/' + since_id;
		}
		$http.get(endpoint)
			.then(function(response){
				deferred.resolve(response.data);
			});
		return deferred.promise;
	};
});