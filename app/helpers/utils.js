/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function () {
    'use strict';

    function isCharacterALetterOrNumber(character) {
        return (character !== null || character !== undefined) && (/^[a-zA-Z0-9]$/).test(character);
    }

    function getDecimalCharacterCode(character) {
        return character.charCodeAt(0);
    }

    function isCharacterLessThan256(character) {
        return getDecimalCharacterCode(character) < 256;
    }

    return {
        isCharacterALetterOrNumber: isCharacterALetterOrNumber,
        getDecimalCharacterCode: getDecimalCharacterCode,
        isCharacterLessThan256: isCharacterLessThan256
    };
});
