/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
require(['config'], function () {
    'use strict';

    /**
     * Test the escapees
     *
     */
    require(['escapees/htmlEscape', 'escapees/attributeEscape', 'escapees/javascriptEscape', 'escapees/jsonEscape', 'escapees/cssEscape', 'escapees/urlEscape'], function (html, attribute, javascript, json, css, url) {
        console.log(html.escape('<div>\'\"\/Test&test/</div>'));
        console.log(attribute.escape('Übergroße Äpfel mit Würmern&'));
        console.log(javascript.escape('#$£;abc5'));
        console.log(json.parseFromElement(createTestElement()));
        console.log(css.escape('<'));
        console.log(url.encode('http://test this.com'));
        console.log('http://test_this.com&param1=' + url.encodeParameter('test with spaces'));
    });

    function createTestElement() {
        var testElement = document.createElement('div'),
            testObject = { test: '&test' };

        testElement.textContent = JSON.stringify(testObject);

        return testElement;
    }
});
