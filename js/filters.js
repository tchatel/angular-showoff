'use strict';
(function () {

var module = angular.module('angular-showoff.filters', []);

/*
 * Filters just the current slide, or all slide in 'showAll' mode
 */
module.filter('current', [function() {
    return function(slides, currentIndex, showAll) {
        if (slides) {
            if (showAll) {
                return slides;
            } else {
                return [slides[currentIndex]];
            }
        }
        return [];
    }
}]);

})();