/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
require(['config-dist'], function () {
    'use strict';

    /**
     * Test the library
     *
     */
    require(['../dist/encoda.min'], function (encoda) {
        console.log(encoda.html.escape('<div>\'\"\/Test&test/</div>'));
        console.log(encoda.attribute.escape('Übergroße Äpfel mit Würmern&'));
        console.log(encoda.javascript.escape('#$£;abc5'));
        console.log(encoda.json.parseFromElement(createTestElement()));
        console.log(encoda.css.escape('<'));
        console.log(encoda.url.encode('http://test this.com'));
        console.log('http://test_this.com&param1=' + encoda.url.encodeParameter('test with spaces'));
    });

    function createTestElement() {
        var testElement = document.createElement('div'),
            testObject = { test: '&test' };

        testElement.textContent = JSON.stringify(testObject);

        return testElement;
    }
});
