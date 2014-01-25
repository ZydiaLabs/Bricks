nutbang.fn.extend({

  filter: function (obj) {
    if (nutbang.isFunction(obj)) {
      var els = [];
      this.each(function (index, el) {
        if (obj.call(el, index)) {
          els.push(el);
        }
      });
      return nutbang(els);
    } else {
      return this.filter(function () {
        return nutbang.matches(this, obj);
      });
    }
  },

  not: function (selector) {
    return this.filter(function () {
      return !nutbang.matches(this, selector);
    });
  },

  eq: function (index) {
    return index === -1 ? nutbang(slice.call(this, this.length -1)) : nutbang(slice.call(this, index, index + 1));
  },

  get: function (index) {
    return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
  },

  clone: function () {
    var els = [];
    this.each(function () {
      els.push(this.cloneNode(true));
    });
    return nutbang(els);
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
      name = nutbang.isFunction(name) ? name.call(this, i, el.attr('class'), state) : nutbang.isString(name) ? name : '';
      nutbang.each(name.split(/\s+/g), function (i, klass) {
        el[(state === undefined ? !el.hasClass(klass) : state) ? 'addClass' : 'removeClass'](klass);
      });
    });
  }
});