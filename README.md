# encoda

An app for encoding/escaping in JavaScript

## Getting Started

You can use this library as either a standalone script, loaded using regular `<script>` tags, or as a RequireJS AMD module.

Grab the production version from the _dist_ directory. Unless you want to help develop the library, this is all you need.

## Why?

I wanted a single JavaScript library that allowed me to follow all of the rules defined in the [XSS Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet) but I couldn't find one. So I made this, which attempts to be one. I don't think it's too far off (allowing for any undiscovered bugs). I believe it meets the criteria specified in rules 1 to 5, and escapes or encodes strings as directed therein.

Rules 0 and 7 are more _general guidelines_ for you to follow rather then specifications for how a library should behave, and nothing a library can code for specifically _per se_. Rule 6 specifies 'Sanitize HTML Markup with a Library Designed for the Job'. I agree completely, and this is not that library. It can escape strings that are to be used as the content of HTML, or as attributes, but it doesn't sanitize mark-up itself.

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

`encoda.attribute.escape('stringToEscape');`

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
| `encoda.attribute.escape('stringToEscape');` | Returns the escaped string |
| `encoda.attribute.isWhitelisted('attributeToTest');` | Returns false if the attribute is not recommended to have dynamic text injected in |
| `encoda.html.escape('stringToEscape');` | Returns the escaped string |
| `encoda.html.isEscaped('stringToTest');` | Returns true is the string is already escaped |
| `encoda.css.escape('stringToEscape');` | Returns the escaped string |
| `encoda.javascript.escape('stringToEscape');` | Returns the escaped string |
| `encoda.json.parseFromElement('domElementToParseFrom');` | Returns the parsed string |
| `encoda.url.encode('stringToEncode');` | Returns the encoded string |
| `encoda.url.encodeParameter('stringToEncode');` | Returns the encoded string |

## Disclaimer

Using this library will not make your web site impervious to malicious attacks. Excercise extreme caution when accepting input from _any_ external source 
