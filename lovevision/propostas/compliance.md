# Love Vision (família): revisão de compliance e estrutura

Revisão de 25/11/2026 dos funis `site/lv`, `lv-parents`, `lv-kids`, `lv-partner` e `lv-check`, e do motor `site/lv-shared/` (core, quiz, offer, defaults, css). Nada em `site/` foi editado.

**Como ler.** P0 bloqueia o lançamento (pode reprovar a conta de anúncio ou o produto, ou gerar chargeback em série). P1 vem antes de escalar. P2 é otimização.

**Sobre as políticas.** O texto das políticas do Meta, do TikTok e da Monetizze aqui é paráfrase, não citação. Antes de subir, confira a versão atual destas páginas:
- Meta: Advertising Standards, nas seções Unacceptable Business Practices / Spyware, Surveillance Equipment, Personal Attributes e Landing page;
- TikTok: Advertising Policies, nas seções Prohibited / Restricted products e Landing page;
- Monetizze: termos do produtor e produtos proibidos.

---

## 0. Problemas que atravessam todos os funis (P0)

### 0.1 Marca e domínio compartilhados com o Whats Spy
- **O nome "Love Vision" já é o nome que o cliente vê no Whats Spy.** Ele aparece como "Love Vision – Whats Spy" em produto, e-mails e páginas de obrigado do `upsmtz`.
- **O domínio `love-vision.site` serve hoje páginas de spyware na mesma origem dos funis novos.** Exemplos: `en-p/dashboard.html` ("Whats Spy - Dashboard"), `en-p/chat.html` e `conversas.html` (WhatsApp falso) e `en-r` ("Discover the truth").
- **A raiz do domínio é outro produto.** `site/index.html` é o "Reveal AI Parental".
- **Riscos:**
  - **Meta e TikTok:** a revisão olha o domínio e o histórico dele. Um domínio que hospeda páginas de "espionar WhatsApp" contamina a reputação do produto limpo.
  - **Monetizze:** o revisor que abrir a raiz ou buscar a marca vai achar o Whats Spy.
  - **Chargeback:** quem comprou o Whats Spy vê "Love Vision" + CENTERPAG na fatura e pode contestar achando que é cobrança repetida. Quem pesquisa "Love Vision reviews" acha as reclamações do produto antigo.
- **Correção:**
  1. Publicar os funis lv* num **domínio próprio**, como o `lovevision/PLANO.md` já previa ("Deploy: nginx estático, domínio novo"). Sem pastas antigas nesse domínio e com uma raiz própria (home institucional simples).
  2. **Decidir o nome comercial do produto novo.** O ideal é uma marca diferente; o mínimo é um sufixo inconfundível ("Love Vision Family Safety") usado igual em anúncio, página, produto Monetizze, e-mail e área de membros.
  3. **Não usar isso para driblar restrição.** Se alguma conta, página ou BM foi restrita por causa do Whats Spy, não rode o produto novo a partir dela, e não use domínio novo para escapar de restrição. Para o Meta isso é circumvention e derruba tudo. A separação serve para clareza e para isolar chargeback.

### 0.2 Faltam termos, privacidade, reembolso e contato
Nenhum funil lv* tem página legal. O rodapé da oferta só traz o mailto, e **o quiz, que é a landing page do anúncio, não tem rodapé**. As páginas legais que existem (`en-m/terms.html` etc.) são do Whats Spy e não servem. Precisa de:

| Página | Conteúdo mínimo |
|---|---|
| `/terms` | Produto educacional (curso em vídeo), não é app, sem acesso a aparelho de terceiros. Uso só com consentimento. Licença de uso pessoal. Isenção "not legal advice". Marcas de terceiros (Apple, Google, Meta/WhatsApp, Instagram, TikTok, Snapchat, Life360) sem afiliação. Lei aplicável. Identificação do vendedor e de que a Monetizze processa o pagamento. |
| `/privacy` | Dados coletados: respostas do quiz (sessionStorage, não enviadas), GA4, Microsoft Clarity (gravação de sessão), Utmify, pixels Meta/TikTok, e-mail de compra via Monetizze. O número digitado no teste de foto, se o teste ficar (ver 2.3): para que serve, o processador e o fato de não ser guardado. Direitos e opt-out (CCPA "Do Not Sell or Share" se passar dos limites legais) e contato. |
| `/refund` | 30 dias, como pedir (e-mail + prazo de resposta), reembolso integral incluindo os bumps, prazo de estorno no cartão. |
| `/contact` | E-mail que funcione (hoje `support@love-vision.site` está pendente), prazo de resposta, nome da empresa/produtor e país. |

