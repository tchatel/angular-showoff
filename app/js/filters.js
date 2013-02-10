'use strict';
(function () {

var module = angular.module('angularshowoff.filters', []);

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