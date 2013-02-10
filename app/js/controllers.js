'use strict';
(function () {


var module = angular.module('angularshowoff.controllers', []);


module.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', 'Marked',
                             function ($scope, $rootScope, $http, $location, Marked) {

    $rootScope.slides = [];
    $rootScope.currentIndex = 0;
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

    $rootScope.$watch('source.text', function () {
        $rootScope.slides = Marked.parseSource($rootScope.source.text);
    });

    $rootScope.config = {
        title: "angular-showoff demo",
        sections: [
            {file: "essais/slides.md"},
            {file: "essais/essais.md"},
            {file: "svn/svn.md"},
            {file: "dvcs/dvcs.md"}
        ]
    };
    $rootScope.load = function () {
        $rootScope.source = Marked.loadSource($rootScope.config);
    };
    $rootScope.load();

}]);


module.controller('SlideCtrl', ['$scope', '$routeParams', '$rootScope',
                               function ($scope, $routeParams, $rootScope) {
    var slideNumber = parseInt($routeParams.slideIndex);
    var slideIndex = slideNumber > 0 ? slideNumber - 1 : 0;
    $rootScope.currentIndex = slideIndex;
}]);


})();

