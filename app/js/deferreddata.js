'use strict';
(function () {

// Creates an array or object with delayed data, based on an Angular $q promise.
// The array or object has methods to get the $q promise, to resolve it with
// some data. The reason not to use true $q promises directly, is that they work
// very well to get data to display in a view, but not so well to update data in
// a form. A simple data object is best suited for a form.
//
// $isWaiting()  : returns true if the delayed data is still unresolved
// $getPromise() : get the associated $q promise
// $resolve(data) : resolve the deferred data by copying the parameter value

var module = angular.module('deferreddata', [])


module.factory('DeferredData', ['$q', function ($q) {

    function deferredDataBuilder(isArray) {
        var deferredData = isArray ? [] : {};
        var defer = $q.defer();
        var waiting = true;
        deferredData.$isWaiting = function() {
            return waiting;
        };
        deferredData.$getPromise = function() {
            return defer.promise;
        };
        deferredData.$resolve = function(data) {
            if (waiting) {
                waiting = false;
                // We don't use directly angular.copy to copy into deferredData, since
                // for an array it removes all the added methods.
                if (angular.isArray(deferredData)) {
                    // Copy the array items (deep copy)
                    for (var i = 0; i < data.length; i++) {
                        deferredData.push(angular.copy(data[i]));
                    }
                } else {
                    // Copy the object properties (deep copy)
                    for (var key in data) {
                        deferredData[key] = angular.copy(data[key]);
                    }
                }
            }
            return defer.resolve(deferredData);
        };
        return deferredData;
    }

    return {
        typeArray: function () {
            return deferredDataBuilder(true);
        },
        typeObject: function () {
            return deferredDataBuilder(false);
        }
    };
}]);

})();