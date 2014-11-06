(function() {
    "use-strict";

    angular
        .module('tweetDirective', ['ngSanitize'])
	    .directive('tweetView', function renderTweet() {
	        return {
	            restrict: 'EA',
	            templateUrl: "/app/js/directives/tweetTemplate.html",
	            scope: {
	                tweetObj: "="
	            },

	            link: TweetLink,
	            controller: TweetCtrl,
	            // controllerAs: 'tweetCtrl'
	        };

	        function TweetLink(scope, element, attr) {
	                console.log(scope.tweetObj);
	                scope.timeString = createTimeString();
	                scope.tweetText = renderLinks(scope.tweetObj.text);
	                scope.retweet_count = scope.tweetObj.retweet_count || '';
	                scope.favorite_count = scope.tweetObj.favorite_count || '';
	                scope.retweeted = scope.tweetObj.retweeted;
	                scope.favorited = scope.tweetObj.favorited;

	                function createTimeString() {
	                        var timeLapse = Date.now() - Date.parse(scope.tweetObj.created_at);


	                        var hours = Math.floor(timeLapse / (1000 * 60 * 60));
	                        var mins = Math.floor(timeLapse / (1000 * 60));
	                        var seconds = Math.floor(timeLapse / (1000));

	                        if (hours > 0)
	                            return hours + 'h';
	                        if (mins > 0)
	                            return mins + 'm';
	                        if (seconds > 0)
	                            return seconds + 's';
	                    }
	                
	                function renderLinks(str) {
	                	var arr = str.split(' ');
	                	var urlRE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
	                	for(var i = 0; i < arr.length; i++){
	                		if(urlRE.test(arr[i])){
	                			var linkStr = '<a href="'+arr[i]+'">' + arr[i] + '</a>';
	                			arr[i] = linkStr;
	                		}
	                	}
	                	return arr.join(' ');
	                }
	            }

	            function TweetCtrl(ListService) {
	            	var vm = this;

	            }
    	});
})();
