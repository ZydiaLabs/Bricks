nutbang.fn.extend({

  addClass: function (value) {
    if (value && nutbang.isString(value)) {
      return this.each(function (index, el) {
        if (el.nodeType === 1) {
          var classNames = value.split(/\s+/);
          if (!el.className && classNames.length === 1) {
            el.className = value;
          } else {
            var className = el.className;

            for (var i = 0; i < classNames.length; i++) {
              if (className.indexOf(classNames[i]) === -1) {
                className += ' ' + classNames[i];
              }
            }

            el.className = nutbang.trim(className);
          }
        }
      });
    }
  },

  removeClass: function (value) {
    return this.each(function (index, el) {
      if (value && nutbang.isString(value)) {
        var classNames = value.split(/\s+/);
        if (el.nodeType === 1 && el.className) {
          if (classNames.length === 1) {
           el.className = el.className.replace(value, '');
          } else {
            for (var i = 0; i < classNames.length; i++) {
              el.className = el.className.replace(classNames[i], '');
            }
          }

          el.className = nutbang.trim(el.className.replace(/\s{2}/g, ' '));

          if (el.className === '') {
            el.removeAttribute('class');
          }
        }
      }
    });
  },

  hasClass: function (value) {
    var classNames = (this[0] ? this[0] : this).className.split(/\s+/)
      , values = value.split(/\s+/)
      , i = 0;

    if (values.length > 1) {
      var hasClasses = false;
      for (i = 0; i < values.length; i++) {
        hasClasses = this.hasClass.call(this, values[i]);
      }
      return hasClasses;
    } else if (nutbang.isString(value)) {
      for (i = 0; i < classNames.length; i++) {
        if (classNames[i] === value) return true;
      }
      return false;
    }
  },

  attr: function (name, value) {
    if (nutbang.isObject(name)) {
      return this.each(function () {
        for (var key in name) {
          if (this.setAttribute) {
            this.setAttribute(key, name[key] === null ? name[key] + '' : name[key]);
          }
        }
      });
    } else if ((value || value === null || value === false) && nutbang.isString(name)) {
      return this.each(function () {
        if (this.setAttribute) {
          this.setAttribute(name, value === null ? value + '' : value);
        }
      });
    } else if (nutbang.isString(name)) {
      var attribute;
      for (var i = 0; i < this.length; i++) {
        if (this[i].getAttribute !== undefined && (attribute = this[i].getAttribute(name)) !== null) {
          break;
        } else {
          continue;
        }
      }
      return attribute || undefined;
    }
  },

  data: function (name, value) {
    value = this.attr('data-' + name, serializeValue(value));
    return value instanceof nutbang ? value : deserializeValue(value);
  },

  removeAttr: function (name) {
    return this.each(function () {
      if (name && this.nodeType === 1) {
        var attrNames = name.split(/\s+/);
        for (var i = 0; i < attrNames.length; i++) {
          this.removeAttribute(attrNames[i]);
        }
      }
    });
  }
});

function serializeValue (value) {
  try {
    return value ? (nutbang.isPlainObject(value) || nutbang.isArray(value)) &&
    JSON.stringify ? JSON.stringify(value) : value : value;
  } catch (e) {
    return value;
  }
}

function deserializeValue (value) {
  var num;
  try {
    return value ? value === 'true' || (value === 'false' ? false :
    value === 'null' ? null : !isNaN(num = Number(value)) ? num :
    /^[\[\{]/.test(value) ? nutbang.parseJSON(value) : value) : value;
  } catch (e) {
    return value;
  }
}