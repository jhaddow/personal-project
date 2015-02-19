(function(){
	"use-strict";
	angular
	    .module('twitterListViewer', ['ngRoute', 'tweetDirective', 'waypointDirective', 'scrollToTop'])
	    .config(function($routeProvider, $httpProvider) {
	        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	        $httpProvider.interceptors.push('myHttpInterceptor');


	        $routeProvider.when('/', {
	            templateUrl: '/app/views/login.html'
	        }).when('/home', {
	            templateUrl: '/app/views/home.html',
	            controller: 'ListCtrl',
	            controllerAs: 'listCtrl',	
	            resolve: {
	                user: function(ListService) {
	                    return ListService.currentUser();
	                },
	                lists: function(ListService){
	                	return ListService.getLists();
	                }
	            }
	        }).otherwise({
	            redirectTo: '/'
	        });
	    })
	    .factory('myHttpInterceptor', function($q, $location) {
	        return {
	            responseError: function(rejection) {
	                if (rejection.status === 401) {
	                    $location.path('/');
	                    return;
	                }
	                return $q.reject(rejection);
	            }
	        };
	    });
})();