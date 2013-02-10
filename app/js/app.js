'use strict';

angular.module('angularshowoff', ['angularshowoff.controllers',
                                  'angularshowoff.filters',
                                  'angularshowoff.services',
                                  'angularshowoff.directives',
                                  'deferreddata']).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:slideIndex',    {templateUrl: 'partials/slide.html', controller: 'SlideCtrl'});
        $routeProvider.otherwise({redirectTo: '/1'});
    }]);
