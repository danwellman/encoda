/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(['escapees/htmlEscape'], function (htmlEscape) {
    'use strict';

    /**
     * Get JSON from an element safely
     *
     */
    function parseJsonFromElement(element) {
        var prop,
            jsonString = element.textContent || element.innerText,
            parsedObject = JSON.parse(jsonString);

        for (prop in parsedObject) {
            parsedObject[prop] = htmlEscape.escape(parsedObject[prop]);
        }

        return parsedObject;
    }

    return {
        parseFromElement: parseJsonFromElement
    };
});
