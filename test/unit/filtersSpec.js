'use strict';

/* jasmine specs for filters go here */

describe('filters', function() {
    beforeEach(module('angular-showoff.filters'));

    describe('current', function() {

        it('should return only current slide if not in showAll mode', inject(function(currentFilter) {
            expect(currentFilter([0, 1, 2, 3], 2, false)).toEqual([2]);
        }));

        it('should return all slides in showAll mode', inject(function(currentFilter) {
            expect(currentFilter([0, 1, 2, 3], 2, true)).toEqual([0, 1, 2, 3]);
        }));

    });

});
