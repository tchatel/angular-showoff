'use strict';
(function () {


var module = angular.module('angular-showoff.directives', []);

/*
 * Keyboard shortcuts
 */
module.directive('body', ['$location', '$rootScope', function($location, $rootScope) {
    return {
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            element.bind('keydown', function(e) {
                var target = e.target || e.srcElement;
                if (target.tagName.toLowerCase() == 'input') return; // ignore inside <input>
                if (target.tagName.toLowerCase() == 'textarea') return; // ignore inside <textarea>
                switch (e.keyCode) {
                    case 72:   // 'h' : show/hide help
                    case 90: { // 'z' : show/hide help
                        $rootScope.$apply(function () {
                            $rootScope.showHelp = ! $rootScope.showHelp;
                        });
                        break;
                    }
                    case 70: { // 'f' : show/hide footer
                        $rootScope.$apply(function () {
                            $rootScope.showFooter = ! $rootScope.showFooter;
                        });
                        break;
                    }
                    case 83: { // 's' : show/hide source
                        $rootScope.$apply(function () {
                            $rootScope.showSource = ! $rootScope.showSource;
                        });
                        break;
                    }
                    case 107:   // '+' : increase font size
                    case 187: { // '+' : increase font size
                        $rootScope.$apply(function () {
                            if ($rootScope.showAll) {
                                $rootScope.allZoom *= 1.1;
                            } else {
                                $rootScope.fontSize = $rootScope.fontSize * 1.1;
                            }
                        });
                        break;
                    }
                    case 54:    // '-' : decrease font size
                    case 109: { // '-' : decrease font size
                        $rootScope.$apply(function () {
                            if ($rootScope.showAll) {
                                $rootScope.allZoom *= 0.9;
                            } else {
                                $rootScope.fontSize = $rootScope.fontSize * 0.9;
                            }
                        });
                        break;
                    }
                    case 66: { // 'b' : toggle black background
                        $rootScope.$apply(function () {
                            $rootScope.blackBackground = ! $rootScope.blackBackground;
                        });
                        break;
                    }
                    case 65: { // 'a' : show/hide all slides
                        $rootScope.$apply(function () {
                            $rootScope.showAll = ! $rootScope.showAll;
                        });
                        break;
                    }
                    case 82: { // 'r' : reload
                        $rootScope.$apply(function () {
                            $rootScope.load();
                        });
                        break;
                    }
                    case 37:   // left
                    case 33:   // page up
                    case 38: { // up
                        if ($rootScope.currentIndex > 0) {
                            $rootScope.$apply(function () {
                                $location.path('/' + ($rootScope.currentIndex + 1 - 1));
                            });
                        }
                        break;
                    }
                    case 32:   // space
                    case 39:   // right
                    case 34:   // page down
                    case 40: { // down
                        if ($rootScope.currentIndex < $rootScope.slides.length - 1) {
                            $rootScope.$apply(function () {
                                $location.path('/' + ($rootScope.currentIndex + 1 + 1));
                            });
                        }
                        break;
                    }
                }
            });
        }
    };
}]);

/*
 * Modified version of ngInclude, which takes the content to include (the real content, not its url) from a scope property.
 */
module.directive('includeContent', ['$templateCache', '$anchorScroll', '$compile', function($templateCache, $anchorScroll, $compile) {
    return {
        restrict: 'ECA',
        terminal: true,
        compile: function(element, attr) {
            var srcExp = attr.includeContent,
                onloadExp = attr.onload || '',
                autoScrollExp = attr.autoscroll;

            return function(scope, element) {
                var changeCounter = 0,
                    childScope;

                var clearContent = function() {
                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }

                    element.html('');
                };

                scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                    var thisChangeId = ++changeCounter;

                    if (src) {
                        if (thisChangeId !== changeCounter) return;

                        if (childScope) childScope.$destroy();
                        childScope = scope.$new();

                        element.html(src);
                        $compile(element.contents())(childScope);

                        if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                            $anchorScroll();
                        }

                        childScope.$emit('$includeContentLoaded');
                        scope.$eval(onloadExp);
                    } else clearContent();
                });
            };
        }
    };
}]);

/*
 * <pre> elements : adds a 'prettyprint' attribute for syntax highlighting with google-code-prettify, and triggers its
 * lauching if it isn't already triggered.
 */
module.directive('pre', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    var prettyPrintTriggered = false;
    return {
        restrict: 'E',
        terminal: true,  // Prevent AngularJS compiling code blocks
        compile: function(element, attrs) {
            if (!attrs['class']) {
                attrs.$set('class', 'prettyprint');
            } else if (attrs['class'] && attrs['class'].split(' ').indexOf('prettyprint') == -1) {
                attrs.$set('class', attrs['class'] + ' prettyprint');
            }
            return function(scope, element, attrs) {
                if (!prettyPrintTriggered) {
                    prettyPrintTriggered = true;
                    $timeout(function () {
                        prettyPrintTriggered = false;
                        prettyPrint();
                    });
                }
            };
        }

    };
}]);

})();