bricks.fn.extend({

  filter: function (obj) {
    if (bricks.isFunction(obj)) {
      var els = [];
      this.each(function (index, el) {
        if (obj.call(el, index)) {
          els.push(el);
        }
      });
      return bricks(els);
    } else {
      return this.filter(function () {
        return bricks.matches(this, obj);
      });
    }
  },

  not: function (selector) {
    return this.filter(function () {
      return !bricks.matches(this, selector);
    });
  },

  eq: function (index) {
    return index === -1 ? bricks(slice.call(this, this.length -1)) : bricks(slice.call(this, index, index + 1));
  },

  get: function (index) {
    return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
  },

  clone: function () {
    var els = [];
    this.each(function () {
      els.push(this.cloneNode(true));
    });
    return bricks(els);
  },

  toggle: function (state) {
    return this.each(function () {
      var el = $(this);
      el[(state === undefined ? el.css('display') === 'none' : state) ? 'show': 'hide']();
    });
  },

  toggleClass: function (name, state) {
    return this.each(function (i) {
      var el = $(this);
      name = bricks.isFunction(name) ? name.call(this, i, el.attr('class'), state) : bricks.isString(name) ? name : '';
      bricks.each(name.split(/\s+/g), function (i, klass) {
        el[(state === undefined ? !el.hasClass(klass) : state) ? 'addClass' : 'removeClass'](klass);
      });
    });
  }
});