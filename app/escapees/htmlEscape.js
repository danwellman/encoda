/**
 * @author Dan Wellman
 * @copyright Dan Wellman 2015
 * @license MIT
 */
define(['symbols/basicEntities', 'helpers/entityEscape'], function (entities, entityEscape) {
    'use strict';

    /**
     * Escape to HTML entity
     *
     */

    function escapeHtml(stringToEscape) {
        var escaped = stringToEscape,
            entitiesToEscape = Object.keys(entities);

        entitiesToEscape.forEach(function (item) {
            escaped = entityEscape(escaped, item, entities[item]);
        });

        return escaped;
    }

    function isEscaped(stringToTest) {
        var symbols = Object.keys(entities);

        return symbols.some(function (item) {
            return stringToTest.indexOf(entities[item]) !== -1;
        });
    }

    return {
        escape: escapeHtml,
        isEscaped: isEscaped
    };
});
