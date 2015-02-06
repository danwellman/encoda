define(['escapees/javascriptEscape'], function (javascript) {
    'use strict';

    describe('javascript', function () {

        describe('The #escape() method', function () {

            it('escapes all characters that have a decimal value lower than 256 and which are not letters or numbers', function () {
                var testStrings = ['&', '<', '>', '"', '\'', '\/', 'Ü', '@', ':', ']', '£'];

                expect(javascript.escape(testStrings[0])).toEqual('\\x26');
                expect(javascript.escape(testStrings[1])).toEqual('\\x3C');
                expect(javascript.escape(testStrings[2])).toEqual('\\x3E');
                expect(javascript.escape(testStrings[3])).toEqual('\\x22');
                expect(javascript.escape(testStrings[4])).toEqual('\\x27');
                expect(javascript.escape(testStrings[5])).toEqual('\\x2F');
                expect(javascript.escape(testStrings[6])).toEqual('\\xDC');
                expect(javascript.escape(testStrings[7])).toEqual('\\x40');
                expect(javascript.escape(testStrings[8])).toEqual('\\x3A');
                expect(javascript.escape(testStrings[9])).toEqual('\\x5D');
                expect(javascript.escape(testStrings[10])).toEqual('\\xA3');
            });

            it('does not escape characters that have a decimal value lower than 256 and which are letters or numbers', function () {
                var testString = 'test',
                    testNumber = '4028383',
                    escapedString = javascript.escape(testString),
                    escapedNumber = javascript.escape(testNumber);

                expect(escapedString).toEqual(testString);
                expect(escapedNumber).toEqual(testNumber);
            });

            it('does not escape characters that have a decimal value greater than 256', function () {
                var testString = '†',
                    escapedString = javascript.escape(testString);

                expect(escapedString).toEqual(testString);
            });

        });

    });
});
