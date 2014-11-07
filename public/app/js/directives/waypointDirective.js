(function() {
    "use-strict";
    angular
        .module('waypointDirective', [])
        .directive('wayPoint', function twitWaypoint($window) {
            return {
                scope: {
                	request: '&'
                },
                link: function(scope, element, attrs) {
                    var e = jQuery(element[0]);
                    var doc = jQuery(document);
                    angular.element(document).bind('scroll', function() {
                        if (doc.scrollTop() + $window.innerHeight > e.offset().top) {
                            scope.request();
                        }
                    });
                }
            };
        });
})();
