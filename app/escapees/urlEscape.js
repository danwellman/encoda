/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function () {
    'use strict';
    /**
     * URL encoding
     *
     */
    function encodeUrl(urlToEncode) {
        return encodeURI(urlToEncode);
    }

    function encodeParameter(parameterToEncode) {
        return encodeURIComponent(parameterToEncode);
    }

    return {
        encode: encodeUrl,
        encodeParameter: encodeParameter
    };
});
