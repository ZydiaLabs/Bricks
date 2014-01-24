/*
*  NutBang v0.0.1 24-01-2014 
*  Created by Giovanny Andres Gongora Granada 
*  License GPLv3 
*  nutbang.github.io
 */
(function (window, undefined) {
var document = window.document
  , _nutbang = window.nutbang
  , _$ = window.$
  , idExp = /^#([\w\-]*)$/
  , classExp = /^\.([\w\-]*)$/
  , tagNameExp = /^[\w\-]+$/
  , tagExp = /^<([\w:]+)/
  , slice = [].slice
  , splice = [].splice
  , noop = function () {};

try {
  slice.call(document.childNodes);
} catch(e) {
  slice = function (i, e) {
    i = i || 0;
    var el, results = [];
    for (; (el = this[i]); i++) {
      if (i === e) break;
      results.push(el);
    }
    return results;
  };
}

var nutbang = function (selector, context) {
  return new nutbang.fn.find(selector, context);
};

nutbang.fn = nutbang.prototype = {

  /* Length is zero */
  length: 0,

  /* Extend `nutbang.fn` */
  extend: function (o) {
    for (var k in o) {
      this[k] = o[k];
    }
  },

  /* Find elements by selector */
  find: function (selector, context) {
    var els = [], attrs;

    if (!selector) {
      return this;
    }

    if (nutbang.isFunction(selector)) {
      return nutbang.ready(selector);
    }

    if (selector.nodeType) {
      this.selector = '';
      this.context = selector;
      return this.set([selector]);
    }

    if (selector.length === 1 && selector[0].nodeType) {
      this.selector = this.context = selector[0];
      return this.set(selector);
    }

    context = this.context ? this.context : (context || document);

    if (nutbang.isPlainObject(context)) {
      attrs = context;
      context = document;
    }

    if (context instanceof nutbang) {
      context = context.context;
    }

    if (nutbang.isString(selector)) {
      this.selector = selector;
      if (idExp.test(selector) && context.nodeType === context.DOCUMENT_NODE) {
        els = (els = context.getElementById(selector.substr(1))) ? [els] : [];
      } else if (context.nodeType !== 1 && context.nodeType !== 9) {
        els = [];
      } else if (tagExp.test(selector)) {
        nutbang.each(normalize(selector), function () {
          els.push(this);
        });
      } else {
        els = slice.call(
          classExp.test(selector) && context.getElementsByClassName !== undefined ? context.getElementsByClassName(selector.substr(1)) :
          tagNameExp.test(selector) ? context.getElementsByTagName(selector) :
          context.querySelectorAll(selector)
        );
      }
    } else if (selector.nodeName || selector === window) {
      els = [selector];
    } else if (nutbang.isArray(selector)) {
      els = selector;
    }

    if (selector.selector !== undefined) {
      this.selector = selector.selector;
      this.context = selector.context;
    } else if (this.context === undefined) {
      if (els[0] !== undefined && !nutbang.isString(els[0])) {
        this.context = els[0];
      } else {
        this.context = document;
      }
    }

    return this.set(els).each(function () {
      return attrs && nutbang(this).attr(attrs);
    });
  }
}

  // You know what this means
  window.$ = window.nutbang = window.nb = nutbang;

})(window);