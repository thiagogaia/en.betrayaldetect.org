# Love Vision: proposta de copy (copy chief, 25/11/2026)

Escopo: funis `site/lv`, `lv-parents`, `lv-kids`, `lv-partner` e `lv-check` (prioritário). Nada em `site/` foi editado. Tudo abaixo está pronto para colar no `config.js` indicado. Os textos usam apóstrofo tipográfico (’) para não quebrar as strings JS entre aspas simples.

Legenda de prioridade: **[ALTA]** mexe direto na conversão ou tira um risco (reembolso, política, linha vermelha). **[MÉDIA]** melhora clara. **[BAIXA]** polimento.

Números marcados com **[CONFERIR]** têm fonte oficial, mas é preciso abrir a fonte e confirmar o texto exato antes de publicar.

---

## 0. Problemas transversais (valem para todos os funis)

1. **[ALTA] Falta a objeção nº 1 deste público: "is this a scam too?".** Quem chega do tráfego de espionagem já viu (ou pagou) um site falso. O FAQ padrão não fala disso. Resolvido com a nova FAQ em `defaults.js` e com o bloco `why` do lv-check.
2. **[ALTA] Headlines começando com "Learn how to…".** Soa como aula, não como resultado. Trocar por resultado + contraste.
3. **[MÉDIA] Garantia genérica.** Dá para torná-la agressiva e verdadeira, desde que o reembolso em 30 dias seja de fato honrado sem perguntas pelo suporte.
4. **[MÉDIA] `priceNote` não quebra a objeção de "assinatura escondida"**, que é a experiência típica de quem comprou um spy app. Proposta: "one payment · no subscription · lifetime access".
5. **[BAIXA, motor, não é config]** Em `offer.js`, os títulos "What you get" e "Get Love Vision today" e os 3 itens fixos do pricebox são hardcoded. Sugiro ao orquestrador expor `o.getTitle`, `o.priceboxTitle` e `o.priceboxItems`. Também vale considerar uma headline por `worry` (`o.headlineByWorry`), já que o quiz coleta a preocupação e a oferta ignora.

### defaults.js → offer (vale para todos que não sobrescrevem)

```js
priceNote: 'one payment · no subscription · lifetime access',
guaranteeShort: '30-day money-back guarantee · Secure checkout · No subscription',
guaranteeTitle: '30 days to decide. Every cent back if it’s not for you.',
guarantee: 'Watch the lessons and set up your first protection. If it’s not worth $27 to you, email support@love-vision.site within 30 days and get a full refund. No questions, no hoops — and keep the checklists.',
```
Por quê: tira o medo de cobrança recorrente e transforma a garantia em argumento. **Só publicar "no questions" se o suporte cumprir.**

```js
faq: [
  { q: 'Is this a scam too?', a: 'Fair question — the internet is full of them. Here’s how we’re different: we tell you up front what this course does NOT do (see the list above), there’s nothing to install or connect, there’s no subscription, and you get a 30-day money-back guarantee. You see the first lesson minutes after checkout.' },
  { q: 'Will the other person know?', a: 'Yes — and that’s why it works. Everything is done openly, which keeps it legal and keeps it from blowing up later. You get word-for-word scripts so it sounds like care, not control.' },
  { q: 'I’m not techy. Can I really do this?', a: 'Yes. Each lesson is a 5–12 minute screen recording: we tap, you copy. Every lesson has a printable checklist. If you can open Settings, you can do this.' },
  { q: 'Do I need to buy an app?', a: 'No. We use tools that are free and already on iPhone and Android (Screen Time, Family Link, Find My, Google Maps, Safety Check). Life360 is optional.' },
  { q: 'Is it a subscription?', a: 'No. One payment of $27, lifetime access. No recurring charges.' },
  { q: 'How do I get access?', a: 'Right after payment you get an email with your login to the members area. Watch on your phone or computer.' },
  { q: 'What if it isn’t for me?', a: 'Email support@love-vision.site within 30 days for a full refund.' }
]
```
Atenção: `lv-parents` e `lv-partner` fazem `.concat(D.faq)` e herdam essa lista inteira. O `lv-kids` tem FAQ própria (ver abaixo).

---

## 1. lv-check (PRIORITÁRIO) — Reality Check

