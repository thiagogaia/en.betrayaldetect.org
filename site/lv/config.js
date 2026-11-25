/* Funil lv — genérico "the people you love" (pais, filhos, parceiro + autoproteção). */
window.LV_CONFIG = LV_merge({
  funnel: 'lv',
  variant: 'a',
  checkout: { url: '' }, // preencher com o link do checkout do produto novo na Monetizze
  quiz: {
    intro: {
      kicker: 'Free 60-second family safety check',
      title: 'Your parents. Your kids. Your own phone. <em>Which one is exposed right now?</em>',
      sub: 'Scam calls aimed at parents. Strangers in kids’ DMs. Your location shared without you knowing. The fixes are already built into every phone — often switched off. Find out which ones your family is missing.',
      points: ['Your aging parents', 'Your kids and teens', 'Your partner — by agreement', 'And your own phone'],
      cta: 'Start my free check →'
    },
    questions: [
      { id: 'who', multi: true, title: 'Who do you want to keep safe?', sub: 'Pick everyone that applies.',
        options: [
          { v: 'parents', label: 'My mom / dad', icon: '👵' },
          { v: 'kids', label: 'My kids / teens', icon: '🧒' },
          { v: 'partner', label: 'My partner / spouse', icon: '💑' },
          { v: 'family', label: 'Other relatives', icon: '🏡' },
          { v: 'me', label: 'Myself and my own phone', icon: '🛡️' } ] },
      { id: 'device', title: 'Which phones does your family use?',
        options: [
          { v: 'ios', label: 'Mostly iPhone', icon: '' },
          { v: 'android', label: 'Mostly Android', icon: '🤖' },
          { v: 'mixed', label: 'A mix of both', icon: '🔀' } ] },
      { id: 'worry', title: 'What worries you the most right now?',
        options: [
          { v: 'location', label: 'Not knowing where they are in an emergency', icon: '📍' },
          { v: 'scams', label: 'Scam calls, texts and fake messages', icon: '☎️' },
          { v: 'strangers', label: 'Strangers and bad content online', icon: '⚠️' },
          { v: 'exposed', label: 'Someone having access to MY phone', icon: '🔓' },
          { v: 'trust', label: 'Trust issues around phones at home', icon: '💔' } ] },
      { id: 'setup', title: 'Have you set up any safety tools on their phones?',
        options: [
          { v: 'none', label: 'No, nothing yet', icon: '❌' },
          { v: 'some', label: 'A few things, not sure they work', icon: '🤔' },
          { v: 'yes', label: 'Yes, but I want to do it right', icon: '✅' } ] },
      { id: 'talk', title: 'Would they agree if you explained it was for their safety?',
        options: [
          { v: 'yes', label: 'Yes, probably', icon: '🙂' },
          { v: 'unsure', label: 'Not sure how to bring it up', icon: '😬' },
          { v: 'no', label: 'They’d resist at first', icon: '🙅' } ] }
    ]
  },
  offer: {
    kicker: 'Your family plan is ready',
    headline: 'Every phone in your family has safety features <em>switched off</em>. Turn them on this weekend — together.',
    sub: 'Short step-by-step videos: location they agree to share, fall alerts, scam blocking, parental controls and a full security check of your own phone — plus the exact words to get everyone on board.',
    cta: 'Get my family plan – $27',
    stickyCta: 'Get my plan',
    why: { title: 'Why this can’t wait', items: [
      { t: 'Scammers go after older adults.', p: 'Americans 60 and older reported $7.7 billion in losses to the FBI’s Internet Crime Complaint Center in 2025 alone (FBI IC3 2025 report). The scam-blocking features are already on their phone — often switched off.' },
      { t: 'Kids get messages from strangers.', p: 'Many parents never turn on the free controls built into iPhone, Android, Instagram and TikTok.' },
      { t: 'Your own phone may be exposed.', p: 'Shared locations, old logged-in devices and hidden trackers are more common than people think. You can check in minutes.' } ] },
    bullets: [
      'See where your family is in an emergency — with location they agreed to share',
      'Turn on fall alerts & SOS emergency calling for Mom and Dad',
      'Block scam calls, fake texts and WhatsApp scams before they reach your parents',
      'Set up the built-in parental controls, content filters and app approvals for your kids',
      'The <strong>Transparency Pact</strong>: share location with your partner by mutual agreement',
      'Check <strong>your own phone</strong> for stalkerware, hidden Bluetooth trackers and unknown logins',
      'Word-for-word scripts + printable Family Agreement so nobody feels spied on'
    ]
  }
});