No motor, o `defaults.js` ganharia `legalLinks` e `company`, e o rodapé seria renderizado **também no quiz** (`quiz.js`).

### 0.3 Checkout vazio dispara um `alert()`
Com `checkout.url` vazio, o `core.js` chama `goCheckout`, que abre `alert('Checkout ainda não configurado…')` **em português**. Se o anúncio for ao ar assim:
- o revisor do Meta ou do TikTok vê uma landing quebrada com pop-up, que é reprovação certa;
- o cliente não consegue comprar.

Correção: preencher os 5 `checkout.url` antes de subir qualquer campanha e trocar o `alert` por um `console.warn` + `track('lv_checkout_missing')`, nunca um pop-up.

---

## 1. Política de anúncios (Meta e TikTok)

### 1.1 lv-check: o funil mais arriscado, não use como LP de tráfego frio no lançamento (P0)

O que um revisor ou um crawler encontra hoje:

| Onde | Texto ou elemento | Problema |
|---|---|---|
| intro.title | "Seen ads saying you can **read anyone's WhatsApp**?" | Nomeia a capacidade de spyware e usa a marca WhatsApp. O filtro automático casa a palavra-chave mesmo em frase negativa. |
| pergunta `want` | "Their WhatsApp / messages", "Messages they deleted", "Who they're talking to" | Para o revisor, a landing pergunta o que você quer espionar. |
| pergunta `knows` | "I'd rather they didn't 🤫" | Oferece e valida a opção de monitorar escondido. É o pior item para a política de surveillance. |
| unmask (autoplay) | "Connecting to device… **Bypassing encryption… Decrypting WhatsApp… Loading messages…**" + mensagens borradas | O screenshot da revisão, tirado antes do carimbo FAKE aos ~2 s, é idêntico a um site espião. Esse texto também fica no DOM. |
| photoLookup | "Type any WhatsApp number" e a página mostra a foto da pessoa | É exatamente a função que os sites espiões usam ("we found their profile"). Coleta o número de um terceiro. |
| report / módulos | "Recovering deleted messages · Possible", "Deleted Messages & Legal Options" | O `PLANO.md` proíbe "deleted messages", e a promessa vira expectativa (ver 2). |
| offer.headline | "**Spying** is a myth…" | Ok na landing, mas não leve "spy" para o texto do anúncio, nem negado. |

**Recomendação.** No lançamento, rode tráfego pago frio só em `lv-parents` e `lv-kids`; depois o `lv` genérico e por último o `lv-partner`. Use o `lv-check` em e-mail e remarketing para a base antiga e em orgânico, até as reescritas abaixo estarem no ar e o domínio estar separado. Se for rodar pago, use estas reescritas:

**`lv-check/config.js`, campos para colar:**
```js
// quiz.intro
kicker: 'Free 60-second reality check',
title: 'Thinking about one of those <em>“see any phone”</em> sites? Read this first.',
sub: 'Some of what they promise is a myth. Some of it can get you in legal trouble. And some real tools do work — openly. Answer 6 quick questions and get your free Reality Report.',
points: ['What’s really possible on iPhone vs Android', 'How to spot a scam site (and get your money back)', 'The tools that actually work — and stay legal'],

// pergunta want — troca as opções de "espionar" por necessidades
{ id: 'want', multi: true, title: 'What are you hoping to find out?', sub: 'Pick everything that applies. No judgment.',
  options: [
    { v: 'location', label: 'Where they are / that they got home', icon: '📍' },
    { v: 'contacts', label: 'Who my kid is talking to', icon: '👥' },
    { v: 'messages', label: 'Whether those “read messages” apps are real', icon: '💬' },
    { v: 'deleted', label: 'How to recover MY deleted chats', icon: '🗑️' },
    { v: 'truth', label: 'Whether something is going on', icon: '🔍' },
    { v: 'safe', label: 'That they’re safe', icon: '🛟' } ] },

// pergunta knows — mantém a ramificação, sem oferecer o "escondido" como escolha
{ id: 'knows', title: 'Have you talked to them about it?',
  options: [
    { v: 'yes', label: 'Yes, or I plan to', icon: '🙂' },
    { v: 'no', label: 'I don’t think they’d agree', icon: '😬' },
    { v: 'unsure', label: 'I haven’t decided', icon: '🤔' } ] },
```
Os valores `v` continuam iguais, e as regras `show()` do report seguem funcionando.

