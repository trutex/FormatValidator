'use strict';

angular.module('app')
    .directive('formatValidator', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attr, ngModel) {

                var validFormat = attr.formatValidator;
                
                var isDigit = function(character) {
                    return (character >= '0' && character <= '9');
                };

                var isAlpha = function (character) {
                    character = character.toLowerCase();
                    return (character >= 'a' && character <= 'z');
                };

                var isValidFormat = function(value) {
                    var formatLength = validFormat.length;
                    if (formatLength != value.length) {
                        return false;
                    }

                    for (var i = 0; i < formatLength; i++) {
                        var formatCharacter = validFormat.charAt(i);
                        var valueCharacter = value.charAt(i);

                        switch (formatCharacter) {
                        case 'd':
                            if (!isDigit(valueCharacter)) {
                                return false;
                            }
                            break;
                        case 'a':
                            if (!isAlpha(valueCharacter)) {
                                return false;
                            }
                            break;
                        default:
                            if (formatCharacter !== valueCharacter) {
                                return false;
                            }
                        }
                    }
                    return true;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(function (value) {
                    var valid = value && isValidFormat(value);
                    ngModel.$setValidity('validity', valid);
                    return valid ? value : undefined;
                });

                //For model -> DOM validation
                ngModel.$formatters.unshift(function (value) {
                    ngModel.$setValidity('validity', value && isValidFormat(value));
                    return value;
                });
            }
        };
    });