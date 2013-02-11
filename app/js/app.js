'use strict';

angular.module('angular-showoff', ['angular-showoff.controllers',
                                  'angular-showoff.filters',
                                  'angular-showoff.services',
                                  'angular-showoff.directives',
                                  'deferreddata']).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:slideIndex',    {templateUrl: 'partials/slide.html', controller: 'SlideCtrl'});
        $routeProvider.otherwise({redirectTo: '/1'});
    }]);
