define(['escapees/jsonEscape'], function (json) {
    'use strict';

    describe('jsonEscape', function () {

        describe('The #parseJsonFromElement() method', function () {
            var testElement, testObject, jsonBlob;

            beforeEach(function () {
                testElement = document.createElement('div');
                testObject = {};
            });

            it('returns a parsed object when passed an element containing JSON', function () {
                testObject.test = "test";
                jsonBlob = JSON.stringify(testObject);

                testElement.textContent = jsonBlob;

                expect(json.parseFromElement(testElement)).toEqual(testObject);
            });

            it('also HTML escapes the JSON', function () {
                testObject.test = "&test";
                jsonBlob = JSON.stringify(testObject);

                testElement.textContent = jsonBlob;

                expect(json.parseFromElement(testElement)).toEqual({ test: '&amp;test' });
            });

        });

    });

});
