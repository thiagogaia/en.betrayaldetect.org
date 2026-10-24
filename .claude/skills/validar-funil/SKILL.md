---
name: validar-funil
description: Checagem técnica de regressão do funil upsmtz antes de publicar — links, parâmetros, scripts, eventos de rastreio, caminhos relativos, funcionamento mobile e comparação com o original. Use quando o usuário pedir para "validar", "conferir se não quebrou", "revisar antes de subir" ou após qualquer alteração aprovada.
---

# Validar funil

Varredura técnica que confere se o funil `upsmtz` está íntegro e se nada regrediu. Diagnóstico, **não corrige sozinho**.

## Checklist
1. **Links de checkout**: cada página aponta para o produto certo (Monetizze em up1–up3, PerfectPay em up4–up7)? Os IDs batem com o CLAUDE.md? O "No thanks" leva à PRÓXIMA etapa (e não está reescrito para virar compra)?
2. **Encadeamento**: up1→up2→…→up7→thankyou sem link quebrado. Rode uma checagem de todos os `href`/`src` relativos e liste os que não resolvem no disco.
3. **Scripts e caminhos**: todos os `src` carregam a partir do nível de pasta do `upsmtz`? (Atenção aos três que quebraram ao mover: `sentry-init.js`, `fc.js`, `_zs-guard.js`.) Nenhum 404.
4. **Rastreio**: Pixel/UTMify/CAPI presentes onde deveriam e com os IDs esperados; parâmetros (UTMs, fbc/fbp, visitorId) sendo repassados ao checkout. Não alterar, só verificar.
5. **Mobile**: sem overflow horizontal, alvos de toque ≥44px, inputs ≥16px, CTA e safe-area ok. Peça ao orquestrador para abrir no navegador local emulando mobile quando precisar confirmar visualmente.
6. **Regressão vs original**: `diff -rq site/ingles-gts/upsell site/upsmtz` para ver o que divergiu do original e confirmar que só mudou o que foi aprovado.
7. **Preço/oferta**: o preço exibido e o da copy batem com o produto real do checkout.

## Como verificar na prática
- Checagem de arquivos/links: `grep`/`find`/`diff` + `sqlite3` para conferir IDs contra o banco.
- Checagem visual/comportamental: navegador local em `http://localhost:8080/upsmtz/...`.

## Formato
Relatório de status por item: ✅ ok · ⚠️ atenção · ❌ quebrado — com `arquivo:linha` e o que fazer. No fim, um veredito: "pode publicar" ou "bloqueadores: …". Nada é corrigido nem publicado sem autorização do usuário.
