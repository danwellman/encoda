/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(['helpers/utils', 'helpers/iterator'], function (utils, iterator) {
    'use strict';

    /**
     * Escape for injecting into style properties
     *
     * Encode all ASCII characters less than 256.
     */
    function isCharacterToEscape(character) {
        return !utils.isCharacterALetterOrNumber(character) && utils.isCharacterLessThan256(character);
    }

    function escapeForCss(currentItem, index, array) {
        array.splice(index, 1, String('\\' + currentItem.charCodeAt().toString(16) + '0000').toUpperCase());
        return array;
    }

    function escapeCss(stringToEscape) {
        var stringAsArray = stringToEscape.split('');

        return iterator.iterate(stringAsArray, escapeForCss, isCharacterToEscape).join('');
    }

    return {
        escape: escapeCss
    };
});
