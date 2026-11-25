# CRO — Segmento "parceiro ferido": da espionagem à verdade + paz

Proposta de reposicionamento emocional dos funis `lv-partner` e `lv-check` para
UMA fatia do público antigo do Whats Spy (en-r): não o espião curioso, mas a
pessoa **ferida, com medo de estar sendo traída**, que procura **verdade e paz**
sem destruir a relação. Hoje a página fala de "pacto" e "transparência" de forma
racional e fria — não toca a dor. Esta proposta coloca a **dor na PÁGINA** e
mantém o conteúdo de "conversa / autovalor / checar ciúme" como **PROMESSA do que
está dentro**, nunca como sermão de abertura.

Linhas vermelhas respeitadas (SKILL.md): nada de prometer espionagem, ler
mensagens, "pegar no flagra" ou confirmar traição por vigilância; nenhum nome de
app no funil; empatia com quem desconfia, mas o caminho é sinais reais, conversa,
autoproteção e via legal.

> Não editei nada em `site/`. Nada aqui toca nos funis antigos. São textos prontos
> para colar, por arquivo e campo, com o porquê e a prioridade.

---

## 1. Perfil comparado — quem compra o antigo vs quem deve comprar o Love Vision

Mesma origem de tráfego, dois estados de espírito diferentes. Dados do produto
antigo (`~/LoveVision/monetizze.db`, tabela `pp_vendas`, produto "Love Ai - ZapSpy"
e variantes): de ~667 vendas pagas, **90 reembolsos + 59 chargebacks (~22%)** além
de 630 canceladas antes de pagar. Isso é a assinatura de uma **compra por impulso
movida a dor**, seguida de arrependimento quando o produto não entrega o
impossível. É exatamente essa pessoa que o Love Vision pode servir de verdade.

| | **Comprador do funil antigo (espião)** | **Comprador-alvo do Love Vision (ferido buscando verdade + paz)** |
|---|---|---|
| **Motor** | Curiosidade/controle, quer *ver* escondido | Dor, medo, insônia; quer *saber* para parar de sofrer |
| **Estado emocional** | Desconfiado, frio, "vou pegar" | Ferido, ansioso, dividido entre amor e suspeita, exausto de remoer |
| **O que quer** | Mensagens, fotos, apagadas, localização oculta | Clareza, paz, "é real ou é a minha cabeça?", não explodir a relação |
| **Relação com a pessoa** | Já decidiu que é inimigo | Ainda ama / ainda quer salvar — ou pelo menos sair inteiro |
| **O que digita no Google** | "spy whatsapp by number", "read deleted messages", "catch cheater app" | "how to know if my partner is cheating", "is it cheating or my insecurity", "signs he's lying", "can't stop checking his phone", "anxiety about being cheated on" |
| **No que clica no anúncio** | "Veja as mensagens dele agora" | "Pare de adivinhar. Descubra a verdade com a cabeça no lugar." |
| **Resultado no antigo** | Paga, não recebe nada real → reembolso/chargeback (~22%) | Mesma frustração — mas a dor dele tem resposta honesta que o antigo nunca deu |
| **O que o afasta** | — | Ouvir cedo demais "talvez seja ciúme seu" (soa como se o problema fosse ele) |

**Insight central do dono, confirmado:** a parte de "sinais vs ciúme possessivo,
se valorizar, conversar" **não vende na página** — a pessoa machucada não está
pronta para ouvir "talvez seja você". Então: a **página valida a dor e promete
clareza**; a **nuance fica dentro do curso.**

---

## 2. A promessa honesta que vende para o ferido — ângulo central

**Ângulo central (headline-promessa):**

> **"Stop guessing. Find out what's real — and get your peace back."**
> *(Pare de adivinhar. Descubra o que é real — e recupere sua paz.)*

Quatro pilares honestos que substituem a promessa de vigilância, nesta ordem
emocional:

1. **CLAREZA** — "You'll finally know where you stand." A dor pior é a dúvida, não
   a resposta. Vendemos o fim da dúvida, não um feed de mensagens.
2. **"É real ou é a minha ansiedade?"** — o ângulo mais forte e o mais honesto:
   *"The signs that actually mean something — and the ones that are just fear
   talking."* Valida a dor E abre espaço para a nuance **sem acusar**. Não é
   "talvez seja ciúme seu"; é "vou te ajudar a separar o sinal do medo".
3. **RESPOSTAS POR SINAIS REAIS + CONVERSA** — "Get answers out in the open, not a
   fight." Verdade pela porta da frente: o que observar, e como perguntar de um
   jeito que traz resposta em vez de negação.
4. **AUTOPROTEÇÃO + PAZ** — "Protect yourself and your peace — whatever the truth
   turns out to be." Se for traição, você sai inteiro e protegido; se não for,
   você para de se destruir. Nos dois casos, **paz**.

O que torna isso vendável e honesto ao mesmo tempo: nunca promete ver escondido;
promete **sair da dúvida**. É um benefício emocional real que o Whats Spy nunca
entregou — e é o oposto do produto que gera 22% de reembolso.

