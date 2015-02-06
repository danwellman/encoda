/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(['helpers/utils', 'helpers/iterator'], function (utils, iterator) {
    'use strict';

    /**
     * Escape JavaScript to \xHH format
     *
     */
    function isCharacterToEscape(character) {
        return !utils.isCharacterALetterOrNumber(character) && utils.isCharacterLessThan256(character);
    }

    function escapeForJavaScript(currentItem, index, array) {
        array.splice(index, 1, String('\\x' + currentItem.charCodeAt().toString(16).toUpperCase()));
        return array;
    }

    function escapeJavaScript(stringToEscape) {
        var stringAsArray = stringToEscape.split('');

        return iterator.iterate(stringAsArray, escapeForJavaScript, isCharacterToEscape).join('');
    }

    return {
        escape: escapeJavaScript
    };
});
