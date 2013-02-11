'use strict';

describe('controllers', function () {
    beforeEach(module('angular-showoff.controllers', 'deferreddata'));
    beforeEach(module('angular-showoff.services', 'deferreddata'));

    var $httpBackend;
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/config.json').
            respond({
                "title": "presentation title",
                "sections": [
                    {"file": "data/dir1/src1.md"}
                ]
            });
        $httpBackend.expectGET('data/dir1/src1.md').
            respond("!SLIDE ===\n\n# Slide 1\n\n![](img.jpg)\n\n!SLIDE ===\n\n# Slide 2\n\n!SLIDE ===\n\n# Slide 3\n\n");
    }));

    describe('MainCtrl', function () {

        it('should load slides in controller', inject(function ($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('MainCtrl', {$scope: scope});
            expect($rootScope.slides.length).toBe(0);
            $httpBackend.flush();
            expect($rootScope.source.title).toEqual('presentation title');
            expect($rootScope.source.markdown).toMatch(/Slide 2/);
            expect($rootScope.slides.length).toBe(3);
        }));

        it('clicking on a slide in showAll mode should quit showAll mode', inject(function ($rootScope, $controller) {
            var scope = $rootScope.$new();
            var ctrl = $controller('MainCtrl', {$scope: scope});
            $httpBackend.flush();

            expect($rootScope.showAll).toBe(false);
            $rootScope.showAll = true;
            expect($rootScope.showAll).toBe(true);
            $rootScope.gotoSlide(1);
            expect($rootScope.showAll).toBe(false);
        }));

    });

});