### Diagnóstico (priorizado)
1. **[ALTA] Contradição que destrói a confiança:** a headline diz "Spying is a myth", mas o próprio relatório mostra "Monitoring apps… They exist". Quem é cético (o público inteiro) percebe a contradição e conclui que somos "mais um". A promessa precisa ser: *os sites são falsos; o que funciona é outra coisa*.
2. **[ALTA] Insinuação que fere a linha vermelha e gera reembolso:** o `more` do item "Myth" promete "the methods that really work with iPhones, what each one shows you". Em contexto de "ler WhatsApp", isso sugere que o curso ensina a ler mensagens. Esse comprador pede reembolso, e com razão. Além disso, o item `crime` promete "the legal version (with consent, or for your minor child)", o que soa como ensinar a instalar app de monitoramento, outra linha vermelha.
3. **[ALTA] Imprecisões no Reality Report:** (a) o item de localização diz que ela "can’t be ‘turned off’ without you knowing". Não é verdade (dá para pausar ou parar o compartilhamento), e o texto ainda soa como controle. (b) Em `unmask.limit`, "‘last seen’ history are not public" é contestável: o status online pode estar visível aos contatos conforme a privacidade. O argumento mais forte e exato é a criptografia de ponta a ponta. Imprecisão num funil cujo argumento é "nós falamos a verdade" é fatal.
4. **[ALTA] Ninguém responde "is this a scam too?" nem "will they know?".** Depois de ver o carimbo FAKE, o próximo pensamento é "e vocês?". O funil não tem `why` nem FAQ própria. Além disso, o quiz pergunta "Would they know?", e quem responde "I’d rather they didn’t" não recebe nenhum item do relatório que trate disso de frente (só o de crime, e só às vezes).
5. **[MÉDIA] Ponte fraca entre relatório e oferta.** O item "paid" junta "já paguei" e "ia pagar" no mesmo texto ("You already paid…"), o que soa errado para metade das pessoas. A headline e o sub da oferta não fecham o "e agora, o que eu faço?".

### Reescritas

**lv-check/config.js → quiz.intro** [ALTA]
```js
intro: {
  kicker: 'Free 60-second reality check',
  title: 'Seen ads saying you can <em>read anyone’s WhatsApp</em> with just a number? Here’s what they don’t show you.',
  sub: 'Some of it is a scam. Some of it is a crime. And some of it really works — legally, on any iPhone or Android. 6 quick questions, then your free Reality Report.',
  points: ['What’s actually possible on iPhone vs Android', 'How the “enter a number” sites fake it — and how people get their money back', 'What really works — without breaking the law or exposing your own phone'],
  cta: 'Show me what’s real →',
  fine: 'About 60 seconds. No name, no email, no sign-up.'
},
```
Por quê: o hook nomeia o desejo e cria curiosidade ("what they don’t show you"). O `fine` derruba o medo de cair em mais um funil de captura.

**lv-check/config.js → quiz.buildingTitle / quiz.building** [BAIXA]
```js
buildingTitle: 'Preparing your Reality Report…',
building: ['Checking what’s possible on their phone', 'Comparing what spy sites claim vs what they deliver', 'Checking what’s legal in your situation', 'Building your Reality Report'],
```

**lv-check/config.js → quiz.questions** (só os campos alterados) [MÉDIA]
- `who.title`: `'Who is this about?'`. Menos "vigilância", mesma função.
- `knows`: acrescentar `sub: 'Be honest — your report changes based on this.'`. Aumenta o comprometimento e justifica a pergunta.
- `why.options[0].label`: `'I think something’s going on'`

**lv-check/config.js → offer.unmask** [ALTA nos campos `limit` e `sub`; o resto é MÉDIA]
```js
busted: 'Nothing was connected. It’s a timed animation — the same for every number.',
title: 'This is exactly what <em>“spy” sites</em> show you',
sub: 'The progress bar. The “decrypting” text. The blurred chats. It runs the same way for every number — even a fake one. Nothing is ever connected to any phone.',
limit: 'That’s the limit. WhatsApp messages, photos and calls are end-to-end encrypted — any site that says it can show them from a number is lying.',
tricks: [
  { t: '“We found their profile.”', p: 'They show the public photo — the same one anyone sees by saving the number — so it looks like they got in.' },
  { t: 'The progress bar.', p: 'A fixed-time animation. Type a real number or 000-000-0000: same result.' },
  { t: 'Blurred messages and “unlock” buttons.', p: 'Stock images. There is nothing behind the blur.' },
  { t: 'Countdowns and “only today” prices.', p: 'Fake urgency so you pay before you think.' },
  { t: 'Pay to see everything.', p: 'After paying you get an empty dashboard, a surprise subscription — or an app that exposes YOUR phone instead.' }
],
next: 'You’ve seen the trick. Here’s what’s actually real in your situation'
```
Atenção: a frase "surprise subscription" descreve um padrão comum. Mantenha-a genérica, sem citar nenhuma marca.

