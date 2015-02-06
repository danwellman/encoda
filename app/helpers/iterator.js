/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function () {
    'use strict';

    function iterate(arrayToIterate, callbackForArrayItems, condition) {
        var x,
            length = arrayToIterate.length;

        for (x = 0; x < length; x += 1) {
            var currentItem = arrayToIterate[x];

            if (condition(currentItem)) {
                callbackForArrayItems(currentItem, x, arrayToIterate);
            }
        }

        return arrayToIterate;
    }

    return {
        iterate: iterate
    };
});
