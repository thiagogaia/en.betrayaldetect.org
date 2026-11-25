/* Funil lv-check — "Reality Check": para quem chega querendo rastrear ou ler mensagens.
 * Entrega grátis o que é mito, o que é crime e o que funciona; o curso ensina o caminho que funciona.
 * Regra: o relatório nunca sugere que o comprador vai ter acesso escondido ao celular de outro adulto. */
(function () {
  function has(a, k, v) { return [].concat(a[k] || []).indexOf(v) > -1; }
  function adult(a) { return a.who && a.who !== 'kids'; }

  window.LV_CONFIG = LV_merge({
    funnel: 'lv-check',
    variant: 'a',
    checkout: { url: '' }, // preencher com o link do checkout do produto novo na Monetizze
    quiz: {
      intro: {
        kicker: 'Free 60-second reality check',
        title: 'Seen ads saying you can <em>read anyone’s WhatsApp</em> with just a number? Here’s what they don’t show you.',
        sub: 'Some of it is a scam. Some of it is a crime. And some of it really works — legally, on any iPhone or Android. 6 quick questions, then your free Reality Report.',
        points: ['What’s actually possible on iPhone vs Android', 'How the “enter a number” sites fake it — and how people get their money back', 'What really works — without breaking the law or exposing your own phone'],
        cta: 'Show me what’s real →',
        fine: 'About 60 seconds. No name, no email, no sign-up.'
      },
      progressFrom1: true,
      stepLabel: function (x, n) { return 'Just ' + x + ' of ' + n; },
      buildingTitle: 'Preparing your Reality Report…',
      building: ['Checking what’s possible on their phone', 'Comparing what spy sites claim vs what they deliver', 'Checking what’s legal in your situation', 'Building your Reality Report'],
      questions: [
        { id: 'who', title: 'Who is this about?',
          options: [
            { v: 'partner', label: 'My partner / spouse', icon: '💑' },
            { v: 'kids', label: 'My child / teen', icon: '🧒' },
            { v: 'parents', label: 'My mom / dad', icon: '👵' },
            { v: 'family', label: 'Someone else in my family', icon: '🏡' } ] },
        { id: 'want', multi: true, title: 'What would you like to be able to see?', sub: 'Pick everything you’ve thought about. No judgment.',
          options: [
            { v: 'messages', label: 'Their WhatsApp / messages', icon: '💬' },
            { v: 'location', label: 'Where they are', icon: '📍' },
            { v: 'contacts', label: 'Who they’re talking to', icon: '👥' },
            { v: 'deleted', label: 'Messages they deleted', icon: '🗑️' },
            { v: 'truth', label: 'Whether something is going on', icon: '🔍' },
            { v: 'safe', label: 'That they’re safe', icon: '🛟' } ] },
        { id: 'device', title: 'What phone do they use?',
          options: [
            { v: 'ios', label: 'iPhone', icon: '' },
            { v: 'android', label: 'Android (Samsung, Motorola…)', icon: '🤖' },
            { v: 'mixed', label: 'Not sure', icon: '🤷' } ] },
        { id: 'knows', title: 'Would they know about it?', sub: 'Totally honest — this just helps us give you real options, not a lecture.',
          options: [
            { v: 'yes', label: 'Yes, I’d tell them', icon: '🙂' },
            { v: 'no', label: 'I’d rather they didn’t', icon: '🤫' },
            { v: 'unsure', label: 'I haven’t decided', icon: '🤔' } ] },
        { id: 'paid', title: 'Have you already paid for an app or site that promised this?',
          options: [
            { v: 'yes', label: 'Yes — and it didn’t deliver', icon: '💸' },
            { v: 'about', label: 'I was about to', icon: '⏳' },
            { v: 'no', label: 'No', icon: '❌' } ] },
        { id: 'why', title: 'What’s behind it?',
          options: [
            { v: 'trust', label: 'I think something’s going on', icon: '💔' },
            { v: 'safety', label: 'I’m worried about their safety', icon: '🛟' },
            { v: 'scams', label: 'Scams and strangers online', icon: '⚠️' },
            { v: 'other', label: 'Something else', icon: '💭' } ] }
      ]
    },
    // Consulta da foto pública do WhatsApp. Vazio = o teste não aparece.
    // Usar um webhook SÓ do Love Vision, que aceite POST {tel} e NÃO salve execuções. O número não é guardado no site.
    photoLookup: { url: '' },
    offer: {
      unmask: {
        busted: 'Nothing was connected. It’s a timed animation — the same for every number.',
        simLabel: 'SIMULATION — this is what spy sites show you',
        title: 'This is exactly what <em>“spy” sites</em> show you',
        sub: 'The progress bar. The “decrypting” text. The blurred chats. It runs the same way for every number — even a fake one. Nothing is ever connected to any phone.',
        tryTitle: 'See the real limit for yourself',
        trySub: 'Type any WhatsApp number. We’ll show you everything a website can actually get from it.',
        tryCta: 'Show me what’s public',
        tryFine: 'Optional. The number is not saved, not stored and not shared — it’s used once to check the public photo and discarded.',
        foundTitle: 'This is their public profile photo.',
        found: 'Their photo privacy is set to “Everyone” (WhatsApp’s default), so anyone with the number can see it. It doesn’t mean anything was accessed.',
        privateTitle: 'No public photo found.',
        private: 'They may have no photo, or they’ve limited it to “My contacts” or “Nobody”. Then no website can see it — any site that “shows” it anyway is faking it.',
        limit: 'That’s the limit. WhatsApp messages, the photos they send and calls are end-to-end encrypted and never public — any site that says it can show them from a number is lying. “Last seen” and online status show only if their privacy settings allow it.',
        tricksTitle: 'How fake spy sites trick you',
        tricks: [
          { t: '“We found their profile.”', p: 'They show the public profile photo — which anyone with the number can usually see — so it looks like they got in.' },
          { t: 'The progress bar.', p: 'A fixed-time animation. Type a real number or 000-000-0000: same result.' },
          { t: 'Blurred messages and “unlock” buttons.', p: 'Stock images. There is nothing behind the blur.' },
          { t: 'Countdowns and “only today” prices.', p: 'Fake urgency so you pay before you think.' },
          { t: 'Pay to see everything.', p: 'After paying you get an empty dashboard, a surprise subscription — or an app that exposes YOUR phone instead.' }
        ],
        next: 'You’ve seen the trick. Here’s what’s actually real in your situation'
      },
      report: {
        title: 'Your Reality Report: what’s <em>actually</em> possible',
        sub: 'Based on your answers. No fake promises — including from us.',
        items: [
          { kind: 'myth', tag: 'Myth', t: 'Reading their WhatsApp with just the phone number',
            p: 'No app or website you can buy can do it — not on iPhone, not on Android. WhatsApp’s end-to-end encryption keeps chats on the devices in the conversation; the only known break-ins were government-grade spyware exploiting bugs that have since been patched. The sites that promise it take your money — and some ask you to install apps that expose YOUR phone.',
            more: 'the tricks these sites use, how to spot the next one in 5 seconds — and what is genuinely possible instead.',
            show: function (a) { return has(a, 'want', 'messages'); } },
          { kind: 'crime', tag: 'Exists · Crime without consent', t: 'Monitoring apps installed on the phone',
            empathy: 'No judgment for wanting to know — anyone hurting like this would look into it.',
            p: 'They exist — mostly for Android, where someone needs the unlocked phone in hand to install them; on iPhone they usually work through a stolen iCloud password instead. Putting one on another adult’s phone without their consent can be a crime in the US, UK, Canada and Australia — and many of these apps leak YOUR data too.',
            more: 'how these apps work, the risks nobody mentions, how to check if one is on YOUR phone — and the built-in, legal alternatives for kids and couples.',
            show: function (a) { return has(a, 'want', 'messages') || has(a, 'want', 'contacts') || (a.knows === 'no' && adult(a)); } },
          { kind: 'hard', tag: 'Reality · They usually find out', t: 'Doing it without them knowing',
            empathy: 'The urge to look in secret is completely human — here’s the catch nobody mentions.',
            p: 'Phones are built to warn people now. iPhone has a built-in check that lists everyone who can see their location, and both iPhone and Android alert people when an unknown tracker is moving with them. And what you find in secret can backfire — legally, on you.',
            more: 'how to get real answers out in the open: the signs that matter, the conversation that works, and what a lawyer can legally obtain.',
            show: function (a) { return a.knows === 'no' && adult(a); } },
          { kind: 'hard', tag: 'Possible · Not simple', t: 'Deleted messages aren’t always gone',
            p: 'Deleting a chat doesn’t wipe it for good. Forensic examiners — the same specialists police use — have recovered deleted WhatsApp conversations in real criminal investigations, from the phone itself or its backups. It’s specific work: it depends on the phone, how long ago it was deleted and whether a backup exists. For someone else’s phone it also takes legal authority, like a court order. No website does it remotely from a number.',
            more: 'where deleted messages can still exist, how to recover your own — and the only real way to reach someone else’s.',
            show: function (a) { return has(a, 'want', 'deleted'); } },
          { kind: 'yes', tag: 'Possible · With their OK', t: 'Knowing where they are — live',
            p: 'Live location with arrival alerts works on any iPhone or Android with free tools. Set it up together, and you’ll both know where you stand — and either of you can pause it, which is what keeps it honest.',
            more: 'step-by-step setup on every phone, plus the exact words to get them to say yes.',
            show: function (a) { return has(a, 'want', 'location') || has(a, 'want', 'safe') || adult(a); } },
          { kind: 'yes', tag: 'Possible · For your child', t: 'Seeing who your kid talks to and which apps they use',
            p: 'As a parent you can approve apps, set limits, manage who can contact them, and see who they follow and chat with (not what they say) — using controls built into iPhone, Android, Instagram, TikTok and Snapchat. Your kid knows the rules; you know they’re on.',
            more: 'the built-in parental controls on iPhone and Android and the parent tools inside Instagram, TikTok and Snapchat, step by step.',
            show: function (a) { return a.who === 'kids'; } },
          { kind: 'yes', tag: 'Possible · The honest way', t: 'Finding out if it’s real — or if it’s your anxiety',
            empathy: 'Wanting to check isn’t crazy — it’s what not-knowing does to a person.',
            p: 'When you’re hurting, everything looks like proof. The truth: some signs actually mean something — and a lot of them are just fear talking. There’s a way to tell them apart, checks you can run on your own phone and accounts, and a way to start the conversation that gets you an answer instead of a fight — so you can stop guessing and get your peace back.',
            more: 'the signs that matter vs the ones that are just fear, what to check on your own devices, the words that get an honest answer — and how to protect yourself and your peace whatever you find.',
            lead: true,
            show: function (a) { return has(a, 'want', 'truth') || a.why === 'trust'; } },
          { kind: 'yes', tag: 'You can act', t: 'You may be able to get your money back',
            p: 'If the app never did what it promised, you can request a refund or dispute the charge with your card issuer. Then check your own phone for anything it left behind.',
            more: 'how to request the refund or dispute, what to write, and how to scan your phone for anything it installed.',
            show: function (a) { return a.paid === 'yes'; } },
          { kind: 'yes', tag: 'Good call', t: 'You were about to pay for one',
            p: 'You just saw the animation they use. A progress bar and blurred chats for a phone number is the tell — every time.',
            more: 'a 5-second checklist to spot fake “monitoring” sites before you pay, and what to do instead.',
            show: function (a) { return a.paid === 'about'; } }
        ]
      },
      kicker: 'Your Reality Report is ready',
      headline: 'The “enter a number” sites are fake. <em>What actually works</em> fits in one weekend.',
      // Variante B para teste: 'Spy sites are a scam. <em>Knowing your people are safe</em> isn’t.'
      // Variante B (ferido): 'Spy sites can’t show you the truth. <em>You can still find it</em> — and your peace.'
      sub: 'Step-by-step videos for the methods that really work on iPhone and Android: live location they agree to, your kids’ phones, scam blocking and a full check of your own phone. All legal. All with tools you already have.',
      cta: 'Show me what really works – $27',
      stickyCta: 'Get access',
      stickyNote: '30-day refund',
      priceNote: 'one payment · no subscription · lifetime access',
      why: { title: 'Why this isn’t another scam', items: [
        { t: 'We tell you what we can’t do — before you pay.', p: 'Scroll down: there’s a whole section listing what Love Vision does NOT do. No spy site will ever show you that.' },
        { t: 'No secret installs. No “enter a number.”', p: 'Video lessons plus a kit of real apps from the App Store and Google Play, set up openly on phones you have in hand.' },
        { t: 'One payment. 30 days to change your mind.', p: 'No subscription, no surprise charges. Watch it — if it’s not worth $27 to you, email us and get every cent back.' } ] },
      bullets: [
        '<strong>Myths vs reality:</strong> what “spy apps” really do, which ones are scams and what can get you in legal trouble',
        '<strong>Live location</strong> with arrival alerts on any iPhone or Android — set up together, the right way',
        'See who your kids talk to and which apps they use, with the <strong>parental tools already on their phone</strong>',
        '<strong>Check your own phone</strong>: monitoring apps, unknown trackers, logged-in devices',
        'Already paid for a fake spy app? <strong>How to ask for your money back</strong> and clean your phone',
        'Deleted messages: when recovery is realistic, and how to recover <strong>your own</strong>',
        'Word-for-word scripts to bring it up — so you get answers, not a fight'
      ],
      guarantee: 'Watch the lessons. If you don’t get more straight answers than from every spy site you’ve seen put together, email contacto@love-vision.site within 30 days for a full refund. No hoops.',
      faq: [
        { q: 'Is this a scam too?', a: 'Fair question after what you just saw. Here’s the difference: we tell you up front what this does NOT do (see the list above), there’s nothing to install or connect, it’s one payment with no subscription, and you have 30 days to ask for every cent back. You see the first lesson minutes after checkout.' },
        { q: 'Can this show me their messages?', a: 'No. Nothing legal can do that from a phone number, and we won’t pretend otherwise. What the course shows you is what does work: location they agree to, parental tools for your kids, how to find out what’s going on out in the open — and how to protect your own phone.' },
        { q: 'Will they know?', a: 'Yes. Everything in Love Vision is done openly — that’s what keeps it legal and what makes it last. You get word-for-word scripts so it sounds like care, not accusation.' },
        { q: 'I already paid for a spy app. Can you help?', a: 'Yes. There’s a lesson on requesting a refund or disputing the charge, and on checking your phone for anything that app installed.' },
        { q: 'I’m not techy. Can I really do this?', a: 'Yes. Each lesson is a 5–12 minute screen recording: we tap, you copy. Every lesson has a printable checklist. If you can open Settings, you can do this.' },
        { q: 'How do I get access?', a: 'Right after payment you get an email with your login to the members area. Watch on your phone or computer.' },
        { q: 'What if it isn’t for me?', a: 'Email contacto@love-vision.site within 30 days for a full refund.' }
      ],
      modules: [
        { t: 'Myths vs Reality', p: 'What spy apps really do, the scams, the risks and what the law says — before you spend another dollar.' },
        { t: 'Start Here: Safety With Consent', p: 'What you’ll set up, and how to keep trust while you do it.' },
        { t: 'Protect Yourself First', p: 'Spot stalkerware and hidden Bluetooth trackers, log out unknown devices, lock your accounts.' },
        { t: 'Teens: Smart Guardrails', p: 'The built-in parental controls on iPhone and Android, social-media parent tools, location and the Family Phone Agreement.' },
        { t: 'Aging Parents: Safe & Independent', p: 'Automatic fall alerts, SOS, scam-call blocking, lock-screen medical info and location they agree to.' },
        { t: 'Couples: The Transparency Pact', p: 'Mutual location, agreed rules — and what to do when you suspect something.' },
        { t: 'Deleted Messages & Legal Options', p: 'Recovering your own chats, and how evidence works when it goes to a lawyer.' }
      ]
    }
  });
})();
