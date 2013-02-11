'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
    beforeEach(module('angular-showoff.directives'));

    describe('pre', function () {

        it('should add prettyprint class', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<pre>...</pre>')($rootScope);
                expect(element.hasClass('prettyprint')).toBe(true);
            });

        });

        it('should prevent compiling <pre> element content', function () {
            inject(function ($compile, $rootScope) {
                var element = $compile('<pre>a{{b}}c</pre>')($rootScope);
                expect(element.hasClass('ng-binding')).toBe(false);
            });
        });

    });

    describe('includeContent', function () {

        it('should include text template', function () {
            inject(function ($compile, $rootScope) {
                var scope = $rootScope.$new();
                scope.slide = {content: '<span>ok</span>'};
                var element = $compile('<div><div include-content="slide.content"></div></div>')(scope);
                // TODO
            });
        });

    });


});
