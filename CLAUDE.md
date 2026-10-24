# Projeto Love Vision — Funil de vendas (Whats Spy)

Ambiente de otimização de funis com foco em CRO, UX, copy, frontend e análise de comportamento real. O chat principal é o **orquestrador**: aciona os subagentes certos e consolida as análises.

## Regras do projeto (inegociáveis)
1. **Preserve os arquivos originais.** Trabalhe sempre na cópia `site/upsmtz/`, nunca em `site/ingles-gts/upsell/`.
2. **Nunca altere uma página sem autorização** explícita do usuário.
3. **Não publique nem mude config de produção** (deploy, rastreamento no ar, DNS) sem aprovação.
4. **Não instale conectores de terceiros** sem aprovação. Priorize acesso somente leitura.
5. **Não versione segredos.** Tokens/credenciais ficam em `~/LoveVision/.env` (fora do git), nunca nos arquivos do site.
6. Priorize **lucro por visitante e conversão do funil completo**, não estética.
7. Decida com **dado real** quando possível; distinga sempre **observado × hipótese × recomendação**. Não invente dados — registre o que falta investigar.

## Estrutura
- `site/` — tudo que vai ao ar (Nginx via `Dockerfile`). Site 100% estático (HTML/CSS/JS), sem backend.
- **Dois funis de upsell em produção:**
  - `site/en-p/upsell/` — funil **PerfectPay** (no ar em `love-vision.site/en-p/upsell/up1`).
  - `site/upsmtz/` — funil **Monetizze** (cópia de trabalho nova, origem em `ingles-gts/upsell`). É o que estamos montando.
- `site/ingles-gts/upsell/` — original de referência do upsell Monetizze (não mexer).
- Demais pastas em `site/` são outros funis/idiomas (en-m, en-b, zap, ultra, es-*, etc.).
- Dados e relatórios ficam na pasta irmã `~/LoveVision` (banco `monetizze.db`, scripts de sync, relatórios). Não é repositório git.

### Rodar localmente
Servidor de preview já configurado (nome `site`): serve `site/` em `http://localhost:8080`.
Funil novo: `http://localhost:8080/upsmtz/up1/`. Manual: `python3 -m http.server 8080 --directory site`.

## O funil upsmtz — ofertas e checkouts
Upsells pós-compra do "Whats Spy". Cada página: animação de "processando" → oferta de add-on com escassez → CTA. Recusar leva à próxima etapa.

| Página | Oferta | Preço | Provedor | ID de checkout | "No thanks" → |
|---|---|---|---|---|---|
| up1 | Recuperar mensagens/fotos apagadas (90 dias) | $47 | Monetizze | `17caea4794183f1085a9a43779c4769e` | up2 |
| up2 | Monitorar redes sociais + GPS | $67 | Monetizze | `517a370582f334d7ee061bc958059735` | up3 |
| up3 | Processamento VIP / prioridade | $47 | Monetizze | `4cad12ba0baca86fdd66a9a807b3222f` | up4 |
| up4 | "Modo invisível" (indetectável) | $47 | PerfectPay | `PPU38CQ7TCA` | up5 |
| up5 | Acesso ao vivo (microfone/câmera) | $47 | PerfectPay | `PPU38CQ7TCH` | up6 |
| up6 | Licença multi-dispositivo (3 aparelhos) | $47 | PerfectPay | `PPU38CQ7TCL` | up7 |
| up7 | Analista de comportamento por IA | $47 | PerfectPay | `PPU38CQ7TCN` | thankyou |
| thankyou | Instruções de acesso + área de membros | — | — | — | — |

Checkouts: Monetizze via `buy1click.js` (compra 1-clique); PerfectPay via `go.centerpag.com/<ID>`. Contato no thankyou: `contacto@love-vision.site`.

