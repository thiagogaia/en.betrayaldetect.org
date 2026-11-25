/* Funil lv-kids — pais de crianças e adolescentes (8–17). Tudo às claras: o filho sabe o que está ligado. */
window.LV_CONFIG = LV_merge({
  funnel: 'lv-kids',
  variant: 'a',
  checkout: { url: '' }, // preencher com o link do checkout do produto novo na Monetizze
  presetAnswers: { who: ['kids'] },
  quiz: {
    intro: {
      kicker: 'Free 60-second check for parents',
      title: 'Your kid’s phone can reach <em>anyone</em>. Do you know who can reach <em>them</em>?',
      sub: 'Strangers in DMs and game chats. Sextortion scams aimed at teens. Content no child should see. Most of the protection is already built into their phone — it just isn’t switched on. Find out what yours needs.',
      points: ['Kids and teens, roughly 8 to 17', 'iPhone, Android or a mix', 'Instagram, TikTok, Snapchat and games', 'Set up openly — your kid knows the rules'],
      cta: 'Start my free check →'
    },
    building: ['Checking your answers', 'Matching the right controls for your kid’s phone', 'Building your step-by-step family plan'],
    questions: [
      { id: 'age', title: 'How old is your child?', sub: 'If you have more than one, pick the one you’re most worried about.',
        options: [
          { v: '8-10', label: '8 to 10 — first phone or tablet', icon: '🧒' },
          { v: '11-13', label: '11 to 13 — starting social media and group chats', icon: '📱' },
          { v: '14-17', label: '14 to 17 — a teen with their own online life', icon: '🧑' } ] },
      { id: 'device', title: 'What phone does your child use?',
        options: [
          { v: 'ios', label: 'iPhone', icon: '' },
          { v: 'android', label: 'Android', icon: '🤖' },
          { v: 'mixed', label: 'A mix (or not sure yet)', icon: '🔀' } ] },
      { id: 'worry', title: 'What worries you the most right now?',
        options: [
          { v: 'strangers', label: 'Strangers or predators contacting them', icon: '⚠️' },
          { v: 'sextortion', label: 'Being pressured for photos, or blackmailed with them', icon: '🚨' },
          { v: 'content', label: 'Violent, sexual or self-harm content', icon: '🙈' },
          { v: 'screen', label: 'Too much screen time — sleep, grades, mood', icon: '⏰' },
          { v: 'location', label: 'Not knowing where they are', icon: '📍' } ] },
      { id: 'setup', title: 'Have you set up any parental controls on their phone?',
        options: [
          { v: 'none', label: 'No, nothing yet', icon: '❌' },
          { v: 'some', label: 'A few things, not sure they work', icon: '🤔' },
          { v: 'yes', label: 'Yes, but I want to do it right', icon: '✅' } ] },
      { id: 'talk', title: 'Does your child know you want to set rules for their phone?',
        options: [
          { v: 'yes', label: 'Yes, we’ve talked about it', icon: '🙂' },
          { v: 'unsure', label: 'Not yet — I don’t know how to bring it up', icon: '😬' },
          { v: 'no', label: 'They’ll push back hard', icon: '🙅' } ] }
    ]
  },
  offer: {
    kicker: 'Your family plan is ready',
    headline: 'Your kid’s phone has a lock on every door. <em>Most parents never turn them on.</em>',
    sub: 'Step-by-step videos: the built-in parental controls on iPhone and Android, the parent tools buried inside Instagram, Snapchat and TikTok, content filters and location your kid knows is on — plus a Family Phone Agreement you sign together.',
    cta: 'Start Protecting My Kid – $27',
    stickyCta: 'Protect my kid',
    planTitle: 'Your kid’s setup plan',
    why: { title: 'Why this can’t wait', items: [
      { t: 'Predators go where kids are.', p: 'Group chats, game lobbies and DMs let an adult stranger pose as a kid, build trust over weeks and then ask to move to a private app. Most parents only find out after it has started.' },
      { t: 'Sextortion is hitting teens — fast.', p: 'From October 2021 to March 2023, the FBI and Homeland Security Investigations received more than 13,000 reports of financial sextortion of minors, mostly boys age 14 to 17 (FBI, January 2024). A fake profile gets an image, then demands money right away. Kids who know what to do in the first hour are far safer.' },
      { t: 'Harmful content finds them on its own.', p: 'Feeds can push violent, sexual, self-harm and eating-disorder content to kids who never searched for it, and endless scrolling eats sleep. The content filters and limits are already on their phone — often switched off.' } ] },
    bullets: [
      'Set up <strong>the free parental controls built into iPhone and Android</strong> step by step — app approvals, purchase approvals, daily limits and downtime',
      'Turn on content restrictions, web filters and iPhone’s <strong>built-in nudity warning</strong>, which warns your child before they view or send nude images',
      'Connect <strong>the parent tools inside Instagram, Snapchat and TikTok</strong> to see who they follow and set limits — with your teen’s knowledge',
      'Share location your kid <strong>knows is on</strong>, with arrival alerts for school and practice',
      'Add an <strong>AI safety watchdog</strong> that quietly flags grooming, sextortion, scams and self-harm talk in your kid’s chats and alerts <em>you</em> — so you step in, without reading every message (🔒 app revealed inside)',
      'Know the warning signs of <strong>grooming and sextortion</strong> — and exactly what to do in the first hour: don’t pay, keep the evidence, report it',
      'The <strong>Family Phone Agreement</strong>: a printable template plus word-for-word scripts, so rules feel fair instead of like punishment',
      'Lock down <strong>your own phone</strong> too: unknown logins, shared passwords and 2FA'
    ],
    modules: [
      { t: 'Teens: Smart Guardrails', p: 'The built-in parental controls on iPhone and Android, social-media parent tools, location and the Family Phone Agreement.' },
      { t: 'AI Safety Watchdog', p: 'Set up a trusted AI that flags grooming, scams, sextortion and self-harm in your kid’s chats and alerts you — the warnings, not a feed of every message.' },
      { t: 'Start Here: Safety With Consent', p: 'What you’ll set up, and how to keep trust while you do it.' },
      { t: 'Protect Yourself First', p: 'Spot stalkerware and unknown Bluetooth trackers, log out unknown devices, lock your accounts.' },
      { t: 'The Whole Family Circle', p: 'The 3 family location apps compared — which one fits yours — arrival alerts and a family emergency plan.' },
      { t: 'Consent & The Law', p: 'Conversation scripts, the Family Agreement template and what is illegal.' },
      { t: 'Aging Parents: Safe & Independent', p: 'Automatic fall alerts, SOS, scam-call blocking, lock-screen medical info and location they agree to.' },
      { t: 'Couples: The Transparency Pact', p: 'Mutual location and agreed rules — and what to do when trust is still shaky.' }
    ],
    faq: [
      { q: 'What’s the AI watchdog — is it spyware?', a: 'No. It’s a trusted, well-known parental-safety app (revealed inside) that scans your child’s chats for real danger — grooming, sextortion, scams, self-harm — and sends <em>you</em> an alert, instead of a live feed of everything they say. You set it up openly, as their parent.' },
      { q: 'Can I read my kid’s messages?', a: 'Not with this course — and you don’t need to. What you get is what actually protects them: managing who can contact them and which apps they install, seeing who they follow on social media, content filters, warnings on explicit images (on iPhone) and location they know is on. Plus the warning signs of grooming and sextortion, so you know when to step in.' },
      { q: 'My kid will push back hard. Now what?', a: 'There’s a lesson for exactly that: how to present the rules as a deal (more freedom as they show responsibility), and the Family Phone Agreement you sign together so it’s fair, not punishment.' },
      { q: 'Is this a scam too?', a: 'No. It’s video lessons plus a kit of real apps from the App Store and Google Play — no secret installs — one payment with no subscription, and a 30-day money-back guarantee. We even list what it does NOT do, above.' },
      { q: 'Will my kid know the controls are on?', a: 'Yes — and that is the point. The built-in parental controls on iPhone and Android are visible to your child by design. You’ll get scripts to explain it and a Family Phone Agreement to sign together, so the rules feel fair.' },
      { q: 'Do I need to buy any app?', a: 'No. We use tools that are free and already on iPhone and Android, plus the free parent tools inside Instagram, TikTok and Snapchat.' },
      { q: 'My teen is 15. Isn’t it too late?', a: 'No. The course shows age-appropriate guardrails for older teens — fewer restrictions, more agreement — and how to loosen them as they earn trust.' },
      { q: 'I’m not good with phones. Can I do this?', a: 'Each lesson is 5–12 minutes of screen recording, step by step, with a printable checklist. If you can open Settings, you can do it.' },
      { q: 'How do I get access?', a: 'Right after payment you get an email with your login to the members area. Watch on your phone or computer.' },
      { q: 'What if it isn’t for me?', a: 'You have 30 days to ask for a full refund at contacto@love-vision.site.' }
    ]
  }
});
