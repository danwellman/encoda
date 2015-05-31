define(['escapees/htmlEscape'], function (html) {
    'use strict';

    describe('htmlEscape', function () {

        describe('The #escape() method', function () {

            it('escapes the dangerous HTML symbols', function () {
                var testStrings = ['&', '<', '>', '"', '\'', '\/'];

                expect(html.escape(testStrings[0])).toEqual('&amp;');
                expect(html.escape(testStrings[1])).toEqual('&lt;');
                expect(html.escape(testStrings[2])).toEqual('&gt;');
                expect(html.escape(testStrings[3])).toEqual('&quot;');
                expect(html.escape(testStrings[4])).toEqual('&#x27;');
                expect(html.escape(testStrings[5])).toEqual('&#x2F;');
            });

            it('does not escape other characters', function () {
                var testString = 'test',
                    escapedString = html.escape(testString);

                expect(escapedString).toEqual(testString);
            });

        });

        describe('The #isEscaped() method', function () {

            it('returns true if the string does contain entities', function () {
                var testStrings = ['&amp;', '&lt;', '&gt;', '&quot;', '&#x27;', '&#x2F;'];

                expect(html.isEscaped(testStrings[0])).toEqual(true);
                expect(html.isEscaped(testStrings[1])).toEqual(true);
                expect(html.isEscaped(testStrings[2])).toEqual(true);
                expect(html.isEscaped(testStrings[3])).toEqual(true);
                expect(html.isEscaped(testStrings[4])).toEqual(true);
                expect(html.isEscaped(testStrings[5])).toEqual(true);
            });

            it('returns false if the string does not contain entities', function () {
                var testString = 'test';

                expect(html.isEscaped(testString)).toEqual(false);
            });

        });

    });
});