## Escopo de trabalho (funis ativos)
Trabalhamos SÓ nestes 4 funis por ora; todo planejamento é em cima deles:
- **en-r** — funil de venda principal (mais visitado).
- **en-l** — importante, vem de afiliado.
- **upsmtz** — upsell Monetizze (cópia de trabalho).
- **en-p/upsell** — upsell PerfectPay (em produção).

## Analytics / rastreio — estado real (atualizado em 2026-10-24)

**Microsoft Clarity** — FUNCIONA (token testado: 6.066 sessões/dia). Projeto único nos 4 funis: **`xq3x58b2lj`** (en-r, en-l, en-p/upsell já tinham; instalado no upsmtz em 24/10, carregamento confirmado no browser). O projeto `t8xlagi0nl` existe só no `zap` (fora do escopo). Fora dos 4 funis, `ingles-gts/`, `en-pd`, `es` seguem sem Clarity.

**Google Analytics (GA4)** — property **`G-XLQQWM3D3N`** (nova, criada pelo usuário) instalada nas **24 páginas dos 4 funis** em 24/10; hit `g/collect` confirmado no browser (dados fluindo). A property antiga `G-W52R29LK1K` (morta, só 2 páginas do zap) foi abandonada — não usar.
- Pendente (passo separado): LER o GA aqui dentro via GA Data API. Service account `lovevision-ga-reader@idyllic-chimera-512622-c0.iam.gserviceaccount.com` já criado, mas a criação da chave JSON está **bloqueada pela política da organização** `iam.disableServiceAccountKeyCreation` (tentou liberar, não liberou). Retomar depois: liberar a política no projeto OU usar `gcloud auth application-default login` (ADC, sem chave). Falta também dar acesso Leitor ao e-mail no GA4 e pegar o Property ID numérico. O tag client-side já coleta normalmente.

**Outros:** Meta Pixel `726299943423075` (up4–up7 do upsmtz/Monetizze); UTMify (cdn.utmify.com.br); Auralink (`app.auralink.com.br`) em páginas do zap; CAPI `zapspy-funnel-production.up.railway.app`.

Snippets padrão (inserir após `<head>`): Clarity com id `xq3x58b2lj`; GA4 `gtag/js?id=G-XLQQWM3D3N` + `gtag('config',...)`.

## Tecnologias e rastreio
- Frontend estático; fontes Google; sem framework.
- **Meta Pixel** `726299943423075` em up4–up7 (**dono a confirmar**).
- **UTMify** (`cdn.utmify.com.br`) em up4–up7.
- **CAPI/backend**: `zapspy-funnel-production.up.railway.app` via `fc.js`/`upsell-tracking.js` (**dono a confirmar**).
- **GA4** `G-W52R29LK1K`: instalado em páginas antigas, **não no upsmtz**.
- **Clarity**: tag **não** está no upsmtz.

## Dívidas técnicas / a investigar (não resolver sem autorização)
- **"No thanks" que cobra o cliente**: em páginas do upsell, o script final reescreve o botão de recusa para o link de compra quando é cliente real (e esconde o preço). Em up1/up2 falta `customerMode` e o script quebra. Corrigir para recusa honesta + preço sempre visível.
- **Scripts que quebram no upsmtz** (pasta subiu de nível): `../../js/sentry-init.js`, `../../js/fc.js` (up4–up7), `../../../shared/js/_zs-guard.js` (up4–up7, arquivo nem existe). Decidir: remover ou religar.
- **Lixo provável**: honeypot (`data-zs-hp`) sem formulário; `sentry-init.js` sem DSN; feed de "prova social" com nomes aleatórios; comentário/guard `zs-canary` do dono anterior.
- **Confirmar com o usuário**: o Pixel `726299943423075` e o backend Railway são dele? Se não, remover.
- **GA4 e Clarity no upsmtz**: decidir se instala a tag no funil novo.