**lv-check/config.js → offer.report** [ALTA] (substitui `title`, `sub` e `items` inteiros)
```js
report: {
  title: 'Your Reality Report: what’s <em>actually</em> possible',
  sub: 'Based on your answers. No fake promises — including from us.',
  items: [
    { kind: 'myth', tag: 'Myth', t: 'Reading their WhatsApp with just the phone number',
      p: 'No app or website can do it — not on iPhone, not on Android. WhatsApp chats are end-to-end encrypted. The sites that promise it take your money, and some get you to install something that exposes YOUR phone.',
      more: 'the tricks these sites use, how to spot the next one in 5 seconds — and what is genuinely possible instead.',
      show: function (a) { return has(a, 'want', 'messages'); } },
    { kind: 'crime', tag: 'Exists · Crime without consent', t: 'Monitoring apps installed on the phone',
      p: 'They exist — mostly for Android — and need the unlocked phone in hand. Putting one on another adult’s phone without their consent can be a crime in the US, UK, Canada and Australia. Several of these companies have also leaked their own customers’ data.',
      more: 'how these apps work, the risks nobody mentions, how to check if one is on YOUR phone — and the built-in, legal alternatives for kids and couples.',
      show: function (a) { return has(a, 'want', 'messages') || has(a, 'want', 'contacts') || (a.knows === 'no' && adult(a)); } },
    { kind: 'hard', tag: 'Reality · They usually find out', t: 'Doing it without them knowing',
      p: 'Phones are built to warn people now. iPhone’s Safety Check lists everyone who can see their location, and both iPhone and Android alert people when an unknown tracker is moving with them. And what you find in secret can backfire — legally, on you.',
      more: 'how to get real answers out in the open: the signs that matter, the conversation that works, and what a lawyer can legally obtain.',
      show: function (a) { return a.knows === 'no' && adult(a); } },
    { kind: 'hard', tag: 'Possible · Not simple', t: 'Recovering deleted messages',
      p: 'It does happen — investigators have recovered deleted chats in criminal cases. But it takes the physical phone, forensic tools and, for someone else’s phone, a court order. No website does it remotely.',
      more: 'when recovery is realistic, how to recover your own deleted chats, and how it works when you need it in a legal case.',
      show: function (a) { return has(a, 'want', 'deleted'); } },
    { kind: 'yes', tag: 'Possible · With their OK', t: 'Knowing where they are — live',
      p: 'Live location with arrival and departure alerts works on any iPhone or Android with free tools (Find My, Google Maps, Life360). Set up together, it just works — and you stop guessing at 2 a.m.',
      more: 'step-by-step setup on every phone, plus the exact words to get them to say yes.',
      show: function (a) { return has(a, 'want', 'location') || has(a, 'want', 'safe') || adult(a); } },
    { kind: 'yes', tag: 'Possible · For your child', t: 'Seeing who your kid talks to and which apps they use',
      p: 'As a parent you can approve contacts and apps, set limits and get alerts — with controls built into iPhone, Android, Instagram, TikTok and Snapchat. Your kid knows the rules; you know they’re on.',
      more: 'Screen Time, Family Link and the social-media Family Centers, step by step.',
      show: function (a) { return a.who === 'kids'; } },
    { kind: 'yes', tag: 'Possible · The honest way', t: 'Finding out what’s really going on',
      p: 'Some signs actually mean something (many don’t). There are checks you can run on your own phone and accounts, and a way to start the conversation that gets answers instead of a fight.',
      more: 'the signs that matter, what to check on your own devices, how to bring it up — and what a lawyer can legally obtain if it comes to that.',
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
```
O que mudou: o mito passa a valer também para Android. Entram o item "Doing it without them knowing" (para quem respondeu "I’d rather they didn’t") e a separação entre "já paguei" e "ia pagar". Saem a promessa de "methods that work with iPhones", a "legal version for your minor child" e a frase "can’t be turned off". **[CONFERIR]** a frase "Several of these companies have leaked customer data", que tem casos públicos (por exemplo, vazamentos de apps de stalkerware noticiados em 2024). Se não for confirmada, troque por "many of these apps put YOUR data at risk too".

