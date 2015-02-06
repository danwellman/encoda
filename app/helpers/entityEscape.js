/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function () {
    'use strict';

    function escape(stringToEscape, symbol, replacement) {
        var regEx = new RegExp(symbol, 'g');
        return String(stringToEscape).replace(regEx, replacement);
    }

    return escape;
});
