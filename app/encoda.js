/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(function (require) {
    'use strict';

    var html = require('escapees/htmlEscape'),
        attr = require('escapees/attributeEscape'),
        js = require('escapees/javascriptEscape'),
        json = require('escapees/jsonEscape'),
        css = require('escapees/cssEscape'),
        url = require('escapees/urlEscape');

    /**
     * Build the app
     *
     */
    return {
        html: html,
        attribute: attr,
        javascript: js,
        json: json,
        css: css,
        url: url
    };
});
