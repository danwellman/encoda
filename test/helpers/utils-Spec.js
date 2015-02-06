define(['helpers/utils'], function (utils) {
    'use strict';

    describe('utils', function () {
        var testCharacter, testNumber;

        describe('The #isCharacterALetterOrNumber() method', function () {

            it('returns true if passed a letter or number', function () {
                testCharacter = 'A';
                testNumber = 5;

                expect(utils.isCharacterALetterOrNumber(testCharacter)).toEqual(true);
                expect(utils.isCharacterALetterOrNumber(testNumber)).toEqual(true);
            });

            it('returns false if passed a character that is not a letter or a number', function () {
                testCharacter = '#';

                expect(utils.isCharacterALetterOrNumber(testCharacter)).toEqual(false);
                expect(utils.isCharacterALetterOrNumber(null)).toEqual(false);
                expect(utils.isCharacterALetterOrNumber(undefined)).toEqual(false);
                expect(utils.isCharacterALetterOrNumber({})).toEqual(false);
                expect(utils.isCharacterALetterOrNumber([])).toEqual(false);
                expect(utils.isCharacterALetterOrNumber('')).toEqual(false);
            });

        });

        describe('the #getDecimalCharacterCode() method', function () {

            it('returns the decimal code for any ASCII character', function () {
                testCharacter = 'A';

                expect(utils.getDecimalCharacterCode(testCharacter)).toEqual(65);
            });

        });

        describe('the #isCharacterLessThan256() method', function () {

            it('returns true if the decimal code for a character is less than 256', function () {
                testCharacter = 'A';

                expect(utils.isCharacterLessThan256(testCharacter)).toEqual(true);
            });

            it('returns false if the decimal code for a character is greater than 256', function () {
                testCharacter = '†';

                expect(utils.isCharacterLessThan256(testCharacter)).toEqual(false);
            });

        });

    });

});