**Unmask**, mudanças no motor (`offer.js` `unmaskHtml`/`runUnmask`, descritas e não editadas):
- Põe acima da caixa preta um rótulo fixo, visível desde o primeiro frame: "SIMULATION · This is what scam sites show you".
- Não dispara sozinho. Um botão "▶ Watch the trick (5 sec)" inicia a animação, então o screenshot automático pega o rótulo e não um "Decrypting".
- Troca as linhas por versões entre aspas e sem a marca: `'“Connecting to phone…”', '“Decrypting chats…”', '“Loading messages…”'`, com o carimbo FAKE já visível em contorno desde o início.

**photoLookup:** manter **desligado** (`url: ''`). Ver 2.3.

### 1.2 Texto dos anúncios: o que reprova e como manter o hook (P0 para os criativos)

| Regra | Reprova | Reescrita com o mesmo hook |
|---|---|---|
| Spyware / surveillance (Meta e TikTok proíbem promover monitoramento oculto e equipamento de vigilância) | "spy", "track any phone", "read their WhatsApp", "without them knowing", "see deleted messages", tela de WhatsApp falsa | "Those 'see any phone' sites? Here's what they actually show you." · "Before you pay a 'phone checker' site, watch this." |
| Personal attributes (Meta: não afirmar ou insinuar atributo do usuário como idade, saúde física ou mental, situação financeira etc.) | "Your elderly mom…", "Are you over 60?", "Struggling with anxiety about your partner?", "Lost money to a scam?" | "Scammers are calling parents with a fake 'grandchild in trouble.' Here's the setting that stops it." · "Most phones have fall alerts. Most are switched off." |
| Relação e infidelidade (sensacional, sem comprovação) | "Is he cheating?", "Catch a cheater", "Find out the truth tonight" | lv-partner: "Phone fights are rarely about the phone." · "Two-way location, agreed rules, what stays private." |
| Sensacionalismo e medo (TikTok é mais rígido com conteúdo chocante) | Alarme vermelho, "URGENT", sirene, criança chorando, close de mensagem sexual | Demonstração calma: tela real do Screen Time ou Find My, tutorial de 3 passos |
| Before/after | Celular "desprotegido → protegido" como transformação garantida, print de "antes" com ameaça | "Here's the setting. Here's where it is." (mostrar o passo e não o resultado) |
| Exploração sexual de menores | "nude", "sextortion" em texto ou imagem do anúncio de lv-kids | "Online blackmail scams are targeting teens. Here's what to do in the first hour." Na LP, o termo técnico pode ficar. |
| Marcas | Logo do WhatsApp, Apple ou Google como se fosse parceria | Citar no texto ("works with iPhone & Android") e não usar logo como selo |

### 1.3 Ajustes de landing nos outros funis (P1)
- **lv-kids `offer.headline`:** "monitor your teen's phone the right way" já vem qualificado ("openly and safely"). Ok. Para um anúncio, prefira "Set up your teen's phone the right way".
- **lv-kids `why[1]`:** "The FBI has publicly warned…" está sem ano e sem link, o que fere a regra da skill (estatística só com fonte verificável). Coloque o ano e o link do alerta do FBI que você conferir, ou corte o "sharp rise" e deixe só "The FBI has warned parents about financial sextortion targeting teens".
- **lv-parents `why`:** FBI IC3 Elder Fraud Report 2023 (US$ 3,4 bi) e CDC (1 em 4) estão corretos como fonte. Verifique se já existe relatório IC3 mais recente e atualize, e ponha um link "Source" pequeno abaixo de cada número.
- **`lv-check` report "Knowing where they are":** "it can't be 'turned off' without you knowing" soa como controle e não é exato (Find My e Google permitem parar de compartilhar). Troque por: "Set it up together — if sharing stops, you'll see it."
- **`lv` intro.sub:** "Location shared without you knowing" é ok, porque fala do próprio celular do usuário.
- **Pixel:** `core.js` não carrega pixel do Meta nem do TikTok. Para otimizar campanha eles são obrigatórios. Use pixel e dataset novos, nunca os do Whats Spy, e declare isso no `/privacy`.

