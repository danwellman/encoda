define(['helpers/iterator'], function (iterator) {
    'use strict';

    describe('iterator', function () {

        var conditionStub, callbackStub, testArray, testValue,
            noop = function () {},
            returnTrue = function () {
                return true;
            };

        describe('The #iterate() method', function () {

            beforeEach(function () {
                conditionStub = returnTrue;
                callbackStub = noop;
            });

            afterEach(function () {
                conditionStub = returnTrue;
                callbackStub = noop;
            });

            it('returns an array', function () {
                testArray = ['test'];

                expect(iterator.iterate(testArray, callbackStub, conditionStub)).toEqual(testArray);
            });

            it('invokes the condition function', function () {
                conditionStub = function () {
                    testValue = true;
                };

                iterator.iterate(testArray, callbackStub, conditionStub);

                expect(testValue).toEqual(true);
            });

            it('invokes the callback function if the condition function returns true', function () {
                callbackStub = function () {
                    testValue = false;
                };

                iterator.iterate(testArray, callbackStub, conditionStub);

                expect(testValue).toEqual(false);
            });

        });

    });

});
