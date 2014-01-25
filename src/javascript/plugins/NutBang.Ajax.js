function ajaxJSONP (url, options) {
  var name = (name = /callback\=([A-Za-z0-9\-\.]+)/.exec(url)) ? name[1] : 'jsonp' + (+new Date())
    , el = document.createElement('script')
    , abortTimeout = null
    , cleanUp = function () {
        if (abortTimeout !== null) clearTimeout(abortTimeout);
        nutbang(el).remove();
        try { delete window[name]; }
        catch (e) { window[name] = undefined; }
      }
    , abort = function (error) {
        cleanUp();
        if (error === 'timeout') window[name] = noop;
        if (nutbang.isFunction(options.error)) options.error(error, options);
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
    nutbang(el).remove();
    try { delete window[name]; }
    catch (e) { window[name] = undefined; }
    nutbang.ajaxSuccess(data, null, options);
  };

  options.data = nutbang.param(options.data);
  el.src = url.replace(/\=\?/, '=' + name);
  nutbang('head')[0].appendChild(el);
}

nutbang.extend({

  ajax: function (url, options) {
    options = options || nutbang.ajaxSettings;

    if (nutbang.isObject(url)) {
      if (nutbang.isFunction(options)) {
        url.success = url.success || options;
      }
      options = url;
      url = options.url;
    }

    if (nutbang.isFunction(options)) options = { success: options };

    for (var opt in nutbang.ajaxSettings) {
      if (!options.hasOwnProperty(opt)) {
        options[opt] = nutbang.ajaxSettings[opt];
      }
    }

    if (!url) return options.xhr();

    var xhr = options.xhr()
      , error = 'error'
      , abortTimeout = null
      , jsonp = options.dataType === 'jsonp'
      , mime = {
          html: 'text/html',
          text: 'text/plain',
          xml: 'application/xml, text/xml',
          json: 'application/json'
        }
      , params = nutbang.param(options.data) !== '' ? nutbang.param(options.data) : options.data;

    for (var k in mime) {
      if (url.indexOf('.' + k) !== -1 && !options.dataType) options.dataType = k;
    }

    if (jsonp || /\=\?|callback\=/.test(url)) {
      if (!/\=\?/.test(url)) url = (url + '&callback=?').replace(/[&?]{1,2}/, '?');
      return ajaxJSONP(url, options);
    }

    if (nutbang.isFunction(options.beforeOpen)) {
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
              nutbang.ajaxSuccess(null, xhr, options);
            }
          } else if (options.error !== undefined) {
            if (abortTimeout !== null) clearTimeout(abortTimeout);
            options.error(error, options, xhr);
          }
        }
      };

      if (nutbang.isFunction(options.beforeSend)) {
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
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      return xhr;
    }
  },

  ajaxSuccess: function (data, xhr, options) {
    var res;
    if (xhr) {
      if ((options.dataType === 'json' || false) && (res = nutbang.parseJSON(xhr.responseText)) === null) res = xhr.responseText;
      if (options.dataType === 'xml') res = xhr.responseXML;
      res = res || xhr.responseText;
    }
    if (!res && data) res = data;
    if (nutbang.isFunction(options.success)) options.success(res);
  },

  param: function (obj, prefix) {
    var str = [];
    this.each(obj, function (p, v) {
      var k = prefix ? prefix + '[' + p + ']' : p;
      str.push(nutbang.isObject(v) ? nutbang.param(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    });
    return str.join('&').replace('%20', '+');
  }
});