---

## 2. Reembolso e chargeback: onde a expectativa diverge da entrega

### 2.1 O curso ainda não existe e a copy promete coisas específicas (P0)
Monte uma **matriz promessa × aula** e só suba o checkout quando todas as linhas tiverem aula ou PDF. Promessas que aparecem na copy:
- **Duração das aulas:** "Each lesson is 5–12 minutes of screen recording" (FAQ). Isso vira obrigação.
- **Materiais:** "Printable checklists & templates" (pricebox), Family Agreement, Family Phone Agreement, Transparency Pact imprimível.
- **lv-parents:** Apple Recovery Contact, Legacy Contact, Google Inactive Account Manager, Medical ID, Scam Call Protection.
- **lv-kids:** Communication Safety, Family Centers do Instagram, TikTok e Snapchat, roteiro da "first hour" de sextortion.
- **lv-check:** módulo "Myths vs Reality" e "Deleted Messages & Legal Options" (ver 2.2), além de "How to get your money back if you already paid for a fake spy app".
- **Acesso:** "lifetime access", que depende da Monetizze manter a área de membros; troque por "Lifetime access to the course".

O `PLANO.md` fala em MVP com M0, M3, M1.1–1.3 e M6. **Se o lançamento for só com o MVP, a oferta de `lv-kids`, `lv-partner`, `lv` e `lv-check` promete módulos que não existem**, e isso é reembolso garantido. Saídas: (a) lançar só `lv-parents` com o MVP, ou (b) marcar na oferta "New lessons added through Dec/2026" com os módulos e as datas de liberação.

### 2.2 lv-check atrai quem quer espionar, então cada "more" precisa fechar a porta (P0)
Os textos "🔓 In the course:" do report sugerem que o curso tem o que a pessoa quer:

| Item | Hoje | Por que gera reembolso | Reescrita |
|---|---|---|---|
| Myth: ler WhatsApp de iPhone | "the methods that really work with iPhones, what each one shows you…" | Insinua um método para ler o iPhone de outra pessoa | `more: 'what actually works with iPhones — location they agree to, Screen Time for your kid, and how to check YOUR WhatsApp for linked devices. Nothing in the course reads anyone else’s chats.'` |
| Crime: apps de monitoramento | "how these apps really work…" | Soa como tutorial de stalkerware | `more: 'the risks nobody tells you, how to find one on YOUR phone, and the legal alternatives (with consent, or for your minor child).'` |
| Hard: mensagens apagadas | Tag "Possible · Not simple" | A pessoa compra esperando recuperar as mensagens do outro | Tag `'Your own phone · Or with a court order'`; `more: 'how to recover YOUR OWN deleted chats from backup, and what a lawyer can request in a legal case.'` |
| Finding out if something is going on | "the signs that matter… what a lawyer can legally obtain" | "catch a cheater" disfarçado | `more: 'the signs worth noticing, what to check on your own devices and accounts, and how to start the conversation — or where to get counseling or legal help.'` |
| Already paid for a spy app | "how to request a refund **or dispute the charge**" | Ensina a contestar justamente o público com mais chance de contestar a nossa compra | `more: 'how to ask that seller for a refund and how to scan your phone for anything it left behind.'` (sem "dispute") |

Também:
- `offer.cta` "Show me what really works – $27" é ambíguo para quem quer ler mensagens. Troque por `'Get the honest playbook – $27'`.
- Inclua este FAQ **no topo** do `lv-check`:
```js
{ q: 'Will this let me see their messages or WhatsApp?', a: 'No. Nothing can do that legally or technically without access to the phone and the person’s consent — and the course will not help you try. It shows what really works: location they agree to, your kid’s phone, scam protection and checking your own phone.' },
```
- Bullet "Recovering deleted messages: when it's realistic and how to recover your own" → `'Recovering <strong>your own</strong> deleted chats from backup — and why no site can do it remotely'`.

