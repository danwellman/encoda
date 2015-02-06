/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function () {
    'use strict';

    function urlIsSafe(url) {
        return (/^http(?:s*)/).test(url);
    }

    function propertyIsSafe(property) {
        return !(/^expression/).test(property);
    }

    return {
        urlIsSafe: urlIsSafe,
        propertyIsSafe: propertyIsSafe
    };
});