**lv-check/config.js → offer (hero)** [ALTA]
```js
kicker: 'Your Reality Report is ready',
headline: 'The “enter a number” sites are fake. <em>What actually works</em> fits in one weekend.',
sub: 'Step-by-step videos for the methods that really work on iPhone and Android: live location they agree to, your kids’ phones, scam blocking and a full check of your own phone. All legal. All with tools you already have.',
cta: 'Show me what really works – $27',
stickyCta: 'Get the real methods',
stickyNote: 'One payment · 30-day refund',
priceNote: 'one payment · no subscription · lifetime access',
```
Variante B da headline para teste: `'Spy sites are a scam. <em>Knowing your people are safe</em> isn’t.'`

**lv-check/config.js → offer.why** (NOVO) [ALTA]
```js
why: { title: 'Why this isn’t another scam', items: [
  { t: 'We tell you what we can’t do — before you pay.', p: 'Scroll down: there’s a whole section listing what this course does NOT do. No spy site will ever show you that.' },
  { t: 'Nothing to install. Nothing to connect.', p: 'It’s a video course. You follow the steps on phones you have in hand, with tools Apple and Google already built in.' },
  { t: 'One payment. 30 days to change your mind.', p: 'No subscription, no surprise charges. Watch it — if it’s not worth $27 to you, email us and get every cent back.' } ] },
```
Por quê: depois do carimbo FAKE, a próxima dúvida é sobre nós. Este bloco converte o ceticismo em argumento.

**lv-check/config.js → offer.bullets** [MÉDIA]
```js
bullets: [
  '<strong>Myths vs reality:</strong> what “spy apps” really do, which ones are scams and what can get you in legal trouble',
  '<strong>Live location</strong> with arrival alerts on any iPhone or Android — set up together, the right way',
  'See who your kids talk to and which apps they use, with the <strong>parental tools already on their phone</strong>',
  '<strong>Check your own phone</strong> in 15 minutes: monitoring apps, unknown trackers, logged-in devices',
  'Already paid for a fake spy app? <strong>How to ask for your money back</strong> and clean your phone',
  'Deleted messages: when recovery is realistic, and how to recover <strong>your own</strong>',
  'Word-for-word scripts to bring it up — so you get answers, not a fight'
],
```
**[CONFERIR]** "in 15 minutes" só vale se a aula couber nesse tempo. Se não couber, tire.

**lv-check/config.js → offer.guarantee** [MÉDIA]
```js
guarantee: 'Watch the lessons. If you don’t get more straight answers than from every spy site you’ve seen put together, email support@love-vision.site within 30 days for a full refund. No hoops.',
```

**lv-check/config.js → offer.faq** (NOVO, sobrescreve o padrão) [ALTA]
```js
faq: [
  { q: 'Is this a scam too?', a: 'Fair question after what you just saw. Here’s the difference: we tell you up front what this does NOT do (see the list above), there’s nothing to install or connect, it’s one payment with no subscription, and you have 30 days to ask for every cent back. You see the first lesson minutes after checkout.' },
  { q: 'Can this show me their messages?', a: 'No. Nothing legal can do that from a phone number, and we won’t pretend otherwise. What the course shows you is what does work: location they agree to, parental tools for your kids, how to find out what’s going on out in the open — and how to protect your own phone.' },
  { q: 'Will they know?', a: 'Yes. Everything in the course is done openly — that’s what keeps it legal and what makes it last. You get word-for-word scripts so it sounds like care, not accusation.' },
  { q: 'I already paid for a spy app. Can you help?', a: 'Yes. There’s a lesson on requesting a refund or disputing the charge, and on checking your phone for anything that app installed.' },
  { q: 'I’m not techy. Can I really do this?', a: 'Yes. Each lesson is a 5–12 minute screen recording: we tap, you copy. Every lesson has a printable checklist. If you can open Settings, you can do this.' },
  { q: 'How do I get access?', a: 'Right after payment you get an email with your login to the members area. Watch on your phone or computer.' },
  { q: 'What if it isn’t for me?', a: 'Email support@love-vision.site within 30 days for a full refund.' }
],
```

