var wrapTags = /^(select|fieldset|table|tbody|tfoot|td|tr|colgroup)$/i,
  wrapMap = {
      thead: ['<table>', '</table>', 1],
      col: ['<table><colgroup>', '</colgroup></table>', 2],
      tr: ['<table><tbody>', '</tbody></table>', 2],
      td: ['<table><tbody><tr>', '</tr></tbody></table>', 3]
    };

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function isNode (node) {
  return node && node.nodeName && (node.nodeType === 1 || node.nodeType === 11);
}

function normalize (node) {
  if (node instanceof bricks) {
    var els = [];
    node.each(function (i, el) {
      el = normalize(el);
      el = el ? el[0] : '';
      els.push(el);
    });
    return els;
  }
  return bricks.isString(node) ? wrap(node) : isNode(node) ? [node] : node;
}

function wrap (node) {
  return typeof node === 'string' && node !== '' ? function () {
    var tag = tagExp.exec(node),
      el = document.createElement('div'),
      wrap = tag ? wrapMap[tag[1].toLowerCase()] : null,
      level = wrap ? wrap[2] + 1 : 1;
    el.innerHTML = wrap ? (wrap[0] + node + wrap[1]) : node;
    while (level--) el = el.firstChild;
    return [el];
  }() : isNode(node) ? [node.cloneNode(true)] : [];
}

function nodeName (el, name) {
  return el.nodeName.toLowerCase() === name.toLowerCase();
}

function target (el, html) {
  return nodeName(el, 'table') && tagExp.test(html) && tagExp.exec(html)[1] === 'tr' ?
    el.getElementsByTagName('tbody')[0] || el.appendChild(el.ownerDocument.createElement('tbody')) :
    el;
}

bricks.fn.extend({

  append: function (node) {
    return this.each(function (i, el) {
      bricks.each(normalize(node), function () {
        target(el, node).appendChild(this);
      });
    });
  },

  prepend: function (node) {
    return this.each(function (i, el) {
      var first = target(el, node).firstChild;
      bricks.each(normalize(node), function () {
        if (first) {
          first.parentNode.insertBefore(this, first);
        } else {
          target(el, node).appendChild(this);
        }
      });
    });
  },

  before: function (node) {
    return this.each(function (i, el) {
      bricks.each(normalize(node), function () {
        el.parentNode.insertBefore(this, el);
      });
    });
  },

  after: function (node) {
    return this.each(function (i, el) {
      bricks.each(normalize(node), function () {
        el.parentNode.insertBefore(this, el.nextSibling);
      });
    });
  },

  remove: function () {
    return this.each(function () {
      this.parentNode.removeChild(this);
    });
  },

  html: function (html) {
    if (html === undefined) {
      return this[0] ? this[0].innerHTML : undefined;
    }

    return this.each(function () {
      try {
        if ((bricks.isString(html) || bricks.isNumeric(html)) && !wrapTags.test(this.tagName)) {
          return this.innerHTML = html;
        }
      } catch (e) {}
      var el = this;
      bricks.each(normalize(this), function () {
        return el.appendChild(this);
      });
    });
  },

  is: function (selector) {
    return this[0] && bricks.matches(this[0], selector);
  },

  closest: function (selector, context) {
    var node = this[0];

    while (node && !bricks.matches(node, selector)) {
      node = node.parentNode;
      if (!node || !node.ownerDocument || node === context || node.nodeType === 11) break;
    }

    return bricks(node);
  },

  parent: function (selector) {
    var parent = this.pluck('parentNode');
    return selector === undefined ? bricks(parent) : bricks(parent).filter(selector);
  },

  children: function (selector) {
    var children = [];
    this.each(function () {
      bricks.each(slice.call(this.children), function (i, value) {
        children.push(value);
      });
    });
    return selector === undefined ? bricks(children) : bricks(children).filter(selector);
  },


  text: function (text) {
    if (text === undefined) {
      return this[0] ? this[0].textContent === undefined ? this[0].innerText : this[0].textContent : '';
    } else {
      return this.each(function () {
        this.textContent = text;
      });
    }
  },

  val: function (value) {
    if (!arguments.length) {
      if (this[0]) {
        return this[0].multiple ? this.find('option').filter(function () {
          return this.selected;
        }).pluck('value') : this[0].value;
      }

      return undefined;
    } else {
      return this.each(function () {
        if (this.nodeType !== 1) {
          return;
        } else if (value === null || value === undefined) {
          value = '';
        } else if (bricks.isNumeric(value)) {
          value += '';
        }
        this.value = value;
      });
    }
  },

  empty: function () {
    return this.each(function () {
      while (this.hasChildNodes()) {
        this.removeChild(this.childNodes[0]);
      }
    });
  }

});

bricks.each({
  appendTo: 'append',
  prependTo: 'prepend',
  insertBefore: 'before',
  insertAfter: 'after'
}, 

function (key, value) {
  bricks.fn[key] = function (selector) {
    return bricks(selector)[value](this);
  };
});