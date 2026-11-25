/* Love Vision (family safety) — núcleo compartilhado dos funis lv*.
 * Repasse de UTMs, rastreamento e checkout. Sem dados pessoais na URL. */
(function (w, d) {
  'use strict';

  var GA_ID = 'G-XLQQWM3D3N';
  var CLARITY_ID = 'xq3x58b2lj';

  // ---- Rastreamento -------------------------------------------------------
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID);
  function add(src, attrs) {
    var s = d.createElement('script'); s.async = true; s.src = src;
    if (attrs) for (var k in attrs) s.setAttribute(k, attrs[k]);
    d.head.appendChild(s);
  }
  add('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
  (function (c, l, a, r, i) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    var t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    l.head.appendChild(t);
  })(w, d, 'clarity', 'script', CLARITY_ID);
  add('https://cdn.utmify.com.br/scripts/utms/latest.js', {
    'data-utmify-prevent-xcod-sck': '', 'data-utmify-prevent-subids': ''
  });

  function track(name, props) {
    props = props || {};
    props.lv_funnel = (w.LV_CONFIG && w.LV_CONFIG.funnel) || 'lv';
    props.lv_variant = (w.LV_CONFIG && w.LV_CONFIG.variant) || 'a';
    try { w.gtag('event', name, props); } catch (e) {}
    try { w.clarity('event', name); } catch (e) {}
  }

  // ---- Repasse de parâmetros ---------------------------------------------
  function buildForwardUrl(target, extra) {
    var url = new URL(target, w.location.href);
    var cur = new URLSearchParams(w.location.search);
    cur.forEach(function (v, k) { if (!url.searchParams.has(k)) url.searchParams.set(k, v); });
    if (extra) for (var k in extra) {
      if (extra[k] !== undefined && extra[k] !== null && extra[k] !== '') url.searchParams.set(k, extra[k]);
    }
    return url.toString();
  }
  function go(target, extra) { w.location.href = buildForwardUrl(target, extra); }

  // ---- Respostas do quiz (só nesta aba) -----------------------------------
  function getAnswers() {
    try { return JSON.parse(sessionStorage.getItem('lv_answers') || '{}'); } catch (e) { return {}; }
  }
  function setAnswers(a) {
    try { sessionStorage.setItem('lv_answers', JSON.stringify(a)); } catch (e) {}
  }

  // ---- Checkout -----------------------------------------------------------
  // Leva só plan (funil) e lvv (variante). UTMs vêm da URL atual.
  function goCheckout(where) {
    var cfg = w.LV_CONFIG || {};
    var url = cfg.checkout && cfg.checkout.url;
    track('lv_checkout_click', { lv_where: where || 'offer' });
    if (!url) {
      // Sem pop-up para o visitante: só log + evento. Quem chamou reabilita o botão (retorno false).
      try { console.warn('[LV] checkout.url vazio no funil ' + (cfg.funnel || 'lv')); } catch (e) {}
      track('lv_checkout_missing', { lv_where: where || 'offer' });
      return false;
    }
    go(url, { plan: cfg.funnel, lvv: cfg.variant || 'a' });
    return true;
  }

  // ---- Rodapé (quiz e oferta) --------------------------------------------
  // Só os links; as páginas /lv-legal/* ficam a cargo do dono.
  function footerHtml(extra) {
    var o = (w.LV_CONFIG && w.LV_CONFIG.offer) || {};
    var links = o.legalLinks || [];
    var sup = o.support || '';
    function e(s) { var x = d.createElement('div'); x.textContent = s; return x.innerHTML; }
    return '<footer class="lv-footer">' + (extra || '') +
      '<p class="lv-legal-links">' + links.map(function (l) { return '<a href="' + e(l.href) + '">' + e(l.t) + '</a>'; }).join(' · ') +
      (sup ? (links.length ? ' · ' : '') + '<a href="mailto:' + e(sup) + '">' + e(sup) + '</a>' : '') + '</p></footer>';
  }

  // ---- Pronomes/termo do parceiro (opt-in: cfg.pronounsFrom = id da pergunta) ----
  // Tokens: {they} {them} {their} {theyre} {are} {They} {Theyre} {partner}. Sem resposta: neutro (they/partner).
  var PRON = {
    he:   { they: 'he', them: 'him', their: 'his', theyre: 'he’s', are: 'is', They: 'He', Theyre: 'He’s', Their: 'His' },
    she:  { they: 'she', them: 'her', their: 'her', theyre: 'she’s', are: 'is', They: 'She', Theyre: 'She’s', Their: 'Her' },
    they: { they: 'they', them: 'them', their: 'their', theyre: 'they’re', are: 'are', They: 'They', Theyre: 'They’re', Their: 'Their' }
  };
  var PARTNER = { bf: ['he', 'boyfriend'], husband: ['he', 'husband'], gf: ['she', 'girlfriend'], wife: ['she', 'wife'] };
  function pron(s, ans) {
    var cfg = w.LV_CONFIG || {};
    if (!s || !cfg.pronounsFrom || String(s).indexOf('{') < 0) return s;
    var pick = PARTNER[(ans || {})[cfg.pronounsFrom]] || ['they', 'partner'];
    var P = PRON[pick[0]];
    return String(s).replace(/\{(they|them|their|theyre|are|They|Theyre|Their|partner)\}/g, function (_, k) { return k === 'partner' ? pick[1] : P[k]; });
  }

  // Volta o botão do estado "carregando" se a página voltar do cache.
  w.addEventListener('pageshow', function (e) {
    if (e.persisted) d.querySelectorAll('[data-loading]').forEach(function (b) { b.removeAttribute('data-loading'); });
  });

  w.LV = { track: track, go: go, buildForwardUrl: buildForwardUrl, goCheckout: goCheckout,
           footerHtml: footerHtml, getAnswers: getAnswers, setAnswers: setAnswers, pron: pron };
})(window, document);