## Integrações de dados (estado real)
| Fonte | Acesso | O que dá | Limite |
|---|---|---|---|
| Monetizze | MCP conectado (leitura) | Vendas, estatísticas, produtos, comissões (up1–up3) | Sem saque/financeiro |
| PerfectPay | Token no `.env` + tabela `pp_vendas` | Vendas up4–up7 | Sem MCP; via banco/sync |
| Utmify | MCP conectado + tabelas `gasto_ads`,`utmify_resumo`,`v_vendas_utm` | Tráfego, campanhas, custo, ROI | — |
| Microsoft Clarity | `CLARITY_TOKEN` no `.env`; script `sync_clarity.mjs` (desativado) → `clarity_insights` | **Data Export API** (leitura): scroll, rage/dead clicks, erros JS, por URL/OS/Device | Só 1–3 dias, 10 chamadas/dia, 3 dimensões, 1.000 linhas. **Sem heatmap/gravações por API** (só painel) |
| GA4 | Tag existe; **sem credencial da Data API** | Nada por API hoje | Precisa (1) tag no upsmtz e (2) configurar GA Data API (service account) |

Banco de dados: `~/LoveVision/monetizze.db` (SQLite). Tabelas úteis: `vendas`, `pp_vendas`, `v_vendas_dia`, `v_vendas_utm`, `gasto_ads`, `utmify_resumo`. (A tabela `clarity_insights` só existe depois que `sync_clarity.mjs` rodar; hoje não existe.)

### Produtos reais vendidos (PerfectPay, status `Finalizada`, ~ago–out/2026) — confirmado
Vendas reais ligadas a este funil (checar `pp_vendas` para dados atuais):
- **Love Ai - ZapSpy** — 363 vendas / US$ 13.117 (produto principal / front).
- **Love Ai - Live Room & Camera** — 47 vendas / US$ 2.209 → corresponde ao **up5**.
- **Love Ai - Instant Access** — 22 vendas / US$ 814 → provável **up4/up3**.
- **Love Ai - Multi Device** — 13 vendas / US$ 481 → corresponde ao **up6**.

A investigar: confirmar qual ID de checkout PerfectPay (`PPU38CQ7TC…`) corresponde a cada "Love Ai …", e o mapeamento dos upsells Monetizze (up1–up3). Status possíveis em `pp_vendas`: Finalizada, Cancelada, Devolvida, Chargeback, pre_chargeback.
No Utmify, o dashboard **"USD"** (`6865e9e706b636fc540b31ab`) é o deste funil (plataformas Monetizze + PerfectPay).

## Equipe de subagentes (`.claude/agents/`)
- **cro-strategist** — conversão, oferta, preço, ordem do funil, lucro por visitante.
- **conversion-copywriter** — headlines, ofertas, objeções, CTA (sem promessa enganosa).
- **ux-ui-designer** — UX, mobile-first, hierarquia, fricção.
- **frontend-engineer** — HTML/CSS/JS, performance, links/parâmetros, rastreio, código morto.
- **analytics-specialist** — GA4, Clarity e dados de venda; mede abandono, take-rate, mobile×desktop, tráfego.

## Skills (`.claude/skills/`)
- `/auditar-upsell` — auditoria multidisciplinar de uma página ou do funil.
- `/planejar-teste-ab` — hipótese, variantes, métrica, amostra, critério de decisão.
- `/validar-funil` — checagem técnica de regressão (links, params, diff vs original) antes de publicar.
- `/testar-funil-mobile` — testes mobile automáticos (Playwright chromium+webkit) + checklist de validação real nos navegadores internos de Facebook/Instagram/TikTok.

## Como trabalhar neste projeto
Objetivo: **aumentar conversão e lucro do funil completo**, com ótima experiência mobile — foco nos **navegadores internos de Facebook, Instagram e TikTok**. É HTML/CSS/JS puro; não criar arquitetura complexa, dependências externas nem cópias redundantes.

