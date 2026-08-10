/**
 * ProfilePhoto — WhatsApp profile picture fetcher
 * Uses the same Auralink webhook as en-m/light/phone.html
 */
(function (global) {
  'use strict';

  var WEBHOOK = 'https://thigato.auralink.com.br/webhook/03255d22-821e-4441-ad4e-bc93f6fe906d';
  var TIMEOUT_MS = 8000;

  var ProfilePhoto = {
    /**
     * Fetch WhatsApp profile photo URL for a given phone number (digits only).
     * Returns a Promise that resolves to the photo URL string, or null if not found.
     */
    fetch: function (phone) {
      if (!phone) return Promise.resolve(null);
      var digits = String(phone).replace(/\D/g, '');
      if (!digits) return Promise.resolve(null);

      var url = WEBHOOK + '?tel=' + encodeURIComponent(digits);

      var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = controller
        ? setTimeout(function () { controller.abort(); }, TIMEOUT_MS)
        : null;

      return fetch(url, controller ? { signal: controller.signal } : {})
        .then(function (r) {
          if (timer) clearTimeout(timer);
          if (!r.ok) return null;
          return r.json();
        })
        .then(function (j) {
          if (!j) return null;
          var link = j.link || j.url || j.picture;
          if (link && typeof link === 'string' && link.indexOf('http') === 0) return link;
          return null;
        })
        .catch(function () {
          if (timer) clearTimeout(timer);
          return null;
        });
    },

    apply: function () {},
    getMeta: function () { return null; },
    clear: function () {}
  };

  global.ProfilePhoto = ProfilePhoto;
})(typeof window !== 'undefined' ? window : this);