### 2.3 Teste da foto pública do WhatsApp: recomendo cortar (P0 se ligado)
- **Políticas:** consultar a foto de perfil pelo número usa uma API não oficial do WhatsApp (o que provavelmente viola os termos do WhatsApp) sobre um terceiro que não consentiu. É o mesmo recurso dos sites espiões, e no Meta o produto é dele.
- **Privacidade:** a página coleta o número de um terceiro e o envia para um webhook. Isso precisa constar no `/privacy`. Além disso, o Clarity grava a sessão e pode capturar o campo; se o teste ficar, ponha `data-clarity-mask="true"` no input.
- **Contradição:** o intro diz "No personal data required".
- **Ganho pequeno:** a seção dos "tricks" já explica o golpe sem o teste.

Se quiser manter algo interativo, use **"Test it with YOUR own number"**, que mostra o que fica público no seu próprio WhatsApp e ensina a esconder (Privacy › Profile photo › My contacts). Vira autoproteção, com o mesmo efeito de "uau".

### 2.4 Fatura, nome e entrega (P0)
- **Descritor:** o descritor CENTERPAG não muda (ver memória do pós-compra). Ponha "Your card statement will show **CENTERPAG**" no FAQ, na pricebox, no e-mail de compra e na página de obrigado.
- **Página de obrigado:** falta uma própria do lv. A `upsmtz/thankyou` é do Whats Spy e manda para `app.zappdetect.com`, o que seria desastroso para este público. Ela precisa dizer: confira o e-mail da Monetizze (e o spam), link da área de membros, descritor CENTERPAG, suporte e "start with lesson 1 (10 min)".
- **Order bumps:** nunca pré-marcados. Use o mesmo nome curto e descritivo no checkout e na área de membros. Um bump marcado sem perceber é o chargeback mais comum.
- **Garantia:** configure na Monetizze o mesmo prazo da página (30 dias) e deixe claro que o reembolso inclui os bumps.
- **Suporte:** a caixa `support@love-vision.site` precisa existir e responder antes do lançamento, com prazo de 24–48 h. Um suporte que não responde vira disputa no banco.

---

## 3. Estrutura de conversão

### 3.1 Ordem da oferta (`offer.js`)
Hoje: `[unmask] → [report] → hero(preço + CTA) → plano → why → what you get + módulos → pricebox → NOT do → FAQ → rodapé → sticky`.

**Problemas:**
- A pessoa termina o quiz prometido como "seu plano" e cai direto em preço. O plano personalizado, que é a recompensa, só aparece no segundo scroll.
- **Prova não existe.** O `PLANO.md` exige "prints reais das ferramentas" e não há nenhuma imagem. Também falta quem está por trás (autor e empresa).
- **No lv-check** o preço só aparece depois de unmask, lookup, 4 tricks e até 7 itens do report: são 8–12 telas no celular. O sticky segura, mas o hero fica longe demais.
- O "What this course does NOT do" fica depois da pricebox. Para reduzir reembolso, um resumo dele deveria estar **perto do primeiro CTA**.

**Ordem proposta** (mudança no `offer.js`, só descrita aqui):
1. Hero curto com kicker "Your plan is ready" e headline, depois uma **prévia do plano** (só a 1ª pessoa, 4 passos), depois preço + CTA + uma linha "Not an app · doesn't read anyone's messages · 30-day refund". O preço continua no primeiro scroll.
2. **Prova** (componente novo `o.proof`): 3 a 4 prints reais de Find My, Family Link, Fall Detection e Safety Check com legenda "Lesson 3: where this setting is". Opcional: um vídeo de 30 s de uma aula.
3. Why (dores com fonte).
4. Plano completo + What you get + Módulos (os módulos recolhidos em `<details>`, para encurtar).
5. **Quem fez** (componente novo `o.about`): nome real ou da empresa, foto e 2 linhas. Não inventar credencial.
6. Pricebox + garantia + descritor.
7. NOT do + aviso legal.
8. FAQ + CTA.
9. Rodapé com os links legais.

**No lv-check:** report primeiro (é o que o quiz prometeu), depois unmask **recolhido** ("How spy sites trick you ▸"), depois a oferta. Assim o preço chega perto da 4ª tela.

