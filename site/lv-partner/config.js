/* Funil lv-partner — UMA história ("Clarity"): da dor de não saber → à verdade → à paz.
 * Público: pessoa ferida que desconfia do parceiro, perde o sono, checa o celular e se odeia por isso.
 * Os 6 batimentos, uma voz só:
 *   1 Gancho/dor → quiz.intro (+ hero depois)   2 Quiz que acolhe → questions/building
 *   3 Virada: desmascarar o espião fake → offer.bridge   4 Esperança/o que é real → hero + why + planLead
 *   5 Entrega → bullets + modules + App Kit     6 Oferta → pricebox $27 + garantia + notDo + FAQ
 * Linha vermelha: monitorar o parceiro SÓ como pacto mútuo e consentido (ambos compartilham, aberto).
 * Nunca "veja o WhatsApp dele", nunca espionar escondido, nunca nome de app. Ver lv-copy/SKILL.md. */
// Teste A/B da abertura. ?lvv=a|b força; sem isso, sorteia 50/50 e guarda na sessão (quiz e oferta usam a mesma).
var LV_PARTNER_V = (function () {
  var m = /[?&]lvv=([ab])(&|$)/.exec(window.location.search);
  var v = m ? m[1] : null;
  try { v = v || sessionStorage.getItem('lv_partner_v'); } catch (e) {}
  v = v || (Math.random() < 0.5 ? 'a' : 'b');
  try { sessionStorage.setItem('lv_partner_v', v); } catch (e) {}
  return v;
})();
function lvHas(a, k, v) { return [].concat(a[k] || []).indexOf(v) > -1; }
window.LV_CONFIG = LV_merge({
  funnel: 'lv-partner',
  variant: LV_PARTNER_V,
  checkout: { url: 'https://pay.centerpag.com/KFD475604' }, // Monetizze 363001 / plano 391599 / checkout 475604 — US$27, sem bump
  presetAnswers: { who: ['partner'] },
  pronounsFrom: 'partnerType', // personaliza ele/ela/termo nas perguntas seguintes e na oferta
  quiz: {
    // BATIMENTO 1 — o gancho: nomear a dor exata e os dois medos, sem julgar.
    // BATIMENTO 1 — nomeia o DESEJO (sem prometer acesso). A desconstrução vem só na oferta, antes do preço.
    intro: LV_PARTNER_V === 'a' ? {
      kicker: 'Free 60-second check · 100% anonymous',
      title: 'Who are they <em>really</em> texting?',
      sub: 'Before you try anything, take this 60-second check. Messages, location, the person behind the late-night texts — find out what you can really see, the signs that someone’s hiding something, and the one way to know for sure that won’t put you at risk.',
      points: ['Can you see their messages? What’s real — and what’s a scam', 'The signs someone’s hiding something', 'What the science of lying says about their behavior', 'The way to know for sure — without putting yourself at risk'],
      cta: 'Find out what’s real →',
      fine: 'About 60 seconds. No name, no email, no sign-up.'
    } : {
      kicker: 'Free 60-second check · 100% anonymous',
      title: 'Think they’re hiding something <em>on their phone</em>?',
      sub: 'Here’s how people really find out. In 60 seconds: what you can really see on their phone, the signs that someone’s hiding something, and the one way to know for sure that won’t put you at risk.',
      points: ['Can you see their messages? What’s real — and what’s a scam', 'The signs someone’s hiding something', 'What the science of lying says about their behavior', 'The way to know for sure — without putting yourself at risk'],
      cta: 'Find out what’s real →',
      fine: 'About 60 seconds. No name, no email, no sign-up.'
    },
    progressFrom1: true,
    stepLabel: function (x, n) { return x === n ? 'Last question' : 'Question ' + x + ' of ' + n; },
    // BATIMENTO 2 — o quiz que acolhe: sentimento primeiro, aparelho no meio, fecho em esperança.
    questions: [
      { id: 'partnerType', title: 'Who’s on your mind?',
        options: [
          { v: 'bf', label: 'My boyfriend', icon: '💙' },
          { v: 'husband', label: 'My husband', icon: '💍' },
          { v: 'gf', label: 'My girlfriend', icon: '💗' },
          { v: 'wife', label: 'My wife', icon: '💍' },
          { v: 'other', label: 'My partner', icon: '🤍' } ] },
      { id: 'want', multi: true, title: 'What do you most want to find out about your {partner}?',
        sub: 'No judgment — pick everything that’s on your mind.',
        options: [
          { v: 'texting', label: 'Who {theyre} texting', icon: '💬' },
          { v: 'where', label: 'Where {they} really {are}', icon: '📍' },
          { v: 'lying', label: 'If {theyre} lying to me', icon: '🎭' },
          { v: 'someone', label: 'If there’s someone else', icon: '💔' },
          { v: 'deleted', label: 'What {they} deleted', icon: '🗑️' } ] },
      { id: 'trigger', title: 'What made you start to suspect?',
        sub: 'The moment it started to feel different.',
        options: [
          { v: 'found', label: 'I saw something on {their} phone — a message, a name, a photo', icon: '📱' },
          { v: 'routine', label: '{Their} routine changed — late nights, new plans, new “friends”', icon: '🕰️' },
          { v: 'distant', label: '{They} got distant — less affection, less intimacy', icon: '🥀' },
          { v: 'told', label: 'Someone told me something', icon: '🗣️' },
          { v: 'money', label: 'Money I can’t explain', icon: '💳' },
          { v: 'gut', label: 'A gut feeling I can’t shake', icon: '🌀' } ] },
      { id: 'signs', multi: true, title: 'What else have you noticed?',
        sub: 'Pick all that fit. These tell us a lot.',
        options: [
          { v: 'facedown', label: 'Phone always face-down or always with {them}', icon: '🔄' },
          { v: 'password', label: 'New password or lock {they} never had', icon: '🔐' },
          { v: 'cleared', label: 'Chats cleared, messages deleted', icon: '🧹' },
          { v: 'defensive', label: 'Gets defensive over simple questions', icon: '😤' },
          { v: 'late', label: 'Replies late — “busy” a lot more', icon: '⏳' },
          { v: 'looks', label: 'Suddenly cares a lot more about looks', icon: '🪞' },
          { v: 'none', label: 'Nothing specific — it just feels off', icon: '🤍' } ] },
      { id: 'device', title: 'What phone does your {partner} use?',
        options: [
          { v: 'ios', label: 'iPhone', icon: '' },
          { v: 'android', label: 'Android (Samsung, Motorola…)', icon: '🤖' },
          { v: 'mixed', label: 'Not sure', icon: '🤷' } ] },
      { id: 'tried', title: 'Have you tried anything to find out?',
        options: [
          { v: 'checked', label: 'I checked {their} phone', icon: '👀' },
          { v: 'app', label: 'I looked for an app or site to see {their} messages', icon: '🔎' },
          { v: 'asked', label: 'I asked {them} — and got nowhere', icon: '🤐' },
          { v: 'nothing', label: 'Nothing yet', icon: '✋' } ] },
      { id: 'mutual', title: 'If you could know for sure — safely — would you want to?',
        options: [
          { v: 'yes', label: 'Yes — I need to know', icon: '🕊️' },
          { v: 'scared', label: 'Yes, but I’m scared of what I’ll find', icon: '💗' },
          { v: 'unsure', label: 'I don’t know anymore', icon: '🤍' } ] }
    ],
    building: ['Reading the signs you noticed', 'Checking what’s really possible on {their} phone', 'Separating real red flags from fear', 'Building your plan to know for sure']
  },
  offer: {
    // BATIMENTO 4 — a esperança (hero): a promessa é verdade + paz, não features, não preço.
    kicker: 'Your clarity plan is ready',
    headline: 'Stop guessing. <em>Find out what’s real</em> — and get your peace back.',
    sub: 'Step-by-step videos: how to read the signs that actually mean something (and tell them apart from fear), what the science of deception really shows about someone hiding the truth, and the App Kit that brings real transparency to your relationship — so you find out without ever spying a phone.',
    cta: 'Get the truth — and my peace — $27',
    stickyCta: 'Get answers',
    stickyNote: '30-day refund',
    stickyAfter: '.lv-hero',          // a barra com preço só aparece quando a pessoa chega na oferta
    priceFrom: '47',                  // De/Por: válido só se o preço subir para $47 depois do lançamento
    priceNote: 'launch price · one payment · no subscription',
    // Segmento ferido: aquece antes do preço. O preço NUNCA some — fica no pricebox e na sticky.
    ctaSoft: 'Show me the honest way →',
    heroPriceHidden: true,
    trustFirst: true,
    // BATIMENTO 3 — a virada: desmascarar o espião fake (abre o resultado, com empatia).
    // Abertura da oferta: só a tela preta "descriptografando" → FAKE; depois revela a explicação e o teste da foto.
    unmask: {
      full: true,
      busted: 'Nothing was connected. It’s a timed animation — the same for every number.',
      simLabel: 'SIMULATION — this is what spy sites show you',
      title: 'This is exactly what <em>“spy” sites</em> show you',
      sub: 'The progress bar. The “decrypting” text. The blurred chats. It runs the same way for every number — even a fake one. Nothing is ever connected to any phone.',
      tryTitle: 'See what those sites really get from a number',
      trySub: 'Type your {partner}’s WhatsApp number. We’ll show you everything a website can actually get from it — the same thing spy sites sell as “proof they got in.”',
      tryCta: 'Show me what’s public',
      tryFine: 'Optional. The number is not saved, not stored and not shared — it’s used once to check the public photo and discarded.',
      foundTitle: 'This is {their} public profile photo.',
      found: 'It’s set to “Everyone” (WhatsApp’s default), so anyone with the number can see it. Spy sites show you this and call it “decrypted” — nothing was accessed.',
      privateTitle: 'No public photo found.',
      private: 'There may be no photo, or it’s limited to “My contacts” or “Nobody”. Then no website can see it — any site that “shows” it anyway is faking it.',
      limit: 'That’s the limit. WhatsApp messages, the photos sent in chats and calls are end-to-end encrypted and never public — any site that says it can show them from a number is lying.',
      tricksTitle: 'How fake spy sites trick you',
      tricks: [
        { t: '“We found their profile.”', p: 'They show the public profile photo — which anyone with the number can usually see — so it looks like they got in.' },
        { t: 'The progress bar.', p: 'A fixed-time animation. Type a real number or 000-000-0000: same result.' },
        { t: 'Blurred messages and “unlock” buttons.', p: 'Stock images. There is nothing behind the blur.' },
        { t: 'Countdowns and “only today” prices.', p: 'Fake urgency so you pay before you think.' },
        { t: 'Pay to see everything.', p: 'After paying you get an empty dashboard, a surprise subscription — or an app that exposes YOUR phone instead.' }
      ],
      next: 'You’ve seen the trick. Now, what’s real about what you want to know'
    },
    // BATIMENTO 3 — a virada, PERSONALIZADA: responde exatamente o que ela marcou no quiz (antes do preço).
    report: {
      kicker: 'Your answers, decoded',
      title: 'Here’s what’s <em>really</em> possible — based on what you told us',
      sub: 'Straight talk. No fake promises.',
      items: [
        { kind: 'myth', tag: 'Myth', t: 'Seeing who {theyre} texting — from your phone',
          empathy: 'Wanting to see it with your own eyes makes total sense.',
          p: 'You just saw how those sites fake it. No app or website can show you someone else’s messages from a number — WhatsApp and iMessage are encrypted end to end.',
          more: 'what you CAN do instead — including the apps that let a couple share access to messages with each other, openly.',
          show: function (a) { return lvHas(a, 'want', 'texting'); } },
        { kind: 'yes', tag: 'Possible · The real way', t: 'Knowing if {theyre} lying to you', lead: true,
          p: 'Lies leave traces — in behavior and in patterns, not on a spy screen. Behavioral science shows which tells are real, and which are myths that fool people.',
          more: 'the science of spotting a lie, step by step.' },
        { kind: 'yes', tag: 'Your signs, decoded', t: 'What you noticed means something',
          p: 'Some of what you picked are real red flags; others have everyday explanations. The difference is in the pattern — how many, since when, and what changed with them.',
          more: 'every sign you picked, what it usually means — and what it doesn’t.',
          show: function (a) { return [].concat(a.signs || []).filter(function (x) { return x !== 'none'; }).length > 0; } },
        { kind: 'yes', tag: 'Your gut, decoded', t: 'A feeling you can’t shake',
          p: 'Gut feelings often pick up on real changes before we can name them. The next step is turning that feeling into signals you can actually check.',
          more: 'how to turn the feeling into clear signs you can verify.',
          show: function (a) { return a.trigger === 'gut' || lvHas(a, 'signs', 'none'); } },
        { kind: 'yes', tag: 'Possible · Patterns first', t: 'Finding out if there’s someone else',
          p: 'The truth usually shows in patterns before it ever shows on a screen — routine, attention, secrecy, money. Knowing what to look for, and what it means together, gets you there.',
          show: function (a) { return lvHas(a, 'want', 'someone'); } },
        { kind: 'yes', tag: 'Possible · With their OK', t: 'Knowing where {they} really {are}',
          p: 'Live location you both see is free on any iPhone or Android. Set up together, it ends the guessing — and either of you can pause it, which is what keeps it honest.',
          show: function (a) { return lvHas(a, 'want', 'where'); } },
        { kind: 'hard', tag: 'Possible · Not simple', t: 'Seeing what {they} deleted',
          p: 'Deleted chats aren’t always gone — forensic examiners have recovered them in real investigations. But it takes the physical phone, specialized tools and, for someone else’s phone, legal authority like a court order. No website does it from a number.',
          more: 'when deleted messages can still exist — and the only real way to reach them.',
          show: function (a) { return lvHas(a, 'want', 'deleted'); } },
        { kind: 'hard', tag: 'Reality · It rarely brings peace', t: 'Checking {their} phone in secret',
          empathy: 'You’re not a bad person for looking — you’re hurting.',
          p: 'You usually find half a story, can’t ask about it without admitting you looked, and it can blow up on you. It keeps the doubt alive instead of ending it.',
          show: function (a) { return a.tried === 'checked'; } },
        { kind: 'crime', tag: 'Exists · Crime without consent', t: 'That app or site you looked at',
          p: 'The “enter a number” sites are scams. Real monitoring apps exist, but putting one on another adult’s phone without them knowing can be a crime — and many leak YOUR data.',
          more: 'how to check your own phone, and the legal ways to get transparency.',
          show: function (a) { return a.tried === 'app'; } }
      ]
    },
    // Ponte: depois da virada, o enquadramento verdade + paz (sem "conversa" ainda).
    bridge: {
      kicker: 'Take a breath',
      title: 'What you came for isn’t a spy app. It’s <em>the truth — and your peace back</em>.',
      body: 'Everything above comes down to this: the answer isn’t hidden inside {their} phone. It’s in the signs, the patterns and the science of how people hide things — and, if you both choose it, in transparency you share both ways. That’s the plan below.'
    },
    // BATIMENTO 4 — passo-zero emocional, antes dos passos técnicos do plano.
    planLeadByWho: { partner: 'The signal that brought you here — what it means, and what it doesn’t.' },
    planTitle: 'Your clarity plan',
    why: { title: 'Why this gives you answers — not more sleepless nights', items: [
      { t: 'The not-knowing is what’s hurting you.', p: 'Doubt is heavier than almost any answer. The fastest way out isn’t more spiraling at 2am — it’s learning which signs actually mean something, so you can tell a real red flag from fear talking.' },
      { t: 'Answers you get in the open are answers you can trust.', p: 'What you find in secret can’t be used, can’t be talked about, and can blow back on you — legally too. A straight answer to the right question is the only kind that actually ends the doubt.' },
      { t: 'Whatever the truth is, you come out protected.', p: 'If something’s wrong, you’ll know how to protect yourself, your phone and your accounts before you say a word. If it isn’t, you get your peace back. Either way you stop losing yourself to this.' } ] },
    // BATIMENTO 5 — a entrega. Transparência sempre como PACTO MÚTUO (ambos compartilham, aberto).
    bullets: [
      'How to <strong>read the signs</strong> that actually mean something — and tell them apart from fear',
      'What the <strong>science of lying</strong> really shows about someone hiding the truth — the real tells, and the myths that fool people',
      'The <strong>App Kit for a transparency pact</strong> — if you both choose it: location, social, even messages, shared both ways and open on both sides, with limits you set together',
      'Decide together <strong>what stays private</strong> — a healthy pact has limits for both of you',
      'Check <strong>your own phone</strong> for stalkerware, unknown Bluetooth trackers and devices still logged into your accounts',
      'And, when you are ready, <strong>the words that get an honest answer</strong> instead of a fight',
      'What to do <strong>if it turns out to be true</strong> — how to protect yourself, with support',
      'Works on iPhone and Android — including couples with one of each'
    ],
    modules: [
      { t: 'Start Here: The Truth Without the Blow-Up', p: 'How to get clarity without torching the relationship — or losing yourself.' },
      { t: 'Reading the Signs That Mean Something', p: 'The behavior and patterns that actually matter — and the ones that are just the not-knowing talking.' },
      { t: 'The Science of Spotting a Lie', p: 'What behavioral science really shows about someone hiding the truth — the real tells, and the Hollywood myths that fool people.' },
      { t: 'The App Kit: A Transparency Pact', p: 'If you both choose it: location, social, even messages — shared both ways, open, with limits you set together.' },
      { t: 'Protect Yourself First', p: 'Spot stalkerware and unknown Bluetooth trackers, log out devices you don’t recognize, lock your accounts.' },
      { t: 'The Conversation That Gets an Answer', p: 'When you are ready: word-for-word openers that sound like care, not an accusation — so you get the truth, not a fight.' },
      { t: 'If It’s True: Protect & Move Forward', p: 'How to protect yourself and your accounts, plus counseling, support and what a lawyer can legally obtain.' },
      { t: 'Consent & The Law', p: 'Why everything here is open and mutual — and what crosses the line into illegal.' }
    ],
    appKit: {
      title: 'The Love Vision App Kit',
      sub: 'The apps that actually work — on iPhone and Android — each with its own step-by-step setup lesson.',
      ios: [
        'Two-way live location you both see — free, already on iPhone',
        'A shared transparency setup you both agree to — open on both sides',
        'Hidden Bluetooth tracker check — for YOUR phone',
        'See which devices are logged into YOUR accounts',
        'Lock your accounts with two-factor — in minutes',
        'Scam-call silencer — stops unknown numbers from ringing'
      ],
      android: [
        'Two-way live location you both see — free, on most Android phones',
        'A shared transparency setup you both agree to — open on both sides',
        'Unknown tracker scan — for YOUR phone',
        'See which devices are logged into YOUR accounts',
        'Lock your accounts with two-factor — in minutes',
        'Spam & scam call blocker — built into Pixel and Samsung'
      ],
      note: 'Most are free and already on the phone. All from the official App Store and Google Play — and every one is set up openly, both of you knowing. The names and setup are revealed inside, each with its own lesson.'
    },
    // BATIMENTO 6 — a oferta. Preço visível aqui (nunca no topo), garantia, e a FAQ.
    priceboxTitle: 'Get your clarity today',
    priceboxItems: ['Instant access to every video lesson', 'The App Kit for iPhone & Android', 'Printable scripts, checklists & the Transparency Pact'],
    guarantee: 'Watch the lessons. If you don’t walk away calmer and clearer than any spy site ever left you, email contacto@love-vision.site within 30 days for a full refund. No questions, no hoops.',
    faq: [
      // Único lugar da página onde o "pode ser ansiedade" aparece — como validação, não acusação.
      { q: 'I already feel like something’s going on. Where do I start?', a: 'Right where you are. The course walks you through the signs that actually mean something — and helps you tell them apart from the fear and overthinking that make everything look suspicious. Then it shows you how to bring it up so you get a real answer instead of a denial, and your options, including counseling and what a lawyer can legally obtain. It does not show you how to get into their phone — nothing honest can, and answers you get in secret only trap you.' },
      { q: 'What if they won’t agree to anything?', a: 'That’s an answer too. There’s a lesson on exactly that: how to protect yourself, your phone and your accounts, and where to get support.' },
      { q: 'Is this a way to spy on my partner?', a: 'No. There’s nothing here for watching another adult in secret. The transparency part is two-way, visible to both of you, and either person can turn it off at any time — monitoring another adult without their consent can be a crime.' },
      { q: 'Those sites say they can read any WhatsApp from just the number. Can’t I use one?', a: 'No — and please don’t pay one. They can’t read anyone’s WhatsApp from a number; the chats are end-to-end encrypted. They take your money, and some quietly install something that exposes YOUR phone. The honest way is the one thing that actually ends the doubt.' }
    ].concat(window.LV_DEFAULTS.offer.faq)
  }
});
