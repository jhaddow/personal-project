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
                    $('html, body').animate({
                        scrollTop: 0
                    }, 600);
                });
            }
        });

})();
