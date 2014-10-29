var app = angular.module('twitterListViewer', ['ngRoute']);
app.config(function($routeProvider, $httpProvider){
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');


	$routeProvider.when('/', {
	     templateUrl: '/app/views/login.html'
	}).when('/home', {
		templateUrl: '/app/views/home.html',
		controller: 'listCtrl',
		resolve: {
			user: function(listService) {
				return listService.currentUser();
			}
		}
	}).otherwise({
		redirectTo: '/'
	});
});

app.factory('myHttpInterceptor', function($q, $location){
	return{
		'responseError': function(rejection){
			if(rejection.status === 401){
				$location.path('/');
				return;
			}
			return $q.reject(rejection);
		}
	};
});