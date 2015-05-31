define(['escapees/urlEscape'], function (url) {
    'use strict';

    describe('url', function () {

        describe('the #encodeUrl() method', function () {
            it('URL encodes a string', function () {
                var testUrl = 'http://www.i.am.a.url/with spaces.html',
                    expectedUrl = 'http://www.i.am.a.url/with%20spaces.html';

                expect(url.encode(testUrl)).toEqual(expectedUrl);
            });
        });

        describe('the #encodeParameter() method', function () {
            it('URL encodes a paramter', function () {
                var testParam = 'this is a test',
                    expectedParam = 'this%20is%20a%20test';

                expect(url.encodeParameter(testParam)).toEqual(expectedParam);
            });
        });

    });

});
