---
name: lv-copy
description: Regras de produto, voz e copy dos funis Love Vision (site/lv*, love-vision.site) — curso de segurança familiar com consentimento, vendido a quem chega querendo espionar. Use ao escrever, revisar ou testar qualquer copy, quiz, oferta, anúncio ou e-mail do Love Vision. Não se aplica ao funil antigo Whats Spy (en-r, upsmtz, ingles-gts).
---

# Love Vision — copy agressiva e honesta

## O produto
- Curso em vídeo (área de membros Monetizze), **US$ 27** + order bumps de US$ 7–9. Garantia de 30 dias.
- Ensina a acompanhar **pais idosos, filhos, parceiro e parentes com o conhecimento/OK deles**, e a proteger o próprio celular.
- Ferramentas reais ensinadas no curso (referência interna, para checar fatos — **nunca citar no funil**): Find My, Google Maps location sharing, Life360, Screen Time, Family Link, Family Center (Instagram/Meta e Snapchat), Family Pairing (TikTok), Emergency SOS, Fall Detection (Apple Watch/Pixel Watch/Galaxy Watch), Medical ID, Silence Unknown Callers, bloqueio de spam/golpe (Scam Detection e Caller ID & spam no Pixel; Caller ID and spam protection no Samsung), Safety Check (iOS), Recovery/Legacy Contact, Inactive Account Manager, Apple Account (não "Apple ID"), 2FA, aparelhos conectados do WhatsApp.
- **Não revelar nomes de apps/ferramentas no funil** (quiz, oferta, App Kit, FAQ, anúncios, e-mails pré-compra): o nome é o conteúdo pago. Descrever **o que cada um faz**, com curiosidade, e dizer que o nome/setup é revelado dentro (ex.: "🔒 revealed inside"; cadeado com moderação). Ex.: "Share location in Find My" → "Turn on live location sharing with you — with their OK"; "Screen Time & Family Sharing" → "the built-in parental controls"; AirTag → "hidden Bluetooth trackers". Nomes de **plataforma** podem: iPhone, Android, Apple, Google, WhatsApp, Instagram, TikTok, Snapchat. Checagem: o grep de nomes em `site/lv-shared/js/*.js site/lv*/config.js` deve dar zero.
- Fatos que já erramos: compartilhar localização **pode ser pausado** pela outra pessoa sem aviso (nunca dizer que "can’t be turned off"); monitorar adulto sem consentimento "**can be** a crime" (nunca "is a crime"); Family Link não mostra lista de contatos; foto do WhatsApp só é pública em "Everyone"; "last seen"/online podem ser visíveis conforme a privacidade; recursos de bloqueio vêm "often switched off", não sempre. Não citar casos policiais brasileiros como prova.
- Posicionamento: **video lessons + App Kit** (apps reais da App Store/Google Play, cada um com aula de setup; no funil o App Kit mostra a função de cada app e "App name revealed inside"). Não falar só "course". Nunca "spy app"; não acessa celular de ninguém, não lê mensagens. Não dizer que licença de app pago está inclusa.

- **IA de monitoramento (opção A, só terceiros):** o curso ENSINA apps de IA de segurança de terceiros (tipo Bark/Aura/Canopy — nunca citar o nome no funil). Só para **filho menor** (responsável legal) e **pai idoso que consente** (enquadrar como anti-golpe); nunca parceiro/cônjuge. Enquadrar sempre como **alerta por categoria** (grooming, golpe, sextorsão, autolesão), não "leia as mensagens"/feed. Não é app próprio do Love Vision; não processamos dados de menor.

## Público
Boa parte do tráfego chega querendo **ler mensagens / rastrear escondido** (ex-público do Whats Spy). Muitos já viram anúncios de "espione qualquer WhatsApp" ou pagaram por um. A estratégia é **falar com esse desejo e entregar a verdade**: o que é mito, o que é crime, o que funciona — e vender o caminho que funciona.

## Funis (site/)
- `lv/` genérico · `lv-parents/` · `lv-kids/` · `lv-partner/` · `lv-check/` (Reality Check: desmascara sites espiões, Reality Report e oferta).
- Motor comum em `lv-shared/` (core, quiz, offer, defaults, css). Cada funil = `config.js` + `index.html` (quiz) + `offer.html`.
- Copy fica no `config.js` (quiz.intro, questions, offer.headline/sub/cta/why/bullets/modules, offer.report, offer.unmask) e em `lv-shared/js/defaults.js` (módulos, notDo, legal, FAQ).

## Agressivo = PODE
- Hooks fortes que nomeiam o desejo: "Seen ads saying you can read anyone's WhatsApp?", "Do you really know who your kid is talking to?".
- Medo real e específico (golpes contra idosos, sextortion, stalkerware), urgência real (feriados, volta às aulas), curiosidade ("Possible · Not simple"), contraste mito × realidade, desmascarar concorrentes ("spy sites lie").
- Personalização pelo quiz, prova concreta (o que aparece na tela), CTA com benefício, preço sempre visível.
- Estatísticas **com fonte verificável** (órgão + ano). Sem fonte → não usa número.

## Linhas vermelhas (nunca)
- Prometer ou insinuar acesso **escondido** a celular, mensagens, fotos ou contas de **outro adulto**.
- "Spy", "secret", "hidden", "undetectable", "read their messages", "without them knowing" como benefício.
- Ensinar a instalar stalkerware ou acessar conta alheia. (Pode explicar que existe, que é crime sem consentimento, os riscos e como detectar no próprio celular.)
- Escassez/timer falso, preço "de" falso, depoimento inventado, número sem fonte, "garantido".
- Coletar e guardar dados de terceiros (o teste de foto pública é a exceção: POST único, nada salvo).
- Remover a seção "What this course does NOT do", o aviso legal ou o preço visível.
- Copiar visual/linguagem do funil Whats Spy.

## Tom
Direto, de amigo que sabe o assunto, sem julgar ("No judgment."). Inglês americano, frases curtas, mobile-first. Mostrar empatia com quem desconfia do parceiro, mas o caminho oferecido é conversa, sinais, autoproteção e via legal.

## Como entregar alterações
Propostas prontas para colar, por arquivo/campo do `config.js`, com uma linha do porquê e prioridade. Não editar `site/` direto sem o orquestrador; nunca tocar nos funis antigos.

## Preço (ajuste do dono em 25/11)
- O preço não precisa aparecer desde o topo: a barra fixa pode surgir no scroll (`stickyAfter`), mas o preço SEMPRE aparece no pricebox antes do checkout.
- De/Por (`priceFrom`) só com preço cheio real: hoje "$47 → $27 launch price" vale porque o dono vai subir para $47 depois do lançamento. Se não subir, remover o `priceFrom`.
- Pronomes: lv-partner pergunta quem (namorado/marido/namorada/esposa/parceiro) e personaliza com tokens {they} {their} {partner} etc. (`pronounsFrom`).
