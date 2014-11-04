angular.module('tweetDirective', [])

.directive('tweetView', function renderTweet() {
    return {
        restrict: 'EA',
        templateUrl: "/app/js/directives/tweetTemplate.html",
        scope: {
            tweetObj: "="
        },

        link: function(scope, element, attr) {
            // console.log(scope.tweetObj);

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

            scope.timeString = createTimeString();

        }
    };
});