---

## 3. Reescritas prontas para colar (arquivo + campo)

### 3.1 `site/lv-partner/config.js` — Intro A (variante `a`, tráfego frio desconfiado) · PRIORIDADE ALTA

A intro atual começa racional ("Before you pay a site that promises..."). A dor
só aparece de lado. Trocar para validar o estado emocional **primeiro**, promessa
depois.

**Campo `quiz.intro` (ramo `LV_PARTNER_V === 'a'`):**

```js
    intro: LV_PARTNER_V === 'a' ? {
      kicker: 'Free 60-second check · No judgment',
      title: 'You keep checking the phone — and you <em>hate</em> that you do.',
      sub: 'The not-knowing is the worst part. In 60 seconds you’ll get a plan to find out what’s really going on — the signs that actually mean something (and the ones that are just fear talking), how to bring it up and get an answer instead of a fight, and how to protect yourself and your peace either way.',
      points: ['Know if it’s real — or if it’s your mind spiraling', 'The signs that mean something, and the ones that don’t', 'How to ask and get the truth, not a fight', 'Protect yourself and your peace — whatever you find'],
      cta: 'Start my free check →'
    } : {
```

*Porquê:* abre na dor exata ("checar o celular e se odiar por isso"), nomeia o
alívio (fim do não-saber) e já embute o ângulo "real vs ansiedade" como ajuda, não
acusação. O ramo `b` (casais "peace") fica como está — é outro público.

---

### 3.2 `site/lv-partner/config.js` — `offer.headline` + `offer.sub` + `offer.kicker` · PRIORIDADE ALTA

Atual: *"Stop guessing about the phone. Get answers out in the open — and a pact
you both sign."* — "pact you both sign" é racional e frio para quem está ferido. O
"pacto" vira a mecânica, não a promessa.

```js
    kicker: 'Your plan is ready',
    headline: 'Stop guessing. <em>Find out what’s real</em> — and get your peace back.',
    sub: 'Step-by-step videos: how to read the signs that actually mean something (and tell them apart from anxiety), the words that get an honest answer instead of a fight, how to protect yourself and your accounts whatever the truth is — and, when you’re ready, a two-way openness both of you agree to.',
    cta: 'Get the truth — and my peace — $27',
    stickyCta: 'Get answers',
```

*Porquê:* a promessa (verdade + paz) vira o título; o "pacto" recua para o fim do
sub como consequência opcional ("when you're ready"), não como exigência de
abertura logo de cara para quem ainda está no escuro.

---

### 3.3 `site/lv-partner/config.js` — `offer.why` · PRIORIDADE MÉDIA

Reordenar e reescrever para falar à dor antes de falar à lógica. O primeiro item
hoje é "Snooping usually backfires" (começa te corrigindo). Inverter: validar,
depois orientar.

```js
    why: { title: 'Why this gives you answers — not more sleepless nights', items: [
      { t: 'The not-knowing is what’s hurting you.', p: 'Doubt is heavier than almost any answer. The fastest way out isn’t more spiraling at 2am — it’s learning which signs actually mean something, so you can tell a real red flag from fear talking.' },
      { t: 'Answers you get in the open are answers you can trust.', p: 'What you find in secret can’t be used, can’t be talked about, and can blow back on you — legally too. A straight answer to the right question is the only kind that actually ends the doubt.' },
      { t: 'Whatever the truth is, you come out protected.', p: 'If something’s wrong, you’ll know how to protect yourself, your phone and your accounts before you say a word. If it isn’t, you get your peace back. Either way you stop losing yourself to this.' } ] },
```

*Porquê:* cada item valida a dor na primeira frase e entrega a orientação na
segunda. "Snooping backfires" continua lá (item 2) mas enquadrado como "answers
you can trust", não como repreensão.

---

### 3.4 `site/lv-partner/config.js` — `offer.faq` (primeiro item) · PRIORIDADE MÉDIA

O FAQ "What if I already think they're cheating?" é o momento certo para a
promessa do conteúdo interno — aqui a nuance "sinais vs ansiedade" pode entrar,
porque quem lê FAQ já se comprometeu. Reforçar o tom de acolhimento.

```js
      { q: 'I already feel like something’s going on. Where do I start?', a: 'Right where you are. The course walks you through the signs that genuinely mean something — and helps you separate them from the fear and overthinking that make everything look suspicious. Then it shows you how to bring it up so you get a real answer instead of a denial, and what your options are, including counseling and what a lawyer can legally obtain. It does not show you how to get into their phone — nothing honest can, and secret answers only trap you.' },
```

*Porquê:* é o único lugar da página onde o "pode ser ansiedade" aparece — e mesmo
assim embrulhado em validação ("right where you are"), nunca como primeira coisa
que a pessoa lê. Mantém a linha vermelha explícita no fim.

---

### 3.5 `site/lv-check/config.js` — Reality Report, item "trust/suspect" · PRIORIDADE ALTA

