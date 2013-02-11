'use strict';

/* jasmine specs for services go here */

describe('services', function () {
    beforeEach(module('angular-showoff.services', 'deferreddata'));

    describe('Util', function () {
        it('should return current version', inject(function (Util) {
            expect(Util.trim('      a b  c  ')).toEqual('a b  c');
        }));
    });

    describe('Presentation', function () {

        it('should add images path', inject(function (Presentation, $httpBackend) {
            $httpBackend.expectGET('data/config.json').
                respond({
                    "title": "presentation title",
                    "sections": [
                        {"file": "data/dir1/src1.md"}
                    ]
                });
            $httpBackend.expectGET('data/dir1/src1.md').
                respond("!SLIDE ===\n\n# Slide 1\n\n![](img.jpg)");

            var source = Presentation.loadSource('data/config.json');
            $httpBackend.flush();
            expect(source.title).toEqual('presentation title');
            expect(source.markdown).toMatch(/# Slide 1/);
            expect(source.markdown.indexOf('![](data/dir1/img.jpg)') != 1).toBe(true);
        }));

        it('should read all source files defined in config file', inject(function (Presentation, $httpBackend) {
            $httpBackend.expectGET('data/config.json').
                respond({
                    "title": "presentation title",
                    "sections": [
                        {"file": "data/dir1/src1.md"},
                        {"file": "data/dir2/src2.md"}
                    ]
                });
            $httpBackend.expectGET('data/dir1/src1.md').
                respond("!SLIDE ===\n\n# Slide 1");
            $httpBackend.expectGET('data/dir2/src2.md').
                respond("!SLIDE ===\n\n# Slide 2");

            var source = Presentation.loadSource('data/config.json');
            $httpBackend.flush();
            expect(source.title).toEqual('presentation title');
            expect(source.markdown).toMatch(/# Slide 1/);
            expect(source.markdown).toMatch(/# Slide 2/);
        }));

        it('should split in slides with right classes', inject(function (Presentation) {
            var source = "!SLIDE ===\n\n# Slide 1\n\n!SLIDE code ===\n\n# Slide 2\n\n!SLIDE left small\n\n* Slide 3\n* is a list\n";
            var slides = Presentation.parseSource(source);

            expect(slides.length).toBe(3);
            expect(slides[0].index).toBe(0);
            expect(slides[0].info).toEqual('');
            expect(slides[0].content).toMatch('<h1>Slide 1</h1>');
            expect(slides[1].index).toBe(1);
            expect(slides[1].info).toEqual('code');
            expect(slides[1].content).toMatch('<h1>Slide 2</h1>');
            expect(slides[2].index).toBe(2);
            expect(slides[2].info).toEqual('left small');
            expect(slides[2].content).toMatch('<ul>');
        }));

    });

});