**lv-check/config.js → offer.modules[5]** [BAIXA]: `{ t: 'Couples: The Transparency Pact', p: 'Mutual location, agreed rules — and what to do when you suspect something.' }` pode ficar como está. Só confirme que a aula cobre "what to do when you suspect something" sem ensinar acesso escondido.

---

## 2. lv (genérico)

### Diagnóstico
1. **[ALTA] Intro vaga para tráfego frio:** "Do you really know if the people you love are safe right now?" não nomeia nenhuma dor concreta nem cria lacuna de curiosidade.
2. **[ALTA] Headline da oferta difusa** ("Learn how to watch over everyone you love…"): três públicos e nenhum resultado concreto.
3. **[MÉDIA] `why` sem número nem fonte.** O lv-parents já tem a estatística do FBI; ela pode ser reaproveitada aqui.
4. **[MÉDIA] CTA genérico** ("Get instant access").
5. **[BAIXA]** Sem order bump definido (ver seção 3).

### Reescritas
**lv/config.js → quiz.intro** [ALTA]
```js
intro: {
  kicker: 'Free 60-second family safety check',
  title: 'Your parents. Your kids. Your own phone. <em>Which one is exposed right now?</em>',
  sub: 'Scam calls aimed at parents. Strangers in kids’ DMs. Your location shared without you knowing. The fixes are already built into every phone — usually switched off. Find out which ones your family is missing.',
  points: ['Your aging parents', 'Your kids and teens', 'Your partner — by agreement', 'And your own phone'],
  cta: 'Start my free check →'
},
```

**lv/config.js → offer (hero)** [ALTA]
```js
kicker: 'Your family plan is ready',
headline: 'Every phone in your family has safety features <em>switched off</em>. Turn them on this weekend — together.',
sub: 'Short step-by-step videos: location they agree to share, fall alerts, scam blocking, parental controls and a full security check of your own phone — plus the exact words to get everyone on board.',
cta: 'Get my family plan – $27',
stickyCta: 'Get my plan',
```

**lv/config.js → offer.why.items[0]** [MÉDIA]
```js
{ t: 'Scammers go after older adults.', p: 'People over 60 reported more than $3.4 billion in fraud losses in 2023 (FBI IC3 Elder Fraud Report). The scam-blocking features are already on their phone — usually switched off.' },
```
**[CONFERIR]** IC3 2023 Elder Fraud Report. O mesmo número já está no lv-parents.

**lv/config.js → offer.bullets** [BAIXA]: troque o 1º por `'Know where your family is in an emergency — with location they <strong>chose</strong> to share'`. Os demais estão bons.

---

## 3. lv-parents

### Diagnóstico
1. **[ALTA] A urgência real (o feriado) está enterrada no fim do sub.** Thanksgiving é amanhã (26/11), e o Natal vem em seguida. É o momento em que o filho adulto vai estar com o celular dos pais na mão. Isso deve ir para a headline ou o kicker até o começo de janeiro.
2. **[ALTA] Sub com 60+ palavras.** No mobile, empurra o CTA para baixo da dobra.
3. **[MÉDIA] "Learn how to…" na headline.**
4. **[MÉDIA] Falta FAQ para "Will they feel babysat?" e "Their phone is old".**
5. **[BAIXA]** O CTA "Protect My Parents – $27" está bom, mantenha.

### Reescritas
**lv-parents/config.js → quiz.intro.sub** [BAIXA] (encurta)
```js
sub: 'A fall in the kitchen. A “Grandma, I’m in jail, please don’t tell Mom” call. A phone that goes quiet for hours. Find out which safety features to turn on — on their phone, with their OK.',
```

**lv-parents/config.js → offer (hero)** [ALTA]
```js
kicker: 'Your parents’ safety plan is ready',
headline: 'Seeing Mom and Dad this holiday season? <em>Turn on what’s already on their phone</em> — with their blessing.',
sub: 'Fall alerts, Emergency SOS, location they choose to share, scam-call blocking and Medical ID — step by step, plus the exact words so it feels like love, not control. Do it together over the holidays, or walk them through it by phone.',
```
Headline fora de temporada (a partir de 05/01): `'<em>Keep an eye on Mom and Dad from anywhere</em> — with their blessing.'`

