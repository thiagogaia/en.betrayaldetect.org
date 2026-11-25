# UX do parceiro — conexão emocional e fluxo (lv-partner + caminho "trust" do lv-check)

Proposta de design de fluxo. **Nada aqui edita `site/`.** São mudanças descritas campo a campo
(config.js) e no motor (offer.js/quiz.js/css) para o orquestrador aplicar. Respeita as linhas
vermelhas de `lv-copy/SKILL.md`: nenhuma promessa de espionar, ler mensagens, ver escondido ou
confirmar traição. O conteúdo sensível (sinais, conversa, autovalor, "é ciúme?") vive DENTRO do
curso; na página entra só como promessa.

Público-alvo desta proposta: a pessoa que desconfia do parceiro e está **ferida** — quer verdade
e paz, não quer explodir a relação. Muita dela chega do mesmo desejo que o Whats Spy capturava.

---

## 0. Como o Whats Spy (en-r) agarra esse público — e o que roubar sem copiar

Lido em `site/en-r` só para contraste (não editar). O gancho dele:

- **Nomeia o desejo e o alvo na cara:** "Discover the truth **you deserve**", "I want to spy on a…
  Boyfriend, husband, ex". A pessoa se vê na primeira tela.
- **Fabrica suspeita e prova:** "deleted messages, hidden photos, **secret conversations**", "Find
  out what they're **really hiding**", contador falso "3,892 suspicious activities detected today",
  tela de "Scanning for deleted messages → PROFILE HIDDEN → Higher suspicion detected".
- **Promete segredo e certeza:** "100% Anonymous · Undetectable".
- **Prova social inventada:** "I discovered 47 deleted messages in 2 minutes".

Por que converte: valida a dor na hora ("você não é louca, algo está errado"), dá fantasia de
**certeza** e de **segredo**, e qualifica em 1 clique. É mentira e, no fim, decepção/reembolso.

**O que o Love Vision pode roubar (legalmente):** a *velocidade do reconhecimento da dor* e a
*nomeação do desejo*. O que NÃO pode: a promessa de ver escondido, a suspeita fabricada, a
certeza falsa. A troca honesta: capturar pela DOR ("algo não fecha e sempre volta ao telefone"),
validar o sentimento, e redirecionar o desejo de *vigiar* para o desejo real por baixo —
**verdade e paz**.

---

## 1. O arco emocional ideal e onde o fluxo atual quebra

Arco que esse segmento precisa sentir, em 3 atos:

1. **Landing — dor reconhecida.** "Eu sei o que você está sentindo, e não, você não é louca."
   Nomear o desejo de espionar sem julgar, e prometer um caminho (não ainda o produto).
2. **Quiz — ela se sente VISTA e qualificada, não interrogada.** Cada pergunta deve soar como
   "alguém que entende está perguntando", não um formulário clínico. Ela sai se sentindo
   compreendida e com esperança, não exposta.
3. **Resultado/oferta — esperança + caminho.** Primeiro alívio ("há uma saída honesta"), depois o
   enquadramento verdade+paz, depois a oferta como o caminho já desenhado pra ela.

### Onde o `lv-partner` quebra o arco

