'use strict';
(function () {

var module = angular.module('angular-showoff.services', []);

module.value('Util', {
    trim: function (text) {
        return text != undefined ? text.replace(/^\s+/g,'').replace(/\s+$/g,'') : text;
    }
});

/*
 * Service that loads and parses markdown source files
 */
module.factory('Presentation', ['Util', 'DeferredData', '$http', '$q', function (Util, DeferredData, $http, $q) {
    var markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true
    };
    marked.setOptions(markedOptions);

    function splitSlides(html) {
        var newSlideRegex = new RegExp('<p>\!SLIDE([^<=]*)=* *</p>', 'g');
        var slides = [];
        var execResult, lastIndex = 0;
        while ((execResult = newSlideRegex.exec(html)) != null) {
            var slideInfo = Util.trim(execResult[1]);
            setPreviousSlideContent(html.substring(lastIndex, execResult.index));
            slides.push({info: slideInfo, index: slides.length});
            lastIndex = newSlideRegex.lastIndex;
        }
        setPreviousSlideContent(html.substring(lastIndex));
        return slides;

        function setPreviousSlideContent(content) {
            if (slides.length > 0) {
                slides[slides.length - 1].content = content;
            }
        }
    }

    function transformSource(source, imgPath) {
        if (imgPath) {
            // inline: ![Alt text](/path/to/img.jpg)
            var find = new RegExp('! *\\[([^\\]]*)\\] *\\(([^\\)]*)\\)', 'g');
            source = source.replace(find, '![$1](' + imgPath + '/$2)');

            //TODO defined image reference
        }
        return source;
    }

    function parse(source) {
        return source ? splitSlides(marked(source)) : [];
    }

    return {
        parseSource: function (source) {
            var allSlides = parse(source);
            var visibleSlides = [];
            for (var i = 0 ; i < allSlides.length ; i++) {
                if (allSlides[i].info.split(' ').indexOf('skip') == -1) {
                    visibleSlides.push(allSlides[i]);
                }
            }
            return visibleSlides;
        },
        loadSource: function (configPath) {
            var result = DeferredData.typeObject();

            $http.get(configPath).success(function (data) {
                var config = data;
                var source = {title: config.title, markdown: ''};
                var promise = $q.when('start'); // Already resolved promise
                for (var i = 0 ; i < config.sections.length ; i++ ) {
                    var mdFile = config.sections[i].file;
                    promise = next(promise, mdFile, source);
                }
                promise.then(function () {
                    result.$resolve(source);
                }, function () {
                    result.$resolve($q.reject("error"));
                })
            }).error(function (error) {
                // TODO !!!!!
                result.$resolve($q.reject("error"));
            });

            return result;

            function next(promise, mdFile, source) {
                var dir = mdFile.substring(0, mdFile.lastIndexOf('/'));
                var nextDefer = $q.defer();
                promise.then(function () {
                    var httpPromise = $http.get( mdFile);
                    httpPromise.success(function (data) {
                        source.markdown += transformSource(data + "\n\n", dir);
                        nextDefer.resolve();
                    });
                    httpPromise.error(function (error) {
                        // TODO !!!!!
                        nextDefer.reject(error);
                    });
                });
                return nextDefer.promise;
            }
        }
    };
}]);

})();