/* Funil lv-parents — filhos adultos protegendo os pais idosos no celular, com o conhecimento e o OK deles. */
(function () {
  var D = window.LV_DEFAULTS.offer;
  // Mesmos 7 módulos dos defaults, com "Aging Parents" primeiro.
  var modules = [3, 0, 1, 7, 5, 6, 2, 4].map(function (i) { return D.modules[i]; });
  // Headline sazonal: até 4/jan/2027 (inclusive) fala dos feriados; a partir de 5/jan usa a de fora de temporada.
  var holiday = new Date() < new Date(2027, 0, 5);

  window.LV_CONFIG = LV_merge({
    funnel: 'lv-parents',
    variant: 'a',
    checkout: { url: '' }, // preencher com o link do checkout do produto novo na Monetizze
    presetAnswers: { who: ['parents'] },
    quiz: {
      intro: {
        kicker: 'Free 60-second check',
        title: 'If Mom or Dad needed help right now — <em>would you even know?</em>',
        sub: 'A fall in the kitchen. A “Grandma, I’m in jail, please don’t tell Mom” call. A phone that goes quiet for hours. Find out which safety features to turn on with your parents — on their phone, with their OK.',
        points: ['Fall alerts & SOS emergency calls', 'Location they choose to share with you', 'Scam call, text & WhatsApp blocking', 'Medical info for first responders'],
        cta: 'Start my free check →'
      },
      building: ['Checking your answers', 'Matching the right settings to their phone', 'Building your parents’ safety plan'],
      questions: [
        { id: 'alone', title: 'Does your mom or dad live alone?',
          options: [
            { v: 'alone', label: 'Yes, on their own', icon: '🏠' },
            { v: 'couple', label: 'No, they live together', icon: '👫' },
            { v: 'family', label: 'With family or help nearby', icon: '🏡' } ] },
        { id: 'device', title: 'What phone do your parents use?',
          options: [
            { v: 'ios', label: 'iPhone', icon: '' },
            { v: 'android', label: 'Android (Samsung, Pixel, Motorola…)', icon: '🤖' },
            { v: 'mixed', label: 'One of each / not sure', icon: '🔀' } ] },
        { id: 'scams', title: 'Have they gotten scam calls, texts or messages?',
          options: [
            { v: 'lost', label: 'Yes — and they lost money', icon: '💸' },
            { v: 'almost', label: 'Yes — they almost fell for one', icon: '😰' },
            { v: 'often', label: 'They get them all the time', icon: '☎️' },
            { v: 'unknown', label: 'Not that I know of', icon: '🤷' } ] },
        { id: 'out', title: 'Do they still drive or go out on their own?',
          options: [
            { v: 'drive', label: 'Yes, they drive', icon: '🚗' },
            { v: 'walk', label: 'They walk or take transit alone', icon: '🚶' },
            { v: 'home', label: 'They mostly stay home', icon: '🛋️' } ] },
        { id: 'talk', title: 'Would they agree if you explained it was for their safety?',
          options: [
            { v: 'yes', label: 'Yes, probably', icon: '🙂' },
            { v: 'unsure', label: 'Not sure how to bring it up', icon: '😬' },
            { v: 'no', label: 'They’d resist at first', icon: '🙅' } ] }
      ]
    },
    offer: {
      kicker: 'Your parents’ safety plan is ready',
      headline: holiday
        ? 'Seeing Mom and Dad this holiday season? <em>Turn on what’s already on their phone</em> — with their blessing.'
        : '<em>Keep an eye on Mom and Dad from anywhere</em> — with their blessing.',
      sub: holiday
        ? 'Fall alerts, SOS emergency calls, location they choose to share, scam-call blocking and lock-screen medical info — step by step, plus the exact words so it feels like love, not control. Do it together over the holidays, or walk them through it by phone.'
        : 'Fall alerts, SOS emergency calls, location they choose to share, scam-call blocking and lock-screen medical info — step by step, plus the exact words so it feels like love, not control. Do it together next visit, or walk them through it by phone.',
      cta: 'Protect My Parents – $27',
      stickyCta: 'Protect My Parents',
      planTitle: 'Your parents’ setup plan',
      why: { title: 'Why this can’t wait', items: [
        { t: 'Scammers go after older adults.', p: 'Americans 60 and older reported $7.7 billion in losses to the FBI’s Internet Crime Complaint Center in 2025 alone. The “grandchild in trouble” call, fake bank alerts, WhatsApp impostors — the blocking tools are already on their phone, often switched off.' },
        { t: 'Falls happen — often when no one is around.', p: 'The CDC says about 1 in 4 adults age 65 and older falls each year. Fall alerts and SOS emergency calling can call for help and alert their emergency contacts automatically — but only if someone sets them up first.' },
        { t: 'Distance makes every silence scarier.', p: 'When you live in another city, an unanswered call can mean hours of worry. Location they agree to share and medical info ready on the lock screen mean you — and first responders — are not left guessing.' } ] },
      bullets: [
        'Turn on <strong>SOS emergency calling</strong> and <strong>fall alerts</strong> (Apple Watch, Pixel Watch, Galaxy Watch) so help — and you — get the call',
        'See where Mom and Dad are in an emergency with location sharing <strong>they agree to</strong> — free on iPhone and Android',
        'Block scam calls, fake texts and WhatsApp impostors before they reach your parents',
        'Add an <strong>AI scam watchdog</strong> that reads the scam texts and messages aimed at your parents and warns you when something looks like fraud — set up with their OK (🔒 app revealed inside)',
        'Put <strong>their medical info</strong> and emergency contacts on the lock screen so first responders know who to call',
        'Get <strong>trusted access</strong> the right way — the official Apple and Google settings for account-recovery help and access if the worst happens — no password sharing',
        'Lock down <strong>your own phone</strong> too: who sees your location, unknown logins and 2FA',
        'Word-for-word scripts so it feels like care, not control — plus a printable Family Agreement'
      ],
      modules: modules,
      faq: [
        { q: 'Can AI really catch the scams?', a: 'Yes — we show you a trusted app that watches for fraud and scam messages aimed at your parents and warns you in time. You set it up together, with their OK, as a filter on their side — not a window into their private chats.' },
      { q: 'My parents live far away. Can I still do this?', a: 'Yes. Many steps can be done together over a phone or video call, and each lesson flags the ones that are easier in person — handy if you will see them over the holidays.' },
        { q: 'What if Mom or Dad says no?', a: 'Then you don’t turn it on. The course gives you scripts to explain why it matters and lets them choose what to share. Their phone, their decision.' },
        { q: 'Won’t they feel babysat?', a: 'Not if you bring it up the right way. You get scripts that frame it as “so I can stop worrying,” and they choose what to share. Most of it — fall alerts, SOS, scam blocking — is protection, not tracking.' },
        { q: 'Their phone is a few years old. Will this work?', a: 'Most of these features work on iPhones and Android phones from the last several years. Each lesson says which version you need and what to do if theirs is older.' }
      ].concat(D.faq)
    }
  });
})();