### 3.2 Fricção do quiz
- **Número de perguntas:** 5 (6 no lv-check), com 1 toque por tela e ~2,6 s de "building". É um tamanho bom; não aumente.
- **A maioria das respostas não é usada.** Só `who`, `device` e, no lv-check, `want`/`knows`/`paid`/`why` mudam a oferta. `worry`, `setup`, `talk`, `alone`, `scams`, `out`, `stage`, `tension`, `talked`, `mutual` e `age` são descartadas, e o "Based on your answers" fica vazio. Duas saídas:
  - **Usar as respostas (preferível).** Um mapa no config, por exemplo `o.byAnswer.worry.scams`, que (a) troca a ordem dos `why` para a dor escolhida vir primeiro, (b) inclui uma linha "You told us: scam calls → start with step 3" no topo do plano, e (c) com `talk = no/unsure`, mostra uma prévia de 1 frase do roteiro ("Here's the first line of the script: …"). Isso reforça "plano personalizado" sem prometer nada a mais.
  - **Ou cortar** para 4 perguntas por funil.
- **`device: 'mixed'`** cai em iPhone (`dev = a.device === 'android' ? 'android' : 'ios'`). Quem tem iPhone e Android vê só os passos de iPhone. Mostre as duas listas (abas iPhone/Android) quando for `mixed`.
- **Rodapé no quiz:** não existe. Ver 0.2.

### 3.3 Objeções sem resposta (FAQ, para colar no `defaults.js`)
```js
{ q: 'Is this a subscription?', a: 'No. One payment of $27, lifetime access to the course. Optional add-ons are shown at checkout and are never pre-selected.' },
{ q: 'What will I see on my card statement?', a: 'The charge appears as CENTERPAG, our payment processor. Your receipt email comes from Monetizze.' },
{ q: 'Do you need access to my phone or theirs?', a: 'No. You watch the lessons and follow the steps yourself, on phones you or your family own. We never touch any device or account.' },
{ q: 'Does it work outside the US?', a: 'Yes. The tools are built into iPhone and Android worldwide. Some features (like Fall Detection or Scam Call Protection) depend on the device model and country — each lesson says which.' },
{ q: 'Who made this?', a: '<nome/empresa real + 1 linha>' }
```
No lv-check vai também o FAQ "Will this let me see their messages?" (ver 2.2).

### 3.4 Prova social real (sem inventar)
1. **Beta com acesso grátis.** Libere o curso para 20–30 pessoas (lista de e-mail, amigos, grupos de pais ou cuidadores), pedindo uma avaliação honesta. Peça autorização por escrito para publicar o primeiro nome e a inicial, e guarde o print.
2. **E-mail no dia 7 depois da compra** com uma pergunta ("What did you set up first?") e um formulário com caixa de consentimento para uso público.
3. **Contadores reais:** "X families set up" só com o número da Monetizze, atualizado à mão. Nunca estimado.
4. **Enquanto não houver depoimento,** a prova são os prints das ferramentas e a prévia de aula (ver 3.1). Isso já cumpre o papel.
5. Se publicar depoimento: Meta e FTC pedem que seja típico ou que venha com aviso. Nada de "resultado garantido".

### 3.5 Mobile e técnica (P1/P2)
- **A página inteira é montada por JS.** Se o JS falhar ou o webview do Instagram ou TikTok demorar, a tela fica branca. Ponha em `offer.html` um `<noscript>` ou HTML estático mínimo (headline, preço, "NOT do", links legais) e tags `og:`.
- **`core.js`** é carregado no `<head>` sem `defer` e bloqueia a renderização. É pequeno, mas troque por `defer` (o `quiz.js`/`offer.js` usam `LV` depois).
- **Sticky:** sempre visível no lv-check, inclusive sobre o unmask. Mostre só depois que o hero sair da tela (IntersectionObserver), o que reduz a sensação de pressão.
- **Teste real:** ainda falta testar nos webviews de Instagram, TikTok e Facebook em aparelho (skill testar-funil-mobile).

---

## 4. Monetizze e checkout internacional: o que falta

