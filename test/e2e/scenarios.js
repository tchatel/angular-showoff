'use strict';

describe('angular-showoff', function () {

    beforeEach(function () {
        browser().navigateTo('../../app/index.html');
    });


    it('should automatically redirect to /1 when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe("/1");
    });

    /* These tests depend on slides in data directory */

    describe('Slide 1', function () {
        beforeEach(function () {
            browser().navigateTo('#/1');
        });
        it('should render slide 1', function () {
            expect(element('h1').text()).toMatch(/angular-showoff slides/);
        });
        it('should render italic word', function () {
            expect(element('h3 em').text()).toMatch(/subsection/);
        });
    });

    describe('Slide 2', function () {
        beforeEach(function () {
            browser().navigateTo('#/2');
        });
        it('should render slide 2', function () {
            expect(element('h1').text()).toMatch(/Keyboard/);
        });
        it('should render table', function () {
            expect(element('table tr:first-child td:first-child').text()).toMatch(/space/);
        });
    });

    describe('Slide 3', function () {
        beforeEach(function () {
            browser().navigateTo('#/3');
        });
        it('should render slide 3', function () {
            expect(element('h1 em').text()).toMatch(/bullets/);
        });
        it('should render list', function () {
            expect(element('ul li:first-child').text()).toMatch(/One/);
        });
    });

    describe('Slide 4', function () {
        beforeEach(function () {
            browser().navigateTo('#/4');
        });
        it('should render slide 4', function () {
            expect(element('h1').text()).toMatch(/ordered/);
        });
        it('should render list', function () {
            expect(element('ol li:first-child').text()).toMatch(/One/);
        });
    });

    describe('Slide 5', function () {
        beforeEach(function () {
            browser().navigateTo('#/5');
        });
        it('code syntax should be enlightened', function () {
            expect(element('code span').count()).toBe(58);
        });
    });

    describe('Slide 10', function () {
        beforeEach(function () {
            browser().navigateTo('#/10');
        });
        it('AngularJS "Hello World" shoud be working', function () {
            expect(element('.result').text()).toEqual('Hello !');
            input('name').enter('World');
            expect(element('.result').text()).toEqual('Hello World!');
        });
    });


});
