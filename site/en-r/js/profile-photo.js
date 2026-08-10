/**
 * ProfilePhoto — WhatsApp profile picture fetcher
 * Uses the same Auralink webhook as en-m/light/phone.html
 */
(function (global) {
  'use strict';

  var WEBHOOK  = 'https://thigato.auralink.com.br/webhook/03255d22-821e-4441-ad4e-bc93f6fe906d';
  var TIMEOUT_MS = 9000;
  var _cache   = {}; // digitsKey -> photoUrl|null
  var _lastMeta = null;
  var _pending  = {}; // digitsKey -> Promise

  function normalizePhone(raw) {
    return String(raw || '').replace(/\D/g, '');
  }

  function isRealPhotoUrl(url) {
    if (!url || typeof url !== 'string') return false;
    if (url.indexOf('http') !== 0) return false;
    if (url.indexOf('default-avatar') >= 0) return false;
    if (url.indexOf('data:') === 0) return false;
    return true;
  }

  function _doFetch(dig) {
    if (_pending[dig]) return _pending[dig];
    if (dig in _cache) return Promise.resolve(_cache[dig]);

    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, TIMEOUT_MS) : null;

    var p = fetch(WEBHOOK + '?tel=' + encodeURIComponent(dig), controller ? { signal: controller.signal } : {})
      .then(function (r) {
        if (timer) clearTimeout(timer);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (j) {
        _lastMeta = j;
        var link = j && (j.link || j.url || j.picture);
        var url = (link && typeof link === 'string' && link.indexOf('http') === 0) ? link : null;
        _cache[dig] = url;
        delete _pending[dig];
        return url;
      })
      .catch(function () {
        if (timer) clearTimeout(timer);
        _cache[dig] = null;
        delete _pending[dig];
        return null;
      });

    _pending[dig] = p;
    return p;
  }

  var ProfilePhoto = {

    normalizePhone: normalizePhone,
    isRealPhotoUrl: isRealPhotoUrl,

    /** Fetch photo URL for a phone string (returns Promise<url|null>) */
    fetch: function (phone) {
      var dig = normalizePhone(phone);
      return dig ? _doFetch(dig) : Promise.resolve(null);
    },

    /** Fire-and-forget pre-fetch to warm cache */
    prefetch: function (phone) {
      var dig = normalizePhone(phone);
      if (dig) _doFetch(dig);
    },

    /**
     * Apply photo to a container element.
     * options.onResult(url) is called when the fetch completes.
     */
    apply: function (container, phone, options) {
      options = options || {};
      var dig = normalizePhone(phone);
      if (!dig) {
        if (typeof options.onResult === 'function') options.onResult(null);
        return;
      }
      _doFetch(dig).then(function (url) {
        if (!container) return;
        if (typeof options.onResult === 'function') options.onResult(url);
        // If caller didn't handle DOM, set img src directly
        if (url && !options.onResult) {
          var img = container.querySelector('img');
          if (img) img.src = url;
        }
      });
    },

    clearCache: function (phone) {
      var dig = normalizePhone(phone);
      delete _cache[dig];
      delete _pending[dig];
    },

    getLastMeta: function () { return _lastMeta; },
    getMeta:     function () { return _lastMeta; },
    clear:       function () { _cache = {}; _pending = {}; _lastMeta = null; }
  };

  global.ProfilePhoto = ProfilePhoto;

})(typeof window !== 'undefined' ? window : this);
