# encoda

An app for encoding/escaping in JavaScript

## Getting Started

You can use this library as either a standalone script, loaded using regular `<script>` tags, or as a RequireJS AMD module.

Grab the production version from the _dist_ directory. Unless you want to help develop the library, this is all you need.

## Usage

When using as a standalone script, the library adds a global called `encoda`. Use this to call the methods you need for the task at hand. Currently, the library provides escaping for:

1. Strings to be inserted into HTML attributes
1. Strings to be inserted into HTML elements
1. Strings to be used in JavaScript
1. Strings to be used in CSS

Additionally, it provides the following conveniences:

1. A method for extracting JSON from an element on the page
1. URL and URL parameter encoding

The methods exposed by the library are namespaced according to their usage, for example, to use the HTML attribute escaper, call the method like this:

`encoda.attribute.escape(_stringToEscape_);`

The method will return the escaped string.

To use as an AMD module with RequireJS, require it in as you would any other module. Methods are exposed in the same way, therefore:

```javascript
define(['vendor/encoda.min'], function(encoda) {
    // use it the same way as the global here, e.g.
    var someEscapedString = encoda.attribute.escape('Escape!');
});
```

## API

Use the library like this:

| Method signature | Usage |
|------------------|-------|
| `encoda.attribute.escape(_stringToEscape_);` | Returns the escaped string |
| `encoda.attribute.isWhitelisted(_attributeToTest_);` | Returns false if the attribute is not recommended to have dynamic text injected in |
| `encoda.html.escape(_stringToEscape_);` | Returns the escaped string |
| `encoda.html.isEscaped(_stringToTest_);` | Returns true is the string is already escaped |
| `encoda.css.escape(_stringToEscape_);` | Returns the escaped string |
| `encoda.javascript.escape(_stringToEscape_);` | Returns the escaped string |
| `encoda.json.parseFromElement(_domElementToParseFrom_);` | Returns the parsed string |
| `encoda.url.encode(_stringToEncode_);` | Returns the encoded string |
| `encoda.url.encodeParameter(_stringToEncode_);` | Returns the encoded string |

## Disclaimer

Using this library will not make your web site impervious to malicious attacks. Excercise extreme caution when accepting input from _any_ external source
