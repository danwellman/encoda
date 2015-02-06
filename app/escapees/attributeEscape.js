/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(['helpers/attributes', 'helpers/utils', 'helpers/iterator', 'symbols/allEntities'], function (attributes, utils, iterator, allEntities) {
    'use strict';

    /**
     * Escape for injecting into HTML attributes
     *
     * Encode all ASCII characters less than 256. Prefer named entities, else &#HH format
     */
    function escapeToHtmlNumber(stringToEscape) {
        var stringAsArray = stringToEscape.split('');

        iterator.iterate(stringAsArray, escapeToEntity, itemHasEntity);
        return iterator.iterate(stringAsArray, escapeForJavaScript, isCharacterToEscape).join('');
    }

    function isCharacterToEscape(character) {
        return !utils.isCharacterALetterOrNumber(character) && utils.isCharacterLessThan256(character);
    }

    function escapeForJavaScript(currentItem, index, array) {
        if (currentItem.length === 1) {
            array.splice(index, 1, String(['&#', currentItem.charCodeAt(), ';'].join('')));
        }
        return array;
    }

    function escapeToEntity(currentItem, index, array) {
        array.splice(index, 1, allEntities[currentItem]);
        return array;
    }

    function itemHasEntity(character) {
        if (allEntities[character]) {
            return true;
        }
    }

    function isAttributeOnTheWhitelist(attribute) {
        return attributes.whitelist.indexOf(attribute) !== -1;
    }

    return {
        escape: escapeToHtmlNumber,
        isWhitelisted: isAttributeOnTheWhitelist
    };
});
