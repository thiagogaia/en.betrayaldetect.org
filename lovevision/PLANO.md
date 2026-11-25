# Love Vision: plano do produto novo (isolado)

> "See who you love. Know they're safe."
> Curso em vídeo para acompanhar, **com consentimento**, quem você ama, e para proteger o próprio celular.

## Regra de isolamento
- **Funil:** diretórios novos em `love-vision.site` (repo `en.betrayaldetect.org`): `site/lv/` (genérico, "quem você ama"), `site/lv-parents/`, `site/lv-kids/`, `site/lv-partner/`, com o motor comum em `site/lv-shared/`. Nenhum arquivo dos funis antigos é alterado nem reaproveitado; tudo foi escrito do zero.
- **Monetizze:** produto novo, com planos, checkouts, cupons e nome na fatura próprios (ex.: `LOVEVISION`). O produto Whats Spy não é tocado.
- **Rastreamento:** pixel/dataset do Meta, propriedade GA4 e projeto Clarity novos, com dashboard próprio na Utmify. Assim reclamações, reembolso e chargeback ficam separados.

## Públicos (decisão de 24/11): funil genérico + 3 dedicados, autoproteção dentro de todos
| Ordem | Funil | Dor/gatilho | Risco no Meta | CTA |
|---|---|---|---|---|
| 1 | **Pais idosos** (`/parents/`) | golpes, quedas, distância; Thanksgiving e Natal agora | baixo | Protect My Parents – $27 |
| 2 | **Pais de adolescentes** (`/teens/`) | predadores, sextortion, tela | baixo/médio | Start Protecting My Teen – $27 |
| 3 | **Autoproteção** (`/check/`) | "alguém pode estar vendo seu celular?" | médio | Secure My Phone – $27 |
| 4 | **Casais, "Transparency Pact"** (`/couples/`) | confiança por acordo | alto (lançar por último) | – |

**Fluxo:** anúncio → quiz de 5 passos (1 toque por tela) → "seu plano" por aparelho (iPhone/Android) → oferta → checkout com 2 bumps → obrigado e acesso.

**A oferta tem sempre:**
- preço visível no 1º scroll;
- prints reais das ferramentas;
- seção "What this course does NOT do";
- aviso de que monitorar adultos sem consentimento é ilegal;
- garantia de 30 dias.

## Oferta
- **Front:** US$ 27 + order bump (decidido em 25/11; antes era US$ 49), sem preço "de" falso. Ordem: front estável → upsell → teste de preço do front.
- **Bumps por funil:**

  | Funil | Bump 1 | Bump 2 |
  |---|---|---|
  | Idosos | Scam Script Cards, $7 | Emergency Info Kit, $9 |
  | Teens | Teen Phone Contract, $7 | Predator Red-Flags Checklist, $9 |
  | Autoproteção | Account Lockdown Checklist, $7 | Safe Exit Privacy Guide, $9 |

- **Depois:** upsell "Family Safety Setup Session" (chamada de 30 min, $97) e downsell "Quick-Start Pack" ($17 — rever, já que o front agora é $27).

## Curso (módulos)
| Módulo | Título | Aulas |
|---|---|---|
| M0 | Start Here: Safety With Consent | – |
| M1 | Protect Yourself First | stalkerware, AirTags, aparelhos logados, 2FA, por que "apps que leem WhatsApp" são golpe |
| M2 | Teens: Smart Guardrails | Family Link, Screen Time, filtros, Family Centers, localização, contrato do celular |
| M3 | Aging Parents: Safe & Independent | localização, queda/SOS, golpes, contatos de emergência, acesso de confiança |
| M4 | Couples: The Transparency Pact | – |
| M5 | Whole Family Circle | Life360, Find My, Google, plano de emergência |
| M6 | Consent & The Law | roteiros, acordo de família, o que é ilegal |

**MVP (1–2 semanas, começando por idosos):** M0, M3 completo, M1.1–1.3 e M6.2–6.3, mais os PDFs (Scam Script, ficha de emergência, acordo).

## Linhas vermelhas da copy
- **Proibido:**
  - "spy", "secretly", "without them knowing", "hidden", "undetectable";
  - "read their WhatsApp", "deleted messages", "catch a cheater", "track any number";
  - afirmar atributo pessoal na 2ª pessoa ("Your elderly mother…", "Is your husband cheating?");
  - timer que reinicia, vagas falsas, depoimento inventado, número sem fonte.
- **"Monitor"** sempre com qualificador: "openly", "with permission", "by agreement".

## Template técnico (escrito do zero)
- **`js/forward.js`:** repasse de UTMs (`buildForwardUrl`, `navigateWithQuery`), mesma lógica do en-r.
- **`js/tracking.js`:** GA4, Clarity e Utmify em `<script src>` normal (sem ofuscação), mais `track(name, props)`.
- **`goCheckout(url, {plan, variant, cupom})`:** **sem** nome, e-mail ou telefone na URL.
- **Fora:**
  - trava do botão voltar, mouse-exit e pull;
  - `beforeunload`;
  - barra de urgência falsa;
  - webhook de foto de perfil;
  - assets e mockups do Whats Spy.
- Desconto/oferta alternativa só por link visível, nunca preso ao botão voltar.
- **Deploy:** nginx estático (igual ao atual), domínio novo.
