/* Love Vision — página de oferta montada a partir de window.LV_CONFIG.offer
 * e das respostas do quiz (sessionStorage). */
(function (w, d) {
  'use strict';
  var cfg = w.LV_CONFIG, o = cfg.offer, a = LV.getAnswers();
  var root = d.getElementById('offer');

  // Biblioteca de passos por pessoa. Só ferramentas reais e com consentimento.
  var PLAN = {
    parents: { label: 'Mom & Dad', icon: '👵', steps: {
      ios: ['Turn on the SOS emergency call shortcut (+ automatic fall alerts if they wear a smartwatch)', 'Turn on live location sharing with you — with their OK', 'Send unknown callers straight to voicemail + filter scam texts', 'Put their medical info on the lock screen for first responders'],
      android: ['Turn on the SOS emergency call shortcut (+ automatic fall alerts if they wear a smartwatch)', 'Turn on live location sharing with you — with their OK', 'Turn on the built-in spam & scam call blocking (🔒 the exact switch on Pixel and Samsung, revealed inside)', 'Add emergency info to the lock screen'] } },
    kids: { label: 'Your kids', icon: '🧒', steps: {
      ios: ['Turn on the built-in parental controls (🔒 revealed inside)', 'Content filters + approve every app download first', 'Live location — they know it’s on', 'The Family Phone Agreement, signed together'],
      android: ['Set up Google’s free parental-control app (🔒 revealed inside)', 'Approve apps and set daily limits', 'Live location — they know it’s on', 'The Family Phone Agreement, signed together'] } },
    partner: { label: 'Your partner', icon: '💑', steps: {
      ios: ['The Transparency Pact: how to propose it', 'Two-way live location sharing — free, already on iPhone', 'Rules you agree on together — and what stays private', 'What to do when trust is still shaky'],
      android: ['The Transparency Pact: how to propose it', 'Two-way live location sharing — free, on most Android phones', 'Rules you agree on together — and what stays private', 'What to do when trust is still shaky'] } },
    family: { label: 'The whole family', icon: '🏡', steps: {
      ios: ['Pick the right app: 3 family location apps compared (🔒 revealed inside)', 'Create a family circle with arrival alerts', 'Your family emergency plan'],
      android: ['Pick the right app: 2 family location apps compared (🔒 revealed inside)', 'Create a family circle with arrival alerts', 'Your family emergency plan'] } },
    me: { label: 'Your own phone', icon: '🛡️', steps: {
      ios: ['Run iPhone’s built-in privacy check: who can see your location', 'Find hidden Bluetooth trackers', 'Log out unknown devices (WhatsApp, Apple Account)', 'Lock accounts with 2FA'],
      android: ['Review who sees your location', 'Scan for unknown trackers', 'Log out unknown devices (WhatsApp, Google)', 'Lock accounts with 2FA'] } }
  };

  function esc(s) { var e = d.createElement('div'); e.textContent = s; return e.innerHTML; }

  var preset = (cfg.presetAnswers && cfg.presetAnswers.who) || null;  // funil dedicado manda no público
  var who = [].concat(preset || a.who || o.defaultWho || ['parents', 'kids', 'partner']);
  if (who.indexOf('me') < 0) who.push('me');               // autoproteção sempre entra
  // 'mixed' (ou não sabe) mostra as duas listas: iPhone e depois Android.
  var dev = a.device === 'android' ? 'android' : (a.device === 'mixed' ? 'mixed' : 'ios');
  var devLabel = { ios: 'iPhone steps shown', android: 'Android steps shown', mixed: 'iPhone & Android steps' }[dev];

  function stepsList(k, which) {
    return '<ol>' + PLAN[k].steps[which].map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
  }
  function appKitHtml() {
    var k = o.appKit; if (!k) return '';
    // Cada item = 'Função — detalhe'. O nome do app não aparece no funil: só dentro do curso.
    var lock = '<span style="font-size:12px;color:var(--muted);opacity:.85">🔒 ' + esc(k.lockLabel || 'App name revealed inside') + '</span>';
    function col(name, list) { return '<div class="lv-kit-col"><h4>' + name + '</h4><ul>' + list.map(function (x) { var p = x.split(' — '); return '<li><strong>🔒 ' + esc(p[0]) + '</strong>' + (p[1] ? '<span>' + esc(p[1]) + '</span>' : '') + lock + '</li>'; }).join('') + '</ul></div>'; }
    var cols = dev === 'android' ? col('Android', k.android) : dev === 'ios' ? col('iPhone', k.ios) : col('iPhone', k.ios) + col('Android', k.android);
    return '<section class="lv-card lv-kit"><p class="lv-kicker">📱 Included</p><h2>' + esc(k.title) + '</h2><p class="lv-sub">' + esc(k.sub) + '</p>' +
      '<div class="lv-kit-cols">' + cols + '</div><p class="lv-fine">' + esc(k.note) + '</p></section>';
  }

  function planHtml() {
    return who.filter(function (k) { return PLAN[k]; }).map(function (k) {
      var p = PLAN[k];
      var body = dev === 'mixed'
        ? '<p class="lv-plan-dev">iPhone</p>' + stepsList(k, 'ios') + '<p class="lv-plan-dev">Android</p>' + stepsList(k, 'android')
        : stepsList(k, dev);
      // Passo-zero emocional opcional (opt-in via o.planLeadByWho), antes dos passos técnicos.
      var lead = o.planLeadByWho && o.planLeadByWho[k] ? '<p class="lv-plan-lead">' + esc(o.planLeadByWho[k]) + '</p>' : '';
      return '<div class="lv-plan-item"><h4><span>' + p.icon + '</span> ' + esc(p.label) + '</h4>' + lead + body + '</div>';
    }).join('');
  }

  // Headline por preocupação do quiz (opcional): o.headlineByWorry = { scams: '…', … }.
  var headline = (o.headlineByWorry && a.worry && o.headlineByWorry[a.worry]) || o.headline;

  // CTA. soft=true usa o.ctaSoft (label suave, sem preço) e o estilo .lv-btn-soft — só se o funil
  // definir o.ctaSoft. Sem o.ctaSoft o botão fica IDÊNTICO ao de hoje (label o.cta, estilo cheio).
  function ctaBtn(where, soft) {
    var useSoft = soft && o.ctaSoft;
    return '<button class="lv-btn lv-btn-big' + (useSoft ? ' lv-btn-soft' : '') + '" data-cta="' + where + '">' +
      esc(useSoft ? o.ctaSoft : o.cta) + '</button>';
  }

  // Reality Report (lv-check): itens escolhidos pelas respostas, antes da oferta.
  function reportHtml() {
    var r = o.report; if (!r) return '';
    var items = r.items.filter(function (x) { return !x.show || x.show(a); });
    if (!items.length) return '';
    // Opt-in: um verdict marcado com lead:true sobe para logo após o 1º item (um respiro de
    // esperança antes da parede de "não/crime"). Sem nenhum lead, a ordem fica IDÊNTICA à de hoje.
    for (var li = 2; li < items.length; li++) {
      if (items[li].lead) { items.splice(1, 0, items.splice(li, 1)[0]); break; }
    }
    return '<section class="lv-card lv-report"><p class="lv-kicker">' + esc(r.kicker || 'Your free Reality Report') + '</p>' +
      '<h2>' + r.title + '</h2>' + (r.sub ? '<p class="lv-sub">' + esc(r.sub) + '</p>' : '') +
      items.map(function (x) {
        return '<div class="lv-verdict is-' + x.kind + '"><span class="lv-tag">' + esc(x.tag) + '</span>' +
          '<h4>' + esc(x.t) + '</h4>' +
          (x.empathy ? '<p class="lv-empathy">' + esc(x.empathy) + '</p>' : '') +
          '<p>' + esc(x.p) + '</p>' +
          (x.more ? '<p class="lv-more">🔓 <strong>' + esc(o.moreLabel || 'Inside Love Vision:') + '</strong> ' + esc(x.more) + '</p>' : '') + '</div>';
      }).join('') + '</section>';
  }

  // Desmascarar (lv-check): simulação de site espião → carimbo FAKE → teste da foto pública → truques.
  function unmaskHtml() {
    var u = o.unmask; if (!u) return '';
    var look = cfg.photoLookup && cfg.photoLookup.url;
    return '<section class="lv-card lv-unmask' + (u.full ? ' lv-unmask-full' : '') + '" id="lv-unmask">' +
      '<div class="lv-fakespy" id="lv-fakespy"><p class="lv-fs-label">' + esc(u.simLabel || 'SIMULATION — this is what spy sites show you') + '</p>' +
        '<p class="lv-fs-line" id="lv-fs-line">Connecting to device…</p>' +
        '<div class="lv-progress"><span id="lv-fs-bar" style="width:0"></span></div>' +
        '<div class="lv-fs-msgs"><i></i><i></i><i></i></div>' +
        '<div class="lv-stamp" id="lv-stamp">FAKE</div></div>' +
      (u.full ? '<div class="lv-unmask-after">' : '') +
      '<h2>' + u.title + '</h2><p class="lv-sub">' + esc(u.sub) + '</p>' +
      (look ? '<div class="lv-lookup"><h3>' + esc(u.tryTitle) + '</h3><p class="lv-sub">' + esc(u.trySub) + '</p>' +
        '<form id="lv-look-form" autocomplete="off"><input id="lv-look-num" type="tel" inputmode="tel" placeholder="+1 555 123 4567" aria-label="Phone number">' +
        '<button class="lv-btn" type="submit">' + esc(u.tryCta) + '</button></form>' +
        '<p class="lv-fine">' + esc(u.tryFine) + '</p><div id="lv-look-out"></div></div>' : '') +
      '<details class="lv-tricks"><summary>' + esc(u.tricksTitle) + '</summary>' +
      u.tricks.map(function (x) { return '<div class="lv-trick"><strong>' + esc(x.t) + '</strong><p>' + esc(x.p) + '</p></div>'; }).join('') +
      '</details>' +
      '<p class="lv-next">' + esc(u.next) + ' ↓</p>' + (u.full ? '</div>' : '') + '</section>';
  }

  // Ponte emocional opcional (opt-in via o.bridge): abre a oferta pela validação/"verdade + paz"
  // antes do preço. Só renderiza se o funil definir o.bridge; senão, string vazia (ordem intacta).
  function bridgeHtml() {
    var b = o.bridge; if (!b) return '';
    return '<section class="lv-card lv-bridge">' +
      (b.kicker ? '<p class="lv-kicker">' + esc(b.kicker) + '</p>' : '') +
      (b.title ? '<h2>' + b.title + '</h2>' : '') +
      (b.body ? '<p class="lv-sub">' + b.body + '</p>' : '') +
      (o.ctaSoft ? ctaBtn('bridge', true) : '') +
    '</section>';
  }

  // Hero. o.heroPriceHidden=true tira só o bloco de preço + o CTA + a linha de garantia da ABERTURA
  // (o preço continua no pricebox e na barra sticky). Sem o campo, o hero fica IDÊNTICO ao de hoje.
  function heroHtml() {
    return '<section class="lv-hero">' +
      (o.kicker ? '<p class="lv-kicker">' + esc(o.kicker) + '</p>' : '') +
      '<h1>' + headline + '</h1>' +
      '<p class="lv-sub">' + o.sub + '</p>' +
      (o.heroPriceHidden ? '' :
        '<div class="lv-price"><span class="lv-price-now">$' + o.price + '</span><span class="lv-price-note">' + esc(o.priceNote) + '</span></div>' +
        ctaBtn('hero', true) +
        '<p class="lv-fine">' + esc(o.guaranteeShort) + '</p>') +
    '</section>';
  }

  function planSecHtml() {
    return '<section class="lv-card"><h2>' + esc(o.planTitle || 'Your personal setup plan') + '</h2>' +
      '<p class="lv-sub">Based on your answers · ' + devLabel + '</p>' +
      '<div class="lv-plan">' + planHtml() + '</div></section>';
  }

  function whyHtml() {
    return o.why ? '<section class="lv-card lv-why"><h2>' + esc(o.why.title) + '</h2>' +
      o.why.items.map(function (x) { return '<div class="lv-why-item"><strong>' + esc(x.t) + '</strong><p>' + esc(x.p) + '</p></div>'; }).join('') +
      '</section>' : '';
  }

  function getHtml() {
    return '<section class="lv-card"><h2>' + esc(o.getTitle || 'What you get') + '</h2><ul class="lv-checks">' +
      o.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>' +
      '<h3>' + esc(o.modulesTitle || 'Inside: video lessons + App Kit') + '</h3><ul class="lv-modules">' +
      o.modules.map(function (m) { return '<li><strong>' + esc(m.t) + '</strong><span>' + esc(m.p) + '</span></li>'; }).join('') +
      '</ul></section>';
  }

  function priceboxHtml() {
    return '<section class="lv-card lv-pricebox"><h2>' + esc(o.priceboxTitle || 'Get Love Vision today') + '</h2>' +
      '<div class="lv-price">' + (o.priceFrom ? '<span class="lv-price-was">$' + o.priceFrom + '</span>' : '') + '<span class="lv-price-now">$' + o.price + '</span><span class="lv-price-note">' + esc(o.priceNote) + '</span></div>' +
      '<ul class="lv-checks small">' + (o.priceboxItems || ['Instant access to all video lessons', 'Printable checklists & templates', 'Works on iPhone and Android'])
        .map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      ctaBtn('pricebox') +
      '<div class="lv-guarantee"><strong>' + esc(o.guaranteeTitle) + '</strong><p>' + esc(o.guarantee) + '</p></div>' +
    '</section>';
  }

  function notDoHtml() {
    return '<section class="lv-card lv-notdo"><h2>What Love Vision does NOT do</h2><ul>' +
      o.notDo.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<p class="lv-fine">' + esc(o.legal) + '</p></section>';
  }

  function faqHtml() {
    return '<section class="lv-card"><h2>Questions</h2>' +
      o.faq.map(function (f) { return '<details><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('') +
      ctaBtn('faq') + '</section>';
  }

  // Ordem das seções. o.trustFirst=true sobe a prova-de-honestidade (notDo) para antes do pedido de
  // pagamento, para quem já foi queimada. Sem o campo, a ordem fica IDÊNTICA à de hoje.
  var sections = o.trustFirst
    ? [unmaskHtml(), reportHtml(), bridgeHtml(), heroHtml(), planSecHtml(), appKitHtml(), whyHtml(), notDoHtml(), getHtml(), priceboxHtml(), faqHtml()]
    : [unmaskHtml(), reportHtml(), bridgeHtml(), heroHtml(), planSecHtml(), appKitHtml(), whyHtml(), getHtml(), priceboxHtml(), notDoHtml(), faqHtml()];

  var html = sections.join('') +
    LV.footerHtml('<p>Love Vision is a video course with a curated kit of real iPhone and Android apps. It is not a spy app and does not access anyone’s phone.</p>') +

    '<div class="lv-sticky' + (o.stickyAfter ? ' is-hidden' : '') + '"><span>' + (o.priceFrom ? '<s>$' + o.priceFrom + '</s> ' : '') + '$' + o.price + ' · ' + esc(o.stickyNote || 'Instant access') + '</span>' + '<button class="lv-btn" data-cta="sticky">' + esc(o.stickyCta || 'Get access') + '</button>' + '</div>';

  root.innerHTML = LV.pron(html, a);

  // Opt-in: a barra fixa com preço só aparece quando a pessoa rola até o elemento o.stickyAfter.
  if (o.stickyAfter) {
    var stk = root.querySelector('.lv-sticky'), mark = root.querySelector(o.stickyAfter);
    var showStk = function () { if (stk) stk.classList.remove('is-hidden'); };
    if (!mark || !stk) showStk();
    else if (w.IntersectionObserver) {
      new IntersectionObserver(function (es, ob) {
        es.forEach(function (e) { if (e.isIntersecting || e.boundingClientRect.top < 0) { showStk(); ob.disconnect(); } });
      }).observe(mark);
    } else showStk();
  }

  // Rastreio: até onde a pessoa chega na oferta. Cada seção dispara lv_section_view uma vez,
  // quando o topo dela entra nos 60% de cima da tela (funciona mesmo em seção mais alta que a tela).
  if (w.IntersectionObserver) {
    var SECS = [['.lv-unmask', 'unmask'], ['.lv-report', 'report'], ['.lv-bridge', 'bridge'], ['.lv-hero', 'hero'],
                ['.lv-plan', 'plan'], ['.lv-kit', 'app_kit'], ['.lv-why', 'why'], ['.lv-notdo', 'not_do'],
                ['.lv-pricebox', 'pricebox'], ['.lv-footer', 'footer']];
    var secSeen = {};
    var secObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target.getAttribute('data-lv-sec');
        if (!secSeen[n]) { secSeen[n] = 1; LV.track('lv_section_view', { lv_section: n }); }
        secObs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -40% 0px', threshold: 0 });
    SECS.forEach(function (p) { var el = root.querySelector(p[0]); if (el) { el.setAttribute('data-lv-sec', p[1]); secObs.observe(el); } });
  }

  root.querySelectorAll('[data-cta]').forEach(function (b) {
    b.onclick = function () {
      b.setAttribute('data-loading', '');
      if (LV.goCheckout(b.getAttribute('data-cta')) === false) { b.removeAttribute('data-loading'); return; } // sem checkout: reabilita já
      setTimeout(function () { b.removeAttribute('data-loading'); }, 1500);
    };
  });
  if (o.unmask) runUnmask();
  function runUnmask() {
    var bar = d.getElementById('lv-fs-bar'), line = d.getElementById('lv-fs-line'), box = d.getElementById('lv-fakespy');
    var lines = ['Connecting to device…', 'Bypassing encryption…', 'Decrypting messages…', 'Loading messages…'], pct = 0;
    var t = setInterval(function () {
      pct += 7; if (pct > 98) pct = 98;
      bar.style.width = pct + '%'; line.textContent = lines[Math.min(3, Math.floor(pct / 25))] + ' ' + pct + '%';
      if (pct >= 98) { clearInterval(t); box.classList.add('is-busted'); line.textContent = o.unmask.busted; LV.track('lv_unmask_done');
        var sec = d.getElementById('lv-unmask'); if (sec) setTimeout(function () { sec.classList.add('is-revealed'); }, 700); }
    }, 140);
    var form = d.getElementById('lv-look-form'); if (!form) return;
    form.onsubmit = function (ev) {
      ev.preventDefault();
      var inp = d.getElementById('lv-look-num'), out = d.getElementById('lv-look-out');
      var dig = String(inp.value || '').replace(/\D/g, '');
      inp.value = '';                                   // o número não fica na página nem no navegador
      if (dig.length < 8) { out.innerHTML = '<p class="lv-fine">Type the full number with country code.</p>'; return; }
      out.innerHTML = '<p class="lv-fine">Checking what’s public…</p>';
      var ctrl = w.AbortController ? new AbortController() : null; if (ctrl) setTimeout(function () { ctrl.abort(); }, 9000);
      fetch(cfg.photoLookup.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tel: dig }),
        cache: 'no-store', referrerPolicy: 'no-referrer', signal: ctrl && ctrl.signal })
        .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
        .then(function (j) {
          dig = null;
          var url = j && (j.link || j.url || j.picture); url = (typeof url === 'string' && url.indexOf('https://') === 0) ? url : null;
          LV.track('lv_photo_check', { lv_found: url ? 'yes' : 'no' }); // só se achou ou não; nunca o número
          var u = o.unmask;
          out.innerHTML = url
            ? '<div class="lv-found"><img alt="" referrerpolicy="no-referrer"><div><strong>' + esc(u.foundTitle) + '</strong><p>' + esc(u.found) + '</p></div></div>'
            : '<div class="lv-found"><div class="lv-noimg">🔒</div><div><strong>' + esc(u.privateTitle) + '</strong><p>' + esc(u.private) + '</p></div></div>';
          if (url) out.querySelector('img').src = url;
          out.insertAdjacentHTML('beforeend', '<p class="lv-limit">' + esc(u.limit) + '</p>');
        });
    };
  }
  LV.track('lv_view', { lv_page: 'offer', lv_who: who.join(','), lv_device: dev });
})(window, document);
