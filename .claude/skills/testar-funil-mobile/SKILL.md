---
name: testar-funil-mobile
description: Testa uma página ou etapa do funil no mobile — Playwright (Chromium + WebKit) em viewport mobile, erros de JS, botões/vídeos/links/redirects, preservação de params de URL (mcr, UTMs) e estabilidade visual. Inclui checklist de validação real nos navegadores internos de Facebook/Instagram/TikTok. Use para "testar no mobile", "ver se funciona no in-app", "checar o funil no celular".
---

# Testar funil mobile

Testes mobile **proporcionais ao risco** da mudança. Não roda tudo a cada ajuste de CSS — escolha os itens que a mudança pode afetar. Foco no que mais importa: os **navegadores internos de Facebook, Instagram e TikTok**. Complementa `/validar-funil` (que cuida de links/params/diff estrutural) — aqui o foco é renderização e comportamento no mobile; não duplicar.

## Automático (Playwright)
Rode contra o preview local (`http://localhost:8080/<funil>/...`). Se o Playwright não estiver instalado, instale sob aprovação (`npx playwright install chromium webkit`).
- **Engines:** Chromium e WebKit (WebKit aproxima o Safari/iOS, base dos in-apps de iPhone).
- **Viewport mobile:** ex. iPhone (390×844) e Android (393×851); `isMobile`, touch.
- **Checar:**
  - Erros de JS no console (zero erros não tratados).
  - Botões/CTAs clicáveis e com alvo ≥44px; vídeos carregam/tocam; links e redirects levam ao destino certo (checkout correto por etapa).
  - **Params de URL preservados** entre etapas: `mcr` e UTMs chegam ao checkout. Abrir a página com `?mcr=TESTE&utm_source=x&...` e conferir que o href final mantém.
  - Sem overflow horizontal; sem layout shift grosseiro (estabilidade visual).
  - Navegação entre etapas (up1→up2→…→thankyou) sem quebra.
- **User-Agent dos in-apps:** pode-se simular o UA do FB/IG/TikTok como teste **complementar** — mas registre que **não reproduz fielmente** o navegador interno (webview com restrições próprias de autoplay, cookies, storage, abertura de links).

## Validação real (a fonte de verdade)
Os in-apps só se confirmam no aparelho. Use o `checklist-inapp.md` deste skill no iPhone e no Android, dentro de FB/IG/TikTok.

## Saída
Resumo curto: ✅/⚠️/❌ por item testado, com o que falhou e onde. Para mudança de baixo risco, só os itens afetados. Nada é publicado sem aprovação.
