function ajaxJSONP (url, options) {
  var name = (name = /callback\=([A-Za-z0-9\-\.]+)/.exec(url)) ? name[1] : 'jsonp' + (+new Date()),
    el = document.createElement('script'),
    abortTimeout = null,

    cleanUp = function () {
        if (abortTimeout !== null) clearTimeout(abortTimeout);
        bricks(el).remove();
        try { delete window[name]; }
        catch (e) { window[name] = undefined; }
    },

    abort = function (error) {
        cleanUp();
        if (error === 'timeout') window[name] = noop;
        if (bricks.isFunction(options.error)) options.error(error, options);
    };

  el.onerror = function () {
    abort('error');
  };

  if (options.timeout > 0) {
    abortTimeout = setTimeout(function () {
      abort('timeout');
    }, options.timeout);
  }

  window[name] = function (data) {
    bricks(el).remove();
    try { delete window[name]; }
    catch (e) { window[name] = undefined; }
    bricks.ajaxSuccess(data, null, options);
  };

  options.data = bricks.param(options.data);
  el.src = url.replace(/\=\?/, '=' + name);
  bricks('head')[0].appendChild(el);
}

bricks.extend({

  ajax: function (url, options) {
    options = options || bricks.ajaxSettings;

    if (bricks.isObject(url)) {
      if (bricks.isFunction(options)) {
        url.success = url.success || options;
      }
      options = url;
      url = options.url;
    }

    if (bricks.isFunction(options)) options = { success: options };

    for (var opt in bricks.ajaxSettings) {
      if (!options.hasOwnProperty(opt)) {
        options[opt] = bricks.ajaxSettings[opt];
      }
    }

    if (!url) return options.xhr();

    var xhr = options.xhr(),
      error = 'error',
      abortTimeout = null,
      jsonp = options.dataType === 'jsonp',
      mime = {
          html: 'text/html',
          text: 'text/plain',
          xml: 'application/xml, text/xml',
          json: 'application/json'
        },
      params = bricks.param(options.data) !== '' ? bricks.param(options.data) : options.data;

    for (var k in mime) {
      if (url.indexOf('.' + k) !== -1 && !options.dataType) options.dataType = k;
    }

    if (jsonp || /\=\?|callback\=/.test(url)) {
      if (!/\=\?/.test(url)) url = (url + '&callback=?').replace(/[&?]{1,2}/, '?');
      return ajaxJSONP(url, options);
    }

    if (bricks.isFunction(options.beforeOpen)) {
      var bc = options.beforeOpen(xhr, options);
      if (!bc) {
        xhr.abort();
        return xhr;
      }
      xhr = bc;
    }

    if (xhr) {
      xhr.open(options.type, url, true);

      if ((mime = mime[options.dataType.toLowerCase()]) !== undefined) {
        xhr.setRequestHeader('Accept', mime);
        if (mime.indexOf(',') !== -1) mime = mime.split(',')[0];
        if (xhr.overrideMimeType) xhr.overrideMimeType(mime);
      }

      if (options.contentType || options.data && options.type !== 'GET') {
        xhr.setRequestHeader('Content-Type', (options.contentType || 'application/x-www-form-urlencoded'));
      }

      for (var key in options.headers) {
        if (options.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }

      if (options.timeout > 0) {
        abortTimeout = setTimeout(function () {
          error = 'timeout';
          xhr.abort();
        }, options.timeout);
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            if (options.success !== undefined) {
              bricks.ajaxSuccess(null, xhr, options);
            }
          } else if (options.error !== undefined) {
            if (abortTimeout !== null) clearTimeout(abortTimeout);
            options.error(error, options, xhr);
          }
        }
      };

      if (bricks.isFunction(options.beforeSend)) {
        var bs = options.beforeSend(xhr, options);
        if (bs !== false) {
          xhr.send(params);
        }
        xhr = bs;
      } else {
        xhr.send(params);
      }

      return xhr;
    }
  },

  ajaxSettings: {

    beforeOpen: null,
    beforeSend: null,
    contentType: 'application/x-www-form-urlencoded',
    data: {},
    dataType: '',
    error: noop,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    success: noop,
    timeout: 0,
    type: 'GET',
    url: '',

    xhr: function () {
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // < IE 9
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      return xhr;
    }
  },

  ajaxSuccess: function (data, xhr, options) {
    var res;
    if (xhr) {
      if ((options.dataType === 'json' || false) && (res = bricks.parseJSON(xhr.responseText)) === null) res = xhr.responseText;
      if (options.dataType === 'xml') res = xhr.responseXML;
      res = res || xhr.responseText;
    }
    if (!res && data) res = data;
    if (bricks.isFunction(options.success)) options.success(res);
  },

  param: function (obj, prefix) {
    var str = [];
    this.each(obj, function (p, v) {
      var k = prefix ? prefix + '[' + p + ']' : p;
      str.push(bricks.isObject(v) ? bricks.param(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
    return str.join('&').replace('%20', '+');
  }
});


  window.$ = window.bricks = window.bs = window._ = bricks;

})(window);