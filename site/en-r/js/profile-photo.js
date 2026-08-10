/**
 * Profile photo stub (affiliate funnel — no backend).
 * Always resolves empty so UI falls back to default avatars.
 */
(function (global) {
  'use strict';

  var ProfilePhoto = {
    fetch: function () {
      return Promise.resolve(null);
    },
    apply: function () {},
    getMeta: function () { return null; },
    clear: function () {}
  };

  global.ProfilePhoto = ProfilePhoto;
})(typeof window !== 'undefined' ? window : this);
