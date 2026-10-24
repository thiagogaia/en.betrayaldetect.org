# Como trabalhar neste projeto com o Claude Code

Funil de vendas/upsells em HTML, CSS e JS puro. Objetivo: **aumentar conversão e lucro do funil completo**, com ótima experiência mobile — foco nos **navegadores internos de Facebook, Instagram e TikTok**.

## Setup (1 vez)
1. Clone/atualize o repo e entre na branch de trabalho:
   ```bash
   git clone git@github.com:thiagogaia/en.betrayaldetect.org.git
   cd en.betrayaldetect.org && git checkout love-vision.site && git pull
   ```
2. Abra o **Claude Code dentro da pasta `en.betrayaldetect.org`**. Ele carrega sozinho, numa **sessão nova**:
   - `CLAUDE.md` — as regras e o mapa do projeto.
   - `.claude/agents/` — a equipe de especialistas.
   - `.claude/skills/` — os comandos de trabalho.
3. Preview local do site: `python3 -m http.server 8080 --directory site` → `http://localhost:8080`.

## A equipe (use só quem a tarefa pede — nunca todos)
- **frontend-engineer** — HTML/CSS/JS, performance, bug, rastreio.
- **ux-ui-designer** — visual, mobile, hierarquia, usabilidade.
- **cro-strategist** — estratégia de oferta, hipóteses, experimentos.
- **conversion-copywriter** — headline, copy, objeções.
- **analytics-specialist** — Clarity/GA, dados, interpretação.

## Comandos (skills)
- `/auditar-upsell` — auditoria de uma página/funil (CRO+UX+copy+frontend+dados).
- `/planejar-teste-ab` — hipótese, variantes, métrica, amostra, decisão.
- `/validar-funil` — checagem técnica de regressão antes de publicar.
- `/testar-funil-mobile` — testes mobile (Playwright) + checklist dos navegadores internos.

## Como o Claude deve trabalhar
- **Tarefa simples** (texto, CSS, um link): faz direto, valida, avisa curto.
- **Intermediária** (layout mobile, componente, bug JS): investiga, 1 especialista se preciso, plano curto, **aprovação**, testa o afetado.
- **Complexa** (reformular upsell, mudar fluxo/oferta, teste A/B, queda de conversão): **Plan Mode**, especialistas certos, dados reais, hipóteses priorizadas, **aprovação**, valida e diz como medir.
- Respostas objetivas. CRO em 5 pontos: problema → evidência → mudança → impacto/confiança → como validar. Sempre separe **comprovado × hipótese × recomendação**.
- Econômico com tokens: reutilize o que já está no CLAUDE.md, leia só o relevante, não rode agentes à toa.

## Regras de segurança (inegociáveis)
- Trabalhe na cópia de edição, **preserve os originais**.
- **Nunca** altere página, preço, oferta, rastreamento ou fluxo sem autorização do dono.
- **Nunca** publique em produção sem autorização. Deploy é por push na `love-vision.site` (serve só a pasta `site/`).
- Nada de dependências externas desnecessárias; mantenha o HTML/CSS/JS simples.
- Segredos (tokens, chaves) ficam fora do git.

Detalhes completos (produtos, IDs de analytics, dívidas técnicas, escopo dos funis) estão no **CLAUDE.md**.
