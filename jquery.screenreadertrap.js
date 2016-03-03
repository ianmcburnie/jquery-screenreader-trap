/**
* @file jQuery singleton traps virtual cursor to the given element and it's children
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.2.2
* @requires jquery
*/
(function($, window, document, undefined) {

    var pluginName = 'jquery-screenreader-trap';

    // the element that will be trapped
    var $trappedEl;

    // collection of elements that will be modified
    var $modifiedElements;

    /**
    * @method "jQuery.trapScreenreader"
    * @fires screenreaderTrap - when trap is activated
    * @fires screenreaderUntrap - when trap is deactivated
    * @return {Object} chainable jQuery class
    */
    $.trapScreenreader = function trapScreenReader(el) {
        // ensure current trap is deactivated
        $.untrapScreenreader();

        // store reference to trapped el
        $trappedEl = $(el);

        // find all the elements we need to hide, and all the elements we must keep unhidden
        var $siblings = $trappedEl.siblings(':not(script, [aria-hidden=true])');
        var $parents = $trappedEl.parents(':not(html, body)');
        var $parentsSiblings = $trappedEl.parents(':not(html, body)').siblings(':not(script, [aria-hidden=true])');

        // update DOM
        $trappedEl.attr('aria-hidden', 'false');
        $siblings.attr('aria-hidden', 'true');
        $parents.attr('aria-hidden', 'false');
        $parentsSiblings.attr('aria-hidden', 'true');

        // store reference to collection of elements that have been modified
        $modifiedElements = $trappedEl.add($siblings).add($parents).add($parentsSiblings);

        // notify observers
        $trappedEl.trigger('screenreaderTrap');
    };

    $.untrapScreenreader = function untrapScreenReader() {
        if ($trappedEl) {
            // restore modified elements to their original state
            $modifiedElements.removeAttr('aria-hidden');

            // notify observers
            $trappedEl.trigger('screenreaderUntrap');
        }
    };

}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* keyboardTrap event
*
* @event screenreaderTrap
* @type {object}
* @property {object} event - event object
*/

/**
* keyboardUntrap event
*
* @event screenreaderUntrap
* @type {object}
* @property {object} event - event object
*/