| Requisito | Status | Ação |
|---|---|---|
| Produto criado com nome e descrição sem "spy", "monitor secretly", "WhatsApp" | Produto ainda não existe | Categoria Educação/Família. Descrição: "Video course: set up family safety features (location sharing with consent, parental controls, fall alerts, scam blocking) and secure your own phone." |
| Área de membros com conteúdo | Curso não gravado | A verificação do produto (`produto_solicitar_verificacao`) normalmente olha a entrega. Suba pelo menos o MVP antes de pedir. |
| Página de vendas no domínio do produto | love-vision.site é compartilhado com o Whats Spy | Domínio próprio (0.1) |
| Termos, privacidade, reembolso, contato no site | Não existem | Ver 0.2, com links no rodapé do quiz e da oferta |
| E-mail de suporte funcionando | Pendente | Criar a caixa e cadastrá-la como suporte do produto |
| Garantia igual à da página | — | 30 dias no plano. Texto do reembolso igual em todo lugar. |
| Checkout internacional | — | Moeda USD, idioma EN, preço $27 batendo com a página, bumps desmarcados com descrição clara, pixel e dataset novos no grupo de pixel do produto novo, nome do produto igual ao da página |
| Descritor | CENTERPAG (fixo) | Avisar na página, no checkout (texto ou banner do builder) e no obrigado |
| Página de obrigado própria | Não existe | Ver 2.4 |
| Identificação do vendedor | Ausente | Nome da empresa/produtor e país no `/contact` e no rodapé |
| Isenção de marcas | Ausente | "Apple, iPhone, Google, Android, WhatsApp, Instagram, TikTok, Snapchat and Life360 are trademarks of their owners. Love Vision is not affiliated with them." no rodapé |

Confira a lista atual de produtos proibidos da Monetizze. Com a copy limpa, o produto é educacional, mas a descrição e a página não podem sugerir monitoramento oculto. No lv-check, isso depende das reescritas da seção 2.2.

---

## Resumo priorizado

| # | P | Item | Onde |
|---|---|---|---|
| 1 | P0 | Domínio próprio e nome comercial distinto do "Love Vision – Whats Spy". Sem usar ativo restrito. | deploy, Monetizze |
| 2 | P0 | Criar `/terms`, `/privacy`, `/refund`, `/contact` e o rodapé com links (também no quiz) | `defaults.js`, `quiz.js`, `offer.js` |
| 3 | P0 | Preencher o `checkout.url` dos 5 funis; trocar o `alert()` por log | configs, `core.js` |
| 4 | P0 | lv-check fora do tráfego frio até reescrever intro, `want`, `knows` e o unmask (rótulo fixo, play no toque, sem "WhatsApp") | `lv-check/config.js`, `offer.js` |
| 5 | P0 | Reescrever os "more" do report, a tag "deleted", o CTA, e tirar "dispute the charge" | `lv-check/config.js` |
| 6 | P0 | Cortar o teste de foto de terceiro, ou trocar por "teste com o SEU número" | `lv-check` `photoLookup`/`unmask` |
| 7 | P0 | Matriz promessa × aula. Lançar só o funil que o MVP cobre, ou mostrar datas de liberação. | curso, configs |
| 8 | P0 | Página de obrigado própria + aviso de CENTERPAG + bumps desmarcados + suporte respondendo | site, Monetizze |
| 9 | P1 | Criativos sem spy/track/read/cheater, sem atributo pessoal, sem "nude" | anúncios |
| 10 | P1 | Ordem da oferta: prévia do plano → preço → prova → why…; resumo do "NOT do" junto ao 1º CTA | `offer.js` |
| 11 | P1 | Prova real: prints das ferramentas + "quem fez" + beta de depoimentos com consentimento | `offer.js` (`proof`/`about`), operação |
| 12 | P1 | Usar as respostas do quiz (worry/talk) na oferta e corrigir `device: mixed` | `offer.js`, configs |
| 13 | P1 | FAQ: assinatura? fatura? acesso ao celular? fora dos EUA? quem fez? + "vê mensagens? não" no lv-check | `defaults.js`, `lv-check` |
| 14 | P1 | Fontes: ano e link no alerta do FBI (lv-kids), conferir o IC3 mais recente (lv-parents); "can't be turned off" | configs |
| 15 | P2 | Pixel Meta/TikTok novo, `defer` no core, `noscript`/og, sticky só depois do hero, teste nos webviews reais | `core.js`, HTML |