O Reality Report é onde o lv-check converte quem respondeu `why: 'trust'`
("I think something's going on" 💔) ou `want: 'truth'`. O item atual
("Finding out what's really going on") é bom mas seco. Reescrever o `p` para tocar
a dor e carregar o ângulo "real vs ansiedade"; o `more` (promessa do que está
dentro) ganha o conteúdo de conversa/autovalor.

**Item com `kind: 'yes', tag: 'Possible · The honest way'` (por volta da linha 117):**

```js
          { kind: 'yes', tag: 'Possible · The honest way', t: 'Finding out if it’s real — or if it’s your anxiety',
            p: 'When you’re hurting, everything looks like proof. Some signs genuinely mean something; a lot of them are just fear. There’s a way to tell them apart, checks you can run on your own phone and accounts, and a way to start the conversation that gets you a straight answer instead of a fight — so the doubt actually ends.',
            more: 'the signs that matter vs the ones that are just fear, what to check on your own devices, the words that get an honest answer — and how to protect yourself and your peace whatever you find.',
            show: function (a) { return has(a, 'want', 'truth') || a.why === 'trust'; } },
```

*Porquê:* "everything looks like proof" valida a espiral sem culpar; o título já
vende o ângulo central. A parte de "se valorizar / não é ciúme possessivo / como
conversar" fica **dentro do `more`** como promessa do curso, não como lição na
cara. `show` inalterado — já cobre trust/suspect.

---

### 3.6 `site/lv-check/config.js` — `offer.headline` variante B · PRIORIDADE BAIXA (teste)

Já existe o comentário sugerindo variante B. Proponho uma 2ª variante B dedicada
ao ferido para testar contra a atual:

```js
      // Variante B (ferido): 'Spy sites can’t show you the truth. <em>You can still find it</em> — and your peace.'
```

*Porquê:* mantém o desmascaramento (âncora do lv-check) mas vira a promessa para
verdade + paz, alinhada ao segmento. Medir por conversão no A/B existente.

---

## 4. Order bump e upsell para este segmento

**Order bump (US$ 7–9, no checkout) — "Peace of Mind Kit":**
Um mini-guia/checklist que entrega alívio *imediato*, no momento de maior
ansiedade (pós-compra, antes de abrir o curso):

- "The 2am Checklist" — o que fazer quando a cabeça dispara à noite, para não agir
  no impulso (não mandar a mensagem explosiva, não revirar o celular).
- "3 questions that get a straight answer" — os primeiros scripts de conversa,
  prontos para usar já.
- Enquadrar como: *"For the nights the thoughts won't stop — start getting calm
  tonight, before you even open the course."*

*Porquê:* o ferido compra por alívio emocional; um bump que promete calma **hoje**
tem altíssima afinidade e baixa fricção. Honesto: é conteúdo real do curso
antecipado, sem prometer vigilância.

**Ideia de upsell (US$ 17–27):** "The Conversation & Self-Worth Track" — o módulo
que a página *não* vende de cara agora passa a ser o upsell: scripts aprofundados
de conversa, como se reancorar e não se perder na relação, como saber se é
possessividade ou sinal real, e o plano de "e se for verdade" (proteção + apoio +
via legal). É exatamente o conteúdo que não converte na porta mas que **o
comprador já aquecido quer** logo depois de comprar a clareza.

*Porquê:* respeita o insight do dono (esse conteúdo não vende frio) e o monetiza na
hora certa — quando a pessoa já disse sim para "quero a verdade" e está pronta para
o "e agora, como eu lido com isso".

---

## 5. O que deixar explicitamente FORA da página (vai só no curso)

| Fica FORA da página de venda | Por quê |
|---|---|
| **"Talvez seja ciúme / insegurança sua"** como abertura | A pessoa ferida ouve isso como "o problema é você" e sai. Entra só como `more`/FAQ, embrulhado em validação, e a fundo só dentro do curso. |
| **Sermão sobre se valorizar / autoestima** | Soa a lição não pedida no auge da dor. Vira **promessa** do que está dentro (upsell/módulo), não conteúdo da página. |
| **Checklist completo de "sinais de traição"** | Na página vira guia de vigilância e fura a linha vermelha; some o "real vs ansiedade". Fica dentro, com a nuance. |
| **Qualquer promessa de ver/ler/localizar escondido** | Linha vermelha absoluta. Nunca, em lugar nenhum. |
| **"Pegar no flagra" / confirmar traição por monitoramento** | Linha vermelha. A página promete *clareza*, não *prova por vigilância*. |
| **Mecânica fria do "Transparency Pact" como gancho principal** | Para o ferido ainda no escuro, "assine um pacto" é cedo demais. Recua para consequência ("when you're ready"), não promessa de abertura. |
| **Nomes de apps/ferramentas** | Linha vermelha de produto: o nome é o conteúdo pago. |

**Princípio que resume:** a **dor entra na página** (validação, medo, o celular, a
insônia, "é real ou é minha cabeça?"); a **nuance entra no produto** (ciúme vs
sinal, autovalor, como conversar, e se for verdade). A página promete o destino —
clareza e paz; o curso entrega o caminho, inclusive as partes que a pessoa ferida
só aceita ouvir depois de confiar.
