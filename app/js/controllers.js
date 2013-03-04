'use strict';
(function () {


var module = angular.module('angular-showoff.controllers', []);


module.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', 'Presentation', '$window',
                             function ($scope, $rootScope, $http, $location, Presentation, $window) {

    var configPath = $window['angular-showoff-config-path'] || 'data/config.json';

    $rootScope.slides = [];
    $rootScope.currentIndex = 0; // internal index for first slide is 0 (but #/1 in url, it's more user friendly)
    $rootScope.showAll = false;
    $rootScope.allZoom = 1;
    $rootScope.showHelp = false;
    $rootScope.showFooter = false;
    $rootScope.showSource = false;
    $rootScope.blackBackground = false;
    $rootScope.fontSize = 100;

    $rootScope.gotoSlide = function (index) {
        if ($rootScope.showAll) {
            $rootScope.showAll = false;
            $location.path('/' + (index + 1));
        }
    };

    $rootScope.$watch('source.markdown', function () {
        $rootScope.slides = Presentation.parseSource($rootScope.source.markdown);
    });

    $rootScope.load = function () {
        $rootScope.source = Presentation.loadSource(configPath);
    };
    $rootScope.load();

}]);

/*
 * Just sets the current slide index
 */
module.controller('SlideCtrl', ['$scope', '$routeParams', '$rootScope',
                               function ($scope, $routeParams, $rootScope) {
    var slideNumber = parseInt($routeParams.slideIndex);
    var slideIndex = slideNumber > 0 ? slideNumber - 1 : 0;
    $rootScope.currentIndex = slideIndex;
}]);


})();