- **A landing variante A já está boa** no reconhecimento da dor ("Something feels off — and it
  keeps coming back to *the phone*?"). Mas o subtítulo entra em modo "produto/lista" cedo demais:
  menciona "Transparency Pact", "two-way location", "a check of your own phone" antes de a pessoa
  respirar. Para o público ferido, a promessa inicial deve ser **emocional** (verdade, paz, parar
  de enlouquecer), não features. Features são ato 3.
- **A oferta abre pelo PREÇO.** Em `offer.js` a ordem é `hero (headline + preço + CTA) → plano →
  …`. A `<section class="lv-hero">` mostra `$27` e o botão **antes de qualquer validação
  emocional ou prova**. Para alguém que chegou sofrendo, ver "pague $27" na primeira dobra do
  resultado quebra o ato 3: pula o alívio e o enquadramento. (No `lv-check` isso é suavizado
  porque `report`/`unmask` vêm antes do hero; o `lv-partner` **não tem report**, então o preço é
  literalmente a primeira coisa.)
- **O "plano" é puro checklist de features.** `planHtml()` para `partner` lista "The Transparency
  Pact: how to propose it / Two-way live location / Rules you agree on / What to do when trust is
  still shaky". É competente, mas frio — nenhum passo fala com a *ferida*. Falta um passo-zero
  emocional: "O sinal que te trouxe aqui — o que ele significa (e o que não significa)".
- **A pergunta `mutual` ("Would you both agree to set rules together?") pode fechar a porta.** Para
  quem desconfia, "we both" pressupõe cooperação que ela ainda não tem. A opção "Not sure we're
  ready yet" é honesta, mas a pergunta inteira pode fazê-la sentir que o produto não é pra ela
  ("ele nunca vai topar") bem antes da oferta aliviar isso.

### Onde o caminho "trust" do `lv-check` quebra o arco

Trajeto típico ferido: `who = partner`, `why = trust` ("I think something's going on"),
`want` inclui messages/truth, muitas vezes `knows = no`.

- **A ordem dos verdicts no Reality Report entrega 3 "NÃOs" antes da primeira esperança.** Os
  `report.items` são filtrados mas renderizados **na ordem fixa do array**: `myth` (Não dá pra ler
  WhatsApp) → `crime` (apps de monitoramento = crime) → `hard` (eles descobrem, pode voltar contra
  você) → … e só lá embaixo vem `yes · The honest way` ("Finding out what's really going on"). Uma
  pessoa ferida recebe parede-parede-parede antes de respirar. O conteúdo está certo (é honesto),
  mas a **sequência** afunda o ato 2→3. Ela precisa de UM respiro de esperança perto do topo.
- **O tom dos primeiros verdicts é de repreensão.** "take your money", "can be a crime", "can
  backfire — legally, on you". Verdadeiro e necessário, mas sem um "não te culpo por ter
  procurado isso" antes, soa a sermão — exatamente o que o briefing pede para evitar.
- **A pergunta `knows` ("Would they know about it?" → "I'd rather they didn't")** é ótima para
  qualificar, mas logo depois o report usa esse "no" para disparar o verdict `hard` ("they usually
  find out"). Ela confessa e leva um tapa. Precisa de reframe empático no próprio verdict.
- **O hero do lv-check também abre com preço** logo após o report — mesmo problema do ato 3, mas
  atenuado porque veio report antes.

---

## 2. O quiz como ferramenta de empatia (campo a campo)

Princípio: **toda pergunta deve devolver uma emoção, não extrair um dado.** A pessoa deve pensar
"eles entendem", não "estão me fichando". Ordem: do sentimento (quente) para o prático (frio),
nunca o contrário. Nº de perguntas: manter 5 (lv-partner) / 6 (lv-check) — não aumentar; quem
sofre não tem paciência. Toda pergunta sensível ganha um micro-"No judgment" e uma opção de saída
sem vergonha.

### 2a. `lv-partner` — ajustes campo a campo (config.js → quiz.questions)

As perguntas atuais são boas de estrutura, mas a **ordem** começa fria (`stage`, `device`) e a
emoção só aparece na 3ª. Reordenar para abrir pelo sentimento.

- **Nova ordem sugerida:** `tension` (dor) → `talked` (história) → `stage` (contexto) →
  `device` (prático) → `mutual` (reformulada, ver abaixo). Assim a 1ª tela valida o sentimento, e
  `device` (a mais clínica) fica enterrada no meio, não na abertura.

Campo a campo:

- **`tension` — promover a Pergunta 1.** Título atual "What causes the most tension between you
  about phones?" é bom. Acrescentar `sub: 'No judgment — just tell us what it feels like.'` A
  opção `insecurity` ("Insecurity or past hurt that's hard to let go of") é a que fala com a
  ferida: manter, talvez reescrever para 1ª pessoa e menos auto-acusatória →
  `'A feeling I can't shake that something changed'` (tira a palavra "insecurity", que a faz se
  sentir "a louca"). Acrescentar uma opção que nomeia o desejo-Whats-Spy sem prometer nada:
  `{ v: 'proof', label: 'I keep wanting to check their phone to be sure', icon: '🔍' }` — ela se
  vê, e o resultado depois trata disso com empatia.
- **`talked` ("Have you talked about phone rules?")** — manter, é empática (a opção "We tried — it
  turned into an argument" é um espelho perfeito). Mover para P2.
- **`stage`** — manter como contexto (P3). A opção "Rebuilding after a hard time" já é acolhedora.
- **`device`** — manter, mas é a única pergunta puramente clínica; por isso vai pro meio (P4) e
  não abre nem fecha o quiz.
- **`mutual` — reformular para não fechar a porta.** Problema: "Would you both agree…" pressupõe
  cooperação. Reescrever como pergunta sobre **ela**, não sobre o casal:
  - título → `'If there were a calm way to get the truth, would you take it?'`
  - `sub` → `'However it turns out. The plan works whether they're all in or not.'`
  - opções → `'Yes — I just want to stop guessing' (🕊️)` / `'Yes, but I'm scared of what I'll
    find' (💗)` / `'I don't know anymore' (🤍)`. Nenhuma resposta a desqualifica; todas levam à
    mesma oferta. Isso troca "ele vai topar?" (que exclui) por "eu quero paz?" (que inclui) e
    coloca a última emoção do quiz em **esperança**, não em dúvida logística.

### 2b. `lv-check` caminho trust — ajustes campo a campo

- **`who` (P1)** — ok. Mantém.
- **`want` ("What would you like to be able to see?")** — já tem `sub: 'Pick everything you've
  thought about. No judgment.'` Excelente: é o momento mais empático do quiz, deixa ela admitir o
  desejo de ver mensagens sem vergonha. **Manter intacto.** É a captura honesta do desejo-Whats-Spy.
- **`device`** — clínica, mas necessária; ok no meio.
- **`knows` ("Would they know about it?" → "I'd rather they didn't")** — manter a pergunta (ela
  qualifica legalmente), mas suavizar o `sub` para remover o frio "your report changes based on
  this" → `'Totally honest — this just helps us give you real options, not a lecture.'` Assim a
  confissão "no" não parece uma armadilha que vai ser usada contra ela no report.
- **`paid`** — ok, cria o gancho de reembolso (bom p/ quem já foi enganada pelo Whats Spy).
- **`why` ("What's behind it?" → "I think something's going on" 💔)** — manter; é a pergunta que
  nomeia a dor. Considerar movê-la para **logo depois de `want`** (P2.5), para o quiz não terminar
  numa pergunta administrativa (`paid`) e sim perto do sentimento. Alternativa de baixo risco:
  deixar como está, pois `paid` no fim ajuda a lógica do report de reembolso.

### Microcopy que aquece (vale para os dois)

- No motor, a linha fixa `'Question X of Y'` (quiz.js) é escolar/clínica. Para esse público,
  trocar por algo mais leve é um ganho barato (ver §4). Ex.: `'Just X of Y — almost there'`.
- Building screen: `lv-partner` usa `['Reading your answers', 'Matching two-way sharing…',
  'Building your Transparency Pact plan']`. A pessoa ferida quer sentir cuidado, não engenharia.
  Sugerir: `['Reading what you told us', 'Looking at your situation with fresh eyes', 'Building
  your calm, honest plan']`. (Campo `quiz.building` no config — zero mudança de motor.)

---

## 3. "Verdade + paz": quando e como introduzir, prova, e reduzir vergonha

### Momento certo do enquadramento

O enquadramento **verdade + paz** não pode vir na landing como promessa de produto nem só na
oferta. O ponto ideal é a **transição quiz→resultado** e o **topo do resultado**, antes do preço:

- **Na building screen / primeira dobra do resultado**, uma frase-ponte que recategoriza o desejo:
  de *"ver escondido"* para *"verdade com paz"*. Ex. (promessa, não feature):
  *"You came here wanting proof. What you actually want is to stop hurting — to know the truth and
  still be able to sleep. That's what this plan is for."* Isso valida o desejo-Whats-Spy e o
  redireciona sem sermão.
- **Só depois** vem o caminho concreto (sinais, conversa, autoproteção) — e por último o preço.

### Onde colocar prova (e qual prova)

Para esse segmento, "prova" **não é depoimento** (e inventar é linha vermelha). As provas que
funcionam e são honestas:

1. **O desmascaramento (lv-check `unmask`)** — a simulação FAKE + teste da foto pública é a prova
   mais forte que o LV tem: mostra ao vivo que os sites espiões mentem. Para o **lv-partner**, que
   hoje não tem `unmask`, vale **emprestar uma versão enxuta** (ver §4) ou ao menos uma linha no
   `why`: "o site que promete as mensagens não consegue — e você provavelmente já desconfia disso".
2. **Transparência radical como prova de honestidade:** a seção "What this course does NOT do" e o
   `why` "We tell you what we can't do — before you pay". Isso é o oposto do Whats Spy e constrói
   confiança de alguém já queimada. **Subir** a visibilidade disso no lv-partner (hoje `notDo`
   fica lá embaixo, depois do pricebox).
3. **Prova de mecanismo, não de resultado:** "cada lição é um screen recording de 5–12 min: a
   gente toca, você copia" (já existe na FAQ). Reduz o medo de "não vou conseguer / é furada".

### Reduzir vergonha e culpa (ela não quer ser "a louca ciumenta")

- **Nomear e normalizar, repetidamente:** "No judgment" já aparece; estender aos pontos de maior
  exposição (`tension`, `knows`, `want`). Um verdict/bloco explícito do tipo *"Wanting to check
  isn't crazy — it's what not-knowing does to a person"* (promessa; o conteúdo sobre autovalor e
  "é ciúme possessivo?" fica DENTRO do curso) desarma a culpa melhor que qualquer desconto.
- **Nunca usar a palavra "insecurity"/"jealous" como rótulo dela.** Reescrever a opção
  `insecurity` do lv-partner (ver §2a). O briefing é explícito: ela não quer se sentir a ciumenta.
- **Reframe do verdict `hard` (lv-check):** hoje "Doing it without them knowing → they usually
  find out … can backfire — legally, on you." Abrir esse verdict com empatia antes do aviso:
  *"The urge to look in secret is completely human. Here's the catch nobody mentions —"* e então o
  fato. Mesmo conteúdo, sem o tapa.
- **Posicionar a "honest way" como força, não consolo:** o verdict `yes · The honest way` deve
  soar como a jogada da pessoa que está no controle ("the move that actually gets you answers"),
  não o prêmio de consolação de quem não pôde espionar.

---

## 4. Mudanças concretas no motor (descrever, não editar)

Todas respeitam que a **copy fica no config**; aqui são ajustes de **ordem/estrutura/CSS** no
motor compartilhado, mais ganchos que o config passa a poder usar. Pensado mobile-first (max-width
560px, coluna única, sticky CTA — o layout atual já é bom nisso).

### 4.1 `offer.js` — ordem das seções (o ponto mais importante)

Hoje a montagem é fixa: `unmask + report + hero(preço) + plano + appKit + why + get + pricebox +
notDo + faq + footer + sticky`. O preço aparece na 1ª dobra do resultado. Para o segmento ferido,
**o alívio e o enquadramento devem vir antes do preço.**

- **Introduzir um bloco "emotional bridge" opcional antes do hero**, dirigido por config
  (`o.bridge = { kicker, title, body }`). Renderizado só se existir. É aqui que entra "verdade +
  paz" (texto no config, §3). No lv-partner isso substitui o preço como primeira coisa que ela lê.
- **Tornar a ordem do hero configurável, ou mover o preço para baixo da primeira prova.** Mínimo
  viável sem reescrever: no hero, permitir `o.heroPriceHidden = true` para **omitir o bloco de
  preço e o CTA do topo** em funis onde queremos aquecer antes (lv-partner). O preço segue
  existindo no `pricebox` e no sticky — nunca some da página (linha vermelha: preço sempre
  visível), só deixa de ser a abertura. A barra `.lv-sticky` já garante preço presente o tempo
  todo em mobile.
- **Subir a prova-de-honestidade:** permitir que `notDo` (e o `why`) sejam renderizados **antes**
  do pricebox para funis desse público. Pode ser um flag `o.trustFirst = true` que reordena:
  `bridge → plano → why → notDo → get → pricebox → faq`. Para alguém queimada, ver "o que NÃO
  fazemos" antes do pedido de pagamento é o que constrói confiança.

### 4.2 `offer.js` — ordenação dos verdicts do Reality Report (lv-check)

- **Garantir pelo menos um verdict de esperança perto do topo.** Hoje `reportHtml()` renderiza
  `r.items` na ordem do array (myth→crime→hard→…→yes). Mudança de motor: **ordenar os itens
  filtrados por `kind`**, numa prioridade que intercale, ex.: mostrar 1 `yes` âncora logo após o
  1º item, ou ordenar `[myth, yes(honest), crime, hard, …]`. Alternativa sem mexer no motor: o
  config reordena o array manualmente colocando `The honest way` em 2º. Recomendo a opção de
  motor: `report.order = ['lead-no','lead-yes',...]` ou simplesmente estabilizar
  `yes` para nunca ficar todos por último. Objetivo: a pessoa ferida vê **um respiro de esperança
  antes da parede de "não/crime"**.
- **Suporte a um campo `empathy` por verdict** (`x.empathy`), renderizado em itálico/cor suave
  antes do `x.p`. Permite abrir `crime`/`hard` com "não te culpo" sem reescrever o fato. CSS: uma
  classe `.lv-verdict .lv-empathy{color:var(--muted);font-style:italic;margin:0 0 6px}`.

### 4.3 `offer.js` / `planHtml()` — passo-zero emocional no plano

- Hoje `PLAN.partner.steps` começa em "The Transparency Pact: how to propose it". Permitir um
  **passo-zero vindo do quiz** antes dos passos técnicos — não um app, mas o reconhecimento:
  "The signal that brought you here — what it means, and what it doesn't". Implementação: `offer.js`
  pode prefixar `PLAN[k].steps` com um item de `o.planLeadByWho[k]` quando existir, ou o config
  injeta. Mantém o plano "ferramenta", mas o 1º item fala com a ferida, não com o iPhone.

### 4.4 `quiz.js` — microajustes

- **Barra de progresso começa em 0%** na 1ª pergunta (`Math.round((i/n)*100)` com i=0). Para quem
  sofre, abrir "0%" desanima. Trocar para progresso baseado em `(i+1)/n` ou dar um mínimo visual
  (ex. `Math.max(8, …)`). Puramente motor/CSS.
- **Linha "Question X of Y"** — tornar o texto configurável (`q.stepLabel(i,n)`), para funis
  sensíveis usarem algo mais caloroso. Hoje está hard-coded no motor.
- **Botão "Continue" (multi-select)** e auto-advance (single) estão bons. Manter o `← Back`
  (reduz ansiedade: ela pode voltar sem perder tudo). Bom para esse público — não remover.
- **`w.scrollTo(0,0)` a cada pergunta** já existe; manter (evita desorientação em mobile).

### 4.5 CTA para alguém sofrendo (css + config)

- O CTA atual "Start Our Transparency Pact – $27" é transacional. Para o ferido, o primeiro CTA
  (hero/bridge) deve ser **emocional e de baixo compromisso**: ex. "Show me the honest way →" —
  e só o CTA do pricebox carrega o preço. O motor já suporta CTAs iguais em todo lugar; sugerir
  campo `o.ctaSoft` para o topo e `o.cta` (com preço) para pricebox/sticky. Baixo risco.
- CSS: o `.lv-btn` rosa forte com sombra pesada é "urgência de venda". Para o topo emocional,
  considerar uma variante mais suave (`.lv-btn-soft`: fundo `--soft`, texto `--brand-d`, sem
  sombra) no 1º CTA, reservando o rosa cheio para o pricebox. Mantém hierarquia sem gritar com
  quem já está no limite.
- **Mobile:** sticky bar já mostra preço + CTA sempre. OK. Só garantir que o "emotional bridge"
  não empurre o 1º CTA pra muito longe do fold — manter bridge curto (3–4 linhas).

### 4.6 Emprestar o `unmask` enxuto ao lv-partner (opcional, alto impacto)

- `unmaskHtml()` e `runUnmask()` já são genéricos (dirigidos por `o.unmask` + `cfg.photoLookup`).
  O lv-partner poderia **ativar só a parte da simulação FAKE** (sem o teste de foto, se preferir
  menos superfície) definindo `o.unmask`. Isso dá à pessoa ferida a prova visceral de que "o site
  das mensagens mente" **no funil dela**, reduzindo a expectativa errada que gera reembolso (§5).
  Zero mudança de motor — só config. Risco: aumenta o tempo até a oferta; testar.

---

## 5. Riscos de UX que aumentam reembolso — e como o fluxo neutraliza

O maior risco deste segmento: a pessoa chega esperando **"ver as mensagens"** e, se o fluxo não
recalibrar a expectativa ANTES do checkout, ela compra pela esperança errada e pede reembolso ao
descobrir que é um curso. Mapa de riscos:

| Risco de expectativa | Onde nasce | Como o fluxo neutraliza (antes do checkout) |
|---|---|---|
| "Vou ver as mensagens dele" | desejo trazido do Whats Spy; `want: messages` | O verdict `myth` + (idealmente) a simulação FAKE provam que é impossível e que o site mente — **antes** do preço. Manter `myth` cedo é essencial; não esconder. |
| "Vou rastrear escondido" | `knows: no` | Verdict `hard` ("they usually find out") + FAQ "Will they know? Yes." Reframe empático para não soar sermão, mas a mensagem fica: é aberto. |
| "É um app, não um curso" | expectativa de produto-ferramenta | `notDo` + footer "It is not a spy app… video course with a kit of real apps". **Subir** essa clareza no lv-partner (hoje tardia). O App Kit mostra "function + revealed inside", deixando claro que são apps que ELA instala abertamente. |
| "Pago e acesso o telefone dele" | fantasia de acesso | Bullet/why "Snooping usually backfires" + legal note. Manter visível antes do pricebox. |
| "Prometeram e não entregaram (de novo)" | já foi queimada (`paid: yes`) | Enquadrar LV como o oposto: "we tell you what we can't do before you pay", garantia de 30 dias explícita no topo do bloco de preço, verdict de reembolso do app anterior (gera confiança). |

Princípios de neutralização no fluxo:

1. **Recalibrar a expectativa ANTES do botão de compra, não na FAQ depois.** A sequência deve
   gastar o desejo errado ("ver mensagens" = mito/mentira) e instalar o certo ("verdade + paz com
   método legal") antes de qualquer CTA de preço. É exatamente o que a reordenação do §4.1/§4.2 faz.
2. **Vender o resultado honesto, não o resultado fantasiado.** CTA e headline prometem "respostas
   honestas / parar de adivinhar / paz", nunca "descubra o que ele esconde". Isso reduz o gap
   entre expectativa e entrega — a causa raiz do reembolso.
3. **Tornar a transparência um argumento de venda, não um disclaimer.** "What this course does NOT
   do" deve ser lido como prova de honestidade (e vir cedo), não como letra miúda que ela só vê
   depois de pagar.
4. **Manter a garantia de 30 dias visível e sem fricção** perto de cada CTA de preço — alguém
   queimada só arrisca de novo se a saída for óbvia.

---

## Resumo de prioridades (para o orquestrador)

- **P1 (motor, maior impacto):** reordenar a oferta para o segmento ferido — alívio + enquadramento
  "verdade+paz" + prova de honestidade **antes** do preço (`o.bridge`, `o.heroPriceHidden`,
  `o.trustFirst`); e garantir ao menos um verdict de esperança perto do topo do Reality Report.
- **P1 (config):** reformular a pergunta `mutual` do lv-partner para não fechar a porta e terminar
  o quiz em esperança; suavizar o `sub` de `knows` no lv-check.
- **P2 (config):** reordenar o quiz do lv-partner para abrir pela dor (`tension` em P1); reescrever
  a opção `insecurity` para não rotular a pessoa de ciumenta; building screens mais calorosas.
- **P2 (motor):** campo `x.empathy` por verdict; passo-zero emocional no plano; barra de progresso
  não começar em 0%; `stepLabel`/`ctaSoft` configuráveis.
- **P3 (teste):** emprestar a simulação FAKE (`unmask`) ao lv-partner para matar a expectativa de
  "ver mensagens" dentro do próprio funil.

Nenhuma dessas mudanças cita nome de app, promete vigilância, confirma traição ou copia o visual
do Whats Spy. Todas movem o funil de "capturar pelo desejo de espionar" para "capturar pela dor e
conduzir até a verdade honesta — com paz".
