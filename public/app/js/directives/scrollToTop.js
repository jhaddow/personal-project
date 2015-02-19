(function() {
    "use-strict";
    angular
        .module('scrollToTop', [])
        .directive('scrollToTop', function scrollToTop() {
            return {
                restrict: 'EA',
                link: scrollToTopLink
            };

            function scrollToTopLink(scope, elem, attr) {
                elem.on('click', function() {
                    var speed = attr.speed || 600;
                    console.log(speed);
                    $('html, body').animate({
                        scrollTop: 0
                    }, speed);
                });
            }
        });

})();
