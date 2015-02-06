# Contributing

## Important notes
Please don't edit files in the _dist_, _docs_ or _reports_ subdirectories as they are generated via Grunt. You'll find source code in the _app_ subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

### PhantomJS
While Grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to manually test in actual browsers using the _index.html_, _dist-test.html_ and _dist-test-require.html_ files in the root of the project.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI is installed by running `grunt --version`.  If the command isn't found, run `npm install -g grunt-cli`.  For more information about installing Grunt, see the [getting started guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
1. Run `npm install` to install all dependencies (including Grunt).
1. Run `bower install` to install the front-end dependencies.
1. Run `grunt` to grunt this project.

Assuming that you don't see any red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

To run tests by themselves use `grunt test`, this will run the unit tests and generate a coverage report in _reports/coverage_.

## Files for manual testing

There are 3 HTML files in the root of the project and each is used to test different things:

1. _index.html_ loads the full _require.js_ and uses the _app/main.js_ bootstrapper. Use this while developing to check your progress. This page does not load built files
1. _dist-test.html_ loads just the built encoda package (_dist/encoda.min.js_) using regular `<script>` tags. Use this after grunting the project to test it still works stand-alone.
1. _dist-test-require.html_ loads the full _require.js_ and uses the _app/main-dist.js_ bootstrapper to load the built encoda package. Use this after grunting the project to test it still works as an AMD module.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run `grunt test` to see if the tests pass. Repeat steps 2-4 until done.
1. Open _index.html_, _dist-test.html_ and _dist-test-require.html_ in actual browsers to test the changes.
1. Pull requests containing new public methods must include relevant JSDoc tags to generate documentation.
1. Pull requests containing files added to the _dist_, _docs_ or _reports_ subdirectories will be rejected.
1. Push to your fork and submit a pull request.
