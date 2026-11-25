/* Love Vision — conteúdo comum a todos os funis lv*. Cada config.js pode sobrescrever. */
window.LV_DEFAULTS = {
  offer: {
    price: '27',
    priceNote: 'one payment · no subscription · lifetime access',
    support: 'contacto@love-vision.site',
    // Rodapé (quiz e oferta). As páginas ainda não existem: o dono cria com os dados do vendedor.
    legalLinks: [
      { t: 'Terms', href: '/lv-legal/terms.html' },
      { t: 'Privacy', href: '/lv-legal/privacy.html' },
      { t: 'Refund policy', href: '/lv-legal/refund.html' }
    ],
    getTitle: 'What you get',
    // App Kit: apps reais (lojas oficiais), usados com o conhecimento da pessoa. Nunca chamar de "spy app".
    appKit: {
      title: 'The Love Vision App Kit',
      sub: 'The apps that actually work — on iPhone and Android — each with its own step-by-step setup lesson.',
      ios: ['Live location you both see — free, already on iPhone', 'Limits & app approvals for kids — free, built into iPhone', 'Family circle & arrival alerts — works across iPhone and Android', 'SOS call + lock-screen medical info — for Mom and Dad', 'Scam-call silencer — stops unknown numbers from ringing', 'Privacy check — who can see YOUR phone and location', 'AI safety alerts for a child or aging parent — flags danger, not every message'],
      android: ['Live location you both see — free, on most Android phones', 'Limits & app approvals for kids — free, from Google', 'Family circle & arrival alerts — works across iPhone and Android', 'SOS call shortcut — for Mom and Dad', 'Spam & scam call blocker — built into Pixel and Samsung', 'Account security check — lock YOUR accounts', 'AI safety alerts for a child or aging parent — flags danger, not every message'],
      note: 'Most are free and already on the phone. Where a paid app is worth it, we show you the free alternative too. All from the official App Store and Google Play — and every one is set up openly, with the other person’s knowledge.'
    },
    priceboxTitle: 'Get Love Vision today',
    priceboxItems: ['Instant access to all video lessons', 'The App Kit for iPhone & Android', 'Printable checklists & templates'],
    guaranteeShort: '30-day money-back guarantee · Secure checkout · No subscription',
    guaranteeTitle: '30 days to decide. Every cent back if it’s not for you.',
    // Só publicar "no questions" se o suporte cumprir (copy.md).
    guarantee: 'Watch the lessons and set up your first protection. If it’s not worth $27 to you, email contacto@love-vision.site within 30 days and get a full refund. No questions, no hoops — and keep the checklists.',
    modules: [
      { t: 'Start Here: Safety With Consent', p: 'What you’ll set up, and how to keep trust while you do it.' },
      { t: 'Protect Yourself First', p: 'Spot stalkerware and hidden Bluetooth trackers, log out unknown devices, lock your accounts.' },
      { t: 'Teens: Smart Guardrails', p: 'The built-in parental controls on iPhone and Android, social-media parent tools, location and the Family Phone Agreement.' },
      { t: 'Aging Parents: Safe & Independent', p: 'Automatic fall alerts, SOS, scam-call blocking, lock-screen medical info and location they agree to.' },
      { t: 'Couples: The Transparency Pact', p: 'Mutual location and agreed rules — and what to do when trust is still shaky.' },
      { t: 'The Whole Family Circle', p: 'The 3 family location apps compared — which one fits yours — arrival alerts and a family emergency plan.' },
      { t: 'Consent & The Law', p: 'Conversation scripts, the Family Agreement template and what is illegal.' },
      { t: 'AI Safety Watchdog (kids & aging parents)', p: 'Set up a trusted third-party AI that flags grooming, scams, sextortion and self-harm in a kid’s chats — or fraud aimed at your parents — and alerts you, openly and with their knowledge.' }
    ],
    notDo: [
      'It does not let you read anyone’s messages, WhatsApp or photos.',
      'It does not install hidden or “undetectable” apps.',
      'It does not track anyone without their knowledge.',
      'It is not a spy app — you get video lessons plus a kit of real apps from the App Store and Google Play, used with the other person’s knowledge.'
    ],
    legal: 'Monitoring another adult’s phone without their consent can be a crime in the US, UK, Canada and Australia (laws vary by state and country). Everything in Love Vision is done openly, with the other person’s knowledge and permission (or, for minors, as their parent or guardian).',
    faq: [
      { q: 'Is this a scam too?', a: 'Fair question — the internet is full of them. Here’s how we’re different: we tell you up front what Love Vision does NOT do (see the list above), every app we use comes from the official App Store or Google Play — no secret installs, no “enter a number” — there’s no subscription, and you get a 30-day money-back guarantee. You see the first lesson minutes after checkout.' },
      { q: 'Will the other person know?', a: 'Yes — and that’s why it works. Everything is done openly, which keeps it legal and keeps it from blowing up later. You get word-for-word scripts so it sounds like care, not control.' },
      { q: 'I’m not techy. Can I really do this?', a: 'Yes. Each lesson is a 5–12 minute screen recording: we tap, you copy. Every lesson has a printable checklist. If you can open Settings, you can do this.' },
      { q: 'Which apps do I get?', a: 'A short, tested list for each situation: 2 or 3 apps and built-in tools for your parents, for your kids, for your partner and for your own phone — 7 for iPhone and 7 for Android in the App Kit, plus the parent tools inside Instagram, TikTok and Snapchat. Most are free and already on the phone; all come from the official App Store or Google Play. The names are revealed inside, each with its own setup lesson. Where a paid app is worth it, we tell you why and show the free alternative.' },
      { q: 'Is it a subscription?', a: 'No. One payment of $27, lifetime access. No recurring charges.' },
      { q: 'How do I get access?', a: 'Right after payment you get an email with your login to the members area. Watch on your phone or computer.' },
      { q: 'What if it isn’t for me?', a: 'Email contacto@love-vision.site within 30 days for a full refund.' }
    ]
  }
};
window.LV_merge = function (cfg) {
  cfg.offer = Object.assign({}, window.LV_DEFAULTS.offer, cfg.offer || {});
  return cfg;
};