**lv-parents/config.js → offer.faq** [MÉDIA] (adiciona antes do `.concat(D.faq)`)
```js
{ q: 'Won’t they feel babysat?', a: 'Not if you bring it up the right way. You get scripts that frame it as “so I can stop worrying,” and they choose what to share. Most of it — fall alerts, SOS, scam blocking — is protection, not tracking.' },
{ q: 'Their phone is a few years old. Will this work?', a: 'Most of these features work on iPhones and Android phones from the last several years. Each lesson says which version you need and what to do if theirs is older.' },
```

---

## 4. lv-kids

### Diagnóstico
1. **[ALTA] Objeção central ignorada:** o pai que chega do tráfego de espionagem quer "ler as mensagens do filho". A FAQ não responde "Can I read my kid’s messages?". Se não responder, ele compra achando que vai ler e depois pede reembolso.
2. **[ALTA] Sextorsão citada sem número** ("sharp rise"). Existe dado oficial do FBI, e usá-lo aumenta a urgência com credibilidade.
3. **[MÉDIA] Headline "monitor your teen’s phone the right way"** exclui os 8–10 anos e soa como aula.
4. **[MÉDIA] Quem responde "They’ll push back hard" não recebe nenhuma resposta na oferta.**
5. **[BAIXA]** Sub da oferta longo.

### Reescritas
**lv-kids/config.js → offer (hero)** [ALTA]
```js
kicker: 'Your family plan is ready',
headline: 'Your kid’s phone has a lock on every door. <em>Most parents never turn them on.</em>',
sub: 'Step-by-step videos: Screen Time or Family Link, the Instagram, TikTok and Snapchat Family Centers, content filters and location your kid knows is on — plus a Family Phone Agreement you sign together.',
cta: 'Start Protecting My Kid – $27',
```

**lv-kids/config.js → offer.why.items[1]** [ALTA]
```js
{ t: 'Sextortion is hitting teens — fast.', p: 'From October 2021 to March 2023, the FBI and Homeland Security Investigations received more than 13,000 reports of financial sextortion of minors, mostly boys age 14 to 17 (FBI, 2024). A fake profile gets an image, then demands money within hours. Kids who know what to do in the first hour are far safer.' },
```
**[CONFERIR]** comunicado público do FBI de janeiro de 2024 sobre financial sextortion: números, período e faixa etária.

**lv-kids/config.js → offer.faq** [ALTA] (adiciona no topo)
```js
{ q: 'Can I read my kid’s messages?', a: 'Not with this course — and you don’t need to. What you get is what actually protects them: approving who they can contact and which apps they install, seeing who they follow on social media, content filters, alerts on explicit images (on iPhone) and location they know is on. Plus the warning signs of grooming and sextortion, so you know when to step in.' },
{ q: 'My kid will push back hard. Now what?', a: 'There’s a lesson for exactly that: how to present the rules as a deal (more freedom as they show responsibility), and the Family Phone Agreement you sign together so it’s fair, not punishment.' },
{ q: 'Is this a scam too?', a: 'No. It’s a video course with nothing to install, one payment with no subscription, and a 30-day money-back guarantee. We even list what it does NOT do, above.' },
```
**[CONFERIR]** "approving who they can contact" (Communication Limits do Screen Time, contas infantis) só pode entrar se a aula cobrir.

---

## 5. lv-partner

### Diagnóstico
1. **[ALTA] Descompasso de público.** O tráfego chega desconfiado ("quero ver com quem ele(a) fala"), e a intro fala com quem quer "parar de brigar por celular". O desconfiado não se reconhece e sai. **Recomendação estratégica:** mande o tráfego frio de intenção "parceiro/espionar" para o **lv-check**, que já tem a ponte. Use o lv-partner para remarketing e para casais "peace" (a variante B abaixo). Se o lv-partner continuar recebendo tráfego frio, use a variante A.
2. **[ALTA] A oferta não responde "e se eu já acho que está me traindo?".** É a pergunta mais comum desse público.
3. **[MÉDIA] Headline longa e abstrata** ("build trust… by mutual agreement").
4. **[MÉDIA] Quem respondeu "Not sure we’re ready" ainda recebe "Start Our Transparency Pact".** Falta o caminho de "o outro não topa".
5. **[MÉDIA] Risco de política:** é o funil de maior risco na Meta. Mantenha a linguagem "both ways" em tudo.

