define(['escapees/cssEscape'], function (css) {
    'use strict';

    describe('css', function () {

        describe('The #escape() method', function () {

            it('escapes all characters that have a decimal value lower than 256', function () {
                var testStrings = ['&', '<', '>', '"', '\'', '\/', 'Ü', '@', ':', ']', '£'];

                expect(css.escape(testStrings[0])).toEqual('\\260000');
                expect(css.escape(testStrings[1])).toEqual('\\3C0000');
                expect(css.escape(testStrings[2])).toEqual('\\3E0000');
                expect(css.escape(testStrings[3])).toEqual('\\220000');
                expect(css.escape(testStrings[4])).toEqual('\\270000');
                expect(css.escape(testStrings[5])).toEqual('\\2F0000');
                expect(css.escape(testStrings[6])).toEqual('\\DC0000');
                expect(css.escape(testStrings[7])).toEqual('\\400000');
                expect(css.escape(testStrings[8])).toEqual('\\3A0000');
                expect(css.escape(testStrings[9])).toEqual('\\5D0000');
                expect(css.escape(testStrings[10])).toEqual('\\A30000');
            });

            it('does not escape characters that have a decimal value greater than 256', function () {
                var testString = '†',
                    escapedString = css.escape(testString);

                expect(escapedString).toEqual(testString);
            });

        });

    });
});