**Economia de tokens.** Resolva tarefas simples direto no agente principal. Acione só o(s) especialista(s) necessários — nunca todos, nem em paralelo, quando um resolve. Reutilize o que já está documentado aqui (páginas, produtos, estrutura) em vez de reanalisar. Leia só os arquivos relevantes. Respostas e relatórios curtos; resuma saídas de ferramentas/testes preservando o que importa para diagnóstico; não despeje logs/HTML/screenshots inteiros quando um recorte basta. Não sacrifique qualidade/segurança de mudanças críticas para poupar token.

**Quando usar cada especialista** (via Task; `.claude/agents/`): frontend-engineer (HTML/CSS/JS, performance, bug, integração/rastreio), ux-ui-designer (visual, mobile, hierarquia, usabilidade), cro-strategist (estratégia de oferta, hipóteses, experimentos), conversion-copywriter (headline, copy, objeções), analytics-specialist (Clarity/GA, dados, interpretação). Para análise completa de uma página ou mudança grande, coordene os relevantes e consolide — não consulte todos em toda auditoria.

**Fluxo por complexidade.**
- *Simples* (texto, espaçamento, CSS, um link): faça direto, sem subagente; mudança pequena e localizada; valide; informe em 1–2 linhas o que mudou.
- *Intermediária* (layout mobile, componente de oferta, bug de JS): investigue o trecho; acione 1 especialista se preciso; plano curto se houver decisão; implemente **após aprovação**; teste os pontos afetados.
- *Complexa* (reformular upsell, mudar fluxo/oferta, teste A/B, queda de conversão): use **Plan Mode**; consulte os especialistas certos; use dados reais; apresente hipóteses e recomendações priorizadas; implemente só o aprovado; valide e diga como medir o impacto.

**Testes proporcionais ao risco** (ver `/testar-funil-mobile`). Não rode a bateria toda a cada ajuste de CSS. Priorize: preview local; Playwright pontual (Chromium e WebKit, mobile); erros de JS; botões/vídeos/links/redirects; **preservação de params de URL (mcr, UTMs) entre etapas**; performance e estabilidade visual; navegação entre etapas. A simulação de User-Agent é só complementar — não reproduz fielmente os navegadores internos; validação real é no iPhone/Android dentro dos apps (checklist no skill).

**Formato das respostas.** Objetivo. Tarefa simples: o que foi feito + resultado da validação. Análise de CRO, nesta ordem: 1) problema/oportunidade; 2) evidência; 3) mudança recomendada; 4) impacto esperado + grau de confiança; 5) como validar. Sem explicações técnicas irrelevantes. Separe sempre **comprovado × hipótese × recomendação**; não conclua que algo converteu mais só porque parece melhor.

**Devoluções / chargebacks.** A atração e a oferta são propositalmente **agressivas — não suavizar por conta própria** para baixar reembolso. A alavanca de reembolso que tratamos no funil é o **fluxo de comunicação na compra e na entrega**: clareza do que foi comprado, o que chega, próximos passos, página de obrigado e expectativa pós-venda. (Educar o cliente dentro do conteúdo do app é outra camada, fora do funil.) Qualquer mudança que reduza a agressividade só acontece se o dono **pedir** e deve ser estruturada como **teste A/B com retorno medido** (não trocar venda por "sensação de melhor"). Acompanhar a taxa de devolução/chargeback é guardrail dos testes.

**Colaboração (2–3 pessoas).** Branch compartilhada `love-vision.site`. Antes de editar: `git pull` (rebase). Não editar os mesmos arquivos que outra pessoa está mexendo; avisar o que está em andamento. Commits pequenos e descritivos. **Deploy (push) só com autorização do dono.** `.claude/` e `CLAUDE.md` ficam versionados (todos usam a mesma estrutura); `.claude/launch.json` é local.

**Atribuição e multi-checkout.** Conferir sempre: venda de **afiliado (en-l)** creditada corretamente, e cada etapa apontando para o **checkout certo** — Monetizze (`buy1click.js`, up1–up3 do upsmtz) vs PerfectPay (`go.centerpag.com`, up4–up7 e en-p/upsell). Parâmetros `mcr`/UTMs preservados ponta a ponta.