### Reescritas
**lv-partner/config.js → quiz.intro** — variante A (tráfego frio desconfiado) [ALTA]
```js
intro: {
  kicker: 'Free 60-second check · No judgment',
  title: 'Something feels off — and it keeps coming back to <em>the phone</em>?',
  sub: 'Before you pay a site that promises to show you their messages (it can’t), take this 60-second check. You’ll get a plan that actually moves things forward: the signs that matter, how to bring it up without a fight, a two-way Transparency Pact — and a check of your own phone.',
  points: ['The signs that mean something — and the ones that don’t', 'How to bring it up and get answers, not a fight', 'Location shared both ways — by agreement', 'A safety check of your own phone'],
  cta: 'Start my free check →'
},
```
Variante B (remarketing / "peace"): mantenha o texto atual ("Tired of fighting about phones?…").

**lv-partner/config.js → offer (hero)** [ALTA]
```js
kicker: 'Your plan is ready',
headline: 'Stop guessing about the phone. <em>Get answers out in the open</em> — and a pact you both sign.',
sub: 'Step-by-step videos: the conversation openers that get honest answers, two-way location sharing in Find My, Google Maps or Life360, phone rules you both accept, what stays private — and a full check of your own phone.',
cta: 'Start Our Transparency Pact – $27',
```

**lv-partner/config.js → offer.why.items** [MÉDIA] (substitui o 1º item)
```js
{ t: 'Snooping usually backfires.', p: 'Going through a partner’s phone without permission can be illegal — and even when it isn’t, it ends the one conversation you actually need to have. Out in the open is the only way that holds up.' },
```

**lv-partner/config.js → offer.faq** [ALTA] (adiciona no topo, antes dos atuais)
```js
{ q: 'What if I already think they’re cheating?', a: 'The course shows you the signs that actually mean something, how to bring it up so you get answers instead of a denial, and your real options — including counseling and what a lawyer can legally obtain. It does not show you how to get into their phone.' },
{ q: 'What if they won’t agree to anything?', a: 'That’s an answer too. There’s a lesson on what to do next: how to protect yourself, your phone and your accounts, and where to get support.' },
```

---

## 6. Order bumps (US$ 7–9), um por funil

Regra: cada bump precisa existir como entregável real antes de ir ao ar (PDF/aula curta na área de membros) e deve ser coerente com a promessa do funil. Nada de bump que prometa acesso.

| Funil | Nome | Preço | Texto do checkbox (1 linha) |
|---|---|---|---|
| lv-check | **Refund & Phone Cleanup Kit** | US$ 9 | `Yes, add the Refund & Phone Cleanup Kit (+$9): dispute-letter templates to ask for your money back from fake apps + a step-by-step scan to clean your own phone.` |
| lv-parents | **Scam-Proof Parents Kit** | US$ 9 | `Yes, add the Scam-Proof Parents Kit (+$9): a printable “call me before you pay” fridge card, a family code-word setup and the 10 scam scripts to rehearse with Mom and Dad.` |
| lv-kids | **Sextortion First-Hour Plan** | US$ 9 | `Yes, add the Sextortion First-Hour Plan (+$9): exactly what to say and do in the first 60 minutes — don’t pay, save evidence, use NCMEC’s Take It Down and report it.` |
| lv-partner | **The Hard Conversation Pack** | US$ 7 | `Yes, add The Hard Conversation Pack (+$7): word-for-word scripts for “we need to talk about the phone,” what to say if they get defensive, and where to find couples support.` |
| lv | **Family Emergency Binder** | US$ 7 | `Yes, add the Family Emergency Binder (+$7): printable Medical ID sheets, emergency contacts, a meeting plan and a digital-legacy checklist for the whole family.` |

Observações:
- O bump do lv-check fala com o motivo nº 1 do público ("já paguei e não funcionou"). Deve ter a maior taxa de adesão.
- "10 scam scripts": o número precisa bater com o PDF.
- Take It Down (NCMEC) e o CyberTipline são ferramentas reais e gratuitas. O bump vende o *plano e o roteiro*, não a ferramenta. Deixe isso claro na entrega.

---

## 7. Oito ângulos de anúncio (Meta/TikTok, mobile, EUA)

