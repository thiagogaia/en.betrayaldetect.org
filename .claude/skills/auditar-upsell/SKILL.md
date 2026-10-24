---
name: auditar-upsell
description: Auditoria completa de uma página de upsell do funil, cruzando CRO, UX/UI, copy, frontend e dados reais disponíveis. Use quando o usuário pedir para "auditar", "analisar" ou "revisar" uma página do upsmtz (up1–up7, thankyou), ou o funil inteiro.
---

# Auditar upsell

Conduz uma auditoria multidisciplinar de uma página (ou do funil) do `upsmtz`, acionando os subagentes especializados e consolidando. **Não altera nenhuma página** — só diagnostica e recomenda.

## Entrada
Página-alvo (ex.: `up3`) ou "funil completo". Se não vier, pergunte qual.

## Passos
1. **Reunir contexto** da página: ler o HTML/CSS/JS dela em `site/upsmtz/<alvo>/`, identificar oferta, preço, provedor de checkout e para onde o "No thanks" aponta. Conferir contra o mapa do CLAUDE.md.
2. **Puxar dados reais primeiro** (via `analytics-specialist`): vendas/take-rate da etapa (Monetizze ou `pp_vendas`), mobile vs desktop, tráfego (Utmify) e, se o `sync_clarity` estiver ativo, rage/dead clicks e scroll da URL. Registrar período e fonte. Se faltar dado, anotar o que destrava.
3. **Acionar os quatro ângulos**, dando a cada um o contexto e os dados do passo 2:
   - `cro-strategist`: oferta, preço, posição no funil, impacto no lucro por visitante.
   - `conversion-copywriter`: headline, oferta, objeções, CTA.
   - `ux-ui-designer`: hierarquia, mobile, fricção, pontos de abandono.
   - `frontend-engineer`: bugs, links/parâmetros, performance, código morto/enganoso.
4. **Consolidar** num relatório único, sem repetir, resolvendo conflitos entre áreas.

## Formato do relatório
- **Resumo** (3–5 linhas): estado da página e a maior alavanca.
- **Observado** / **Hipótese** / **Recomendação** — três seções claras. Cada recomendação com **prioridade** (Alta/Média/Baixa), **impacto estimado** (e em que evidência se baseia) e **esforço**.
- **Faltou dado?** lista do que investigar e qual conector/config resolve.
- **Próximo passo sugerido**: normalmente um teste via `/planejar-teste-ab` ou uma correção técnica.

## Regras
Dados reais antes de opinião. Diferencie sempre fato de hipótese. Priorize lucro por visitante e conversão do funil completo, não estética. Nada é alterado sem autorização do usuário.
