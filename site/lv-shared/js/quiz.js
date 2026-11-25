/* Love Vision — motor do quiz. Lê window.LV_CONFIG.quiz e monta as telas.
 * Pergunta: {id, title, sub?, multi?, options:[{v,label,icon?}], showIf?(answers)} */
(function (w, d) {
  'use strict';
  var cfg = w.LV_CONFIG, q = cfg.quiz, root = d.getElementById('quiz');
  var answers = Object.assign({}, cfg.presetAnswers || {});
  var visible = function () { return q.questions.filter(function (x) { return !x.showIf || x.showIf(answers); }); };
  var idx = -1;

  function esc(s) { var e = d.createElement('div'); e.textContent = s; return e.innerHTML; }

  function progress(i, n) {
    // Opt-in q.progressFrom1: a barra conta o passo atual ((i+1)/n), para não abrir em 0% no passo 1.
    // Sem o campo, o cálculo fica IDÊNTICO ao de hoje (i/n).
    var pct = Math.round(((q.progressFrom1 ? i + 1 : i) / n) * 100);
    return '<div class="lv-progress" aria-hidden="true"><span style="width:' + pct + '%"></span></div>';
  }

  function renderIntro() {
    var it = q.intro;
    root.innerHTML =
      '<section class="lv-card lv-intro">' +
        (it.kicker ? '<p class="lv-kicker">' + esc(it.kicker) + '</p>' : '') +
        '<h1>' + it.title + '</h1>' +
        '<p class="lv-sub">' + it.sub + '</p>' +
        (it.points ? '<ul class="lv-points">' + it.points.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul>' : '') +
        '<button class="lv-btn" id="lv-start">' + esc(it.cta) + '</button>' +
        '<p class="lv-fine">' + esc(it.fine || 'Takes about 60 seconds. No personal data required.') + '</p>' +
      '</section>';
    d.getElementById('lv-start').onclick = function () { LV.track('lv_quiz_start'); next(); };
  }

  function renderQuestion(i) {
    var list = visible(), qq = list[i], multi = !!qq.multi;
    var sel = [].concat(answers[qq.id] || []);
    root.innerHTML =
      '<section class="lv-card">' + progress(i, list.length) +
        '<p class="lv-step">' + esc(q.stepLabel ? q.stepLabel(i + 1, list.length) : 'Question ' + (i + 1) + ' of ' + list.length) + '</p>' +
        '<h2>' + esc(LV.pron(qq.title, answers)) + '</h2>' +
        (qq.sub ? '<p class="lv-sub">' + esc(LV.pron(qq.sub, answers)) + '</p>' : '') +
        '<div class="lv-options' + (multi ? ' is-multi' : '') + '">' +
          qq.options.map(function (o) {
            return '<button class="lv-opt' + (sel.indexOf(o.v) > -1 ? ' is-on' : '') + '" data-v="' + o.v + '">' +
              (o.icon ? '<span class="lv-ico">' + o.icon + '</span>' : '') + '<span>' + esc(LV.pron(o.label, answers)) + '</span></button>';
          }).join('') +
        '</div>' +
        (multi ? '<button class="lv-btn" id="lv-next"' + (sel.length ? '' : ' disabled') + '>Continue</button>' : '') +
        (i > 0 ? '<button class="lv-back" id="lv-prev">← Back</button>' : '') +
      '</section>';
    root.querySelectorAll('.lv-opt').forEach(function (b) {
      b.onclick = function () {
        var v = b.getAttribute('data-v');
        if (!multi) { answers[qq.id] = v; LV.track('lv_quiz_answer', { q: qq.id, a: v }); next(); return; }
        var k = sel.indexOf(v); if (k > -1) sel.splice(k, 1); else sel.push(v);
        b.classList.toggle('is-on'); answers[qq.id] = sel.slice();
        d.getElementById('lv-next').disabled = !sel.length;
      };
    });
    if (multi) d.getElementById('lv-next').onclick = function () {
      LV.track('lv_quiz_answer', { q: qq.id, a: sel.join(',') }); next();
    };
    if (i > 0) d.getElementById('lv-prev').onclick = function () { idx -= 2; next(); };
    w.scrollTo(0, 0);
  }

  function renderBuilding() {
    var steps = q.building || ['Checking your answers', 'Matching the right tools for each phone', 'Building your step-by-step plan'];
    root.innerHTML = '<section class="lv-card lv-building"><h2>' + esc(q.buildingTitle || 'Building your plan…') + '</h2><ul>' +
      steps.map(function (s) { return '<li>' + esc(LV.pron(s, answers)) + '</li>'; }).join('') + '</ul></section>';
    var lis = root.querySelectorAll('li'), k = 0;
    var t = setInterval(function () {
      if (k < lis.length) { lis[k].classList.add('is-done'); k++; return; }
      clearInterval(t);
      LV.setAnswers(answers); LV.track('lv_quiz_complete');
      LV.go('offer.html');
    }, 650);
  }

  function next() {
    idx++;
    var list = visible();
    if (idx < list.length) renderQuestion(idx); else renderBuilding();
  }

  // Rodapé mínimo (links legais + suporte), fixo abaixo do quiz em todas as telas.
  root.insertAdjacentHTML('afterend', LV.footerHtml());
  LV.track('lv_view', { lv_page: 'quiz' });
  renderIntro();
})(window, document);