Regras de política aplicadas: não promover rastreamento oculto nem "spyware" (a política da Meta proíbe anunciar equipamento ou software de vigilância oculta). Também: não afirmar atributos pessoais do espectador ("Are you being cheated on?"), não usar UI falsa clicável (botão de play ou notificação falsos) e não usar imagem chocante. A animação do "site falso" deve ser claramente rotulada como demonstração e usar um mock próprio, sem marca de concorrente.

| # | Funil | Hook (1ª linha) | Ideia do criativo |
|---|---|---|---|
| 1 | lv-check | **"That site that says it can open anyone’s WhatsApp from a number? Watch what it does with a fake one."** | Screen recording de um mock genérico: digita 000-000-0000, a barra roda até 98% e entra o carimbo FAKE. Legenda: "Same animation for every number. Here’s what’s actually possible →". Rótulo fixo no canto: "Demonstration". |
| 2 | lv-check | **"Paid for a ‘monitoring’ app that never worked? You may be able to get your money back."** | Talking head (criador lendo roteiro, sem se passar por cliente), 3 passos em texto: "1. Screenshot what they promised 2. Request a refund 3. Check your own phone". CTA: "Free 60-sec reality check". |
| 3 | lv-check | **"3 things ‘phone tracking’ sites won’t tell you before you pay."** | Carrossel de 4 cards no estilo do Reality Report: Myth (roxo) → Crime without consent (vermelho) → Possible with their OK (verde) → "Get your free report". |
| 4 | lv / lv-check | **"Check this setting tonight — it shows everyone who can see your location."** | Walkthrough de 15s do Safety Check no iPhone (Settings → Privacy & Security → Safety Check) e do equivalente no Android. Fecho: "There are 6 more. Free check →". Ângulo de autoproteção, o mais seguro em política. |
| 5 | lv-parents | **"Seeing your parents this holiday? Turn these 4 settings on while you’re there."** | Mãos de duas gerações sobre um celular na mesa da cozinha. Close-ups de Emergency SOS, Medical ID, Silence Unknown Callers e compartilhamento de localização. Urgência real, válida até o começo de janeiro. |
| 6 | lv-parents | **"‘Grandma, it’s me. I’m in jail. Please don’t tell Mom.’ Set up a family code word before that call comes."** | Reencenação só em texto na tela (tela de ligação genérica, sem marca, sem botão falso) → card "Family code word" → "Plus 3 phone settings that block these calls". Dado de apoio na legenda: FBI IC3 2023 [CONFERIR]. |
| 7 | lv-kids | **"Your kid’s iPhone has a setting that blurs explicit images before they open. Do you know if it’s on?"** | Screen recording de Screen Time → Communication Safety. Fecho: "Instagram, TikTok and Snapchat have their own. Free 60-sec check for parents →". Evitar a palavra "nude" no texto do anúncio. **[CONFERIR]** o comportamento padrão por idade na versão atual do iOS. |
| 8 | lv-partner (B) | **"Fighting about ‘who are you texting?’ Try a pact instead of a password war."** | Ilustração de dois celulares com localização compartilhada nos dois sentidos e o selo "Both ways — or not at all". Lista curta: "Location both ways · Rules you both pick · What stays private". Sem insinuar traição, sem imagem de casal em conflito. |

Mapeamento sugerido de verba inicial: lv-check (#1, #2, #3) recebe o tráfego de intenção "espionar". Os ângulos #4–#7 são os mais seguros em política e servem para aquecer o pixel novo. O #8 fica para remarketing.

---

## 8. Checklist antes de publicar
- [ ] Conferir as fontes: FBI IC3 Elder Fraud 2023 (US$ 3,4 bi), CDC 1 em 4 com 65+, FBI sextortion (13.000+ relatos, 10/2021–03/2023), vazamentos de apps de stalkerware.
- [ ] Confirmar que o suporte honra o "no questions" do reembolso de 30 dias.
- [ ] Confirmar que as aulas cobrem tudo o que bullets, report `more` e bumps prometem (refund/dispute, scan do próprio celular, "15 minutes", Communication Limits, 10 scam scripts).
- [ ] Criar os 5 bumps como entregáveis reais na Monetizze.
- [ ] Manter "What this course does NOT do", o aviso legal e o preço visível em todas as ofertas (nada aqui remove esses elementos).
