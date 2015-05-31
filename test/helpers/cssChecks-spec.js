define(['helpers/cssChecks'], function (css) {
    'use strict';

    describe('css', function () {
        describe('the #urlIsSafe() method', function () {
            var testUrl;

            it('returns true if URL starts with HTTP or HTTPS', function () {
                testUrl = 'http://someurl.com';

                expect(css.urlIsSafe(testUrl)).toEqual(true);

                testUrl = 'https://someotherurl.com';

                expect(css.urlIsSafe(testUrl)).toEqual(true);
            });

            it('returns false if the URL does not start with HTTP or HTTPS', function () {
                testUrl = 'ftp://danger.com';

                expect(css.urlIsSafe(testUrl)).toEqual(false);

                testUrl = 'file://oops.com';

                expect(css.urlIsSafe(testUrl)).toEqual(false);
            });
        });

        describe('the #propertyIsSafe() method', function () {

            var testProperty;

            it('returns true if the property does not start with expression', function () {
                testProperty = 'height: 100%';

                expect(css.propertyIsSafe(testProperty)).toEqual(true);
            });

            it('returns false if the property does start with expression', function () {
                testProperty = 'expression(alert(\'xss\'))';

                expect(css.propertyIsSafe(testProperty)).toEqual(false);
            });

        });
    });
});
