define(['escapees/attributeEscape'], function (attribute) {
    'use strict';

    describe('attribute', function () {

        describe('The #escape() method', function () {

            it('should escape all ASCII characters that are not letters or numbers', function () {
                var testStrings = ['&', '<', '>', '"', '\'', '\/', 'Ü', '@', ':', ']', '£'];

                expect(attribute.escape(testStrings[0])).toEqual('&amp;');
                expect(attribute.escape(testStrings[1])).toEqual('&lt;');
                expect(attribute.escape(testStrings[2])).toEqual('&gt;');
                expect(attribute.escape(testStrings[3])).toEqual('&quot;');
                expect(attribute.escape(testStrings[4])).toEqual('&#39;');
                expect(attribute.escape(testStrings[5])).toEqual('&#47;');
                expect(attribute.escape(testStrings[6])).toEqual('&Uuml;');
                expect(attribute.escape(testStrings[7])).toEqual('&#64;');
                expect(attribute.escape(testStrings[8])).toEqual('&#58;');
                expect(attribute.escape(testStrings[9])).toEqual('&#93;');
                expect(attribute.escape(testStrings[10])).toEqual('&pound;');
            });

            it('does not escape ASCII characters that are letters or numbers', function () {
                var testString = 'test',
                    testNumber = '4028383',
                    escapedString = attribute.escape(testString),
                    escapedNumber = attribute.escape(testNumber);

                expect(escapedString).toEqual(testString);
                expect(escapedNumber).toEqual(testNumber);
            });

        });

        describe('The #isWhitelisted() method', function () {

            it('returns true if the attribute is on the whitelist', function () {
                expect(attribute.isWhitelisted('align')).toEqual(true);
            });

            it('returns false if the item is not on the whitelist', function () {
                expect(attribute.isWhitelisted('src')).toEqual(false);
            });
        });

    });
});
