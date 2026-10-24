# Checklist — validação real nos navegadores internos (FB / IG / TikTok)

Testar no **iPhone** e no **Android**, abrindo o link de dentro de cada app (Facebook, Instagram, TikTok) — não no Safari/Chrome normal. A simulação por User-Agent no desktop não substitui isto.

Para cada app × aparelho, na página-alvo do funil:

- [ ] A página **abre e renderiza** completa (sem tela branca / corte).
- [ ] Sem **overflow horizontal**; nada cortado nas laterais; respeita o notch (safe-area).
- [ ] **Fontes legíveis** e botões com toque confortável (≥44px).
- [ ] **CTA principal** visível sem precisar rolar muito; clique responde.
- [ ] **Vídeo** (se houver) carrega e toca; sem exigir ação que o in-app bloqueia.
- [ ] **Animações/loading** terminam (não ficam presas no in-app).
- [ ] **Links e redirects** funcionam; o botão de compra abre o **checkout certo** da etapa.
- [ ] Ao sair para o checkout, os **parâmetros de URL** seguem juntos (mcr, utm_*). Conferir a URL final.
- [ ] **Navegação entre etapas** (up1→up2→…→thankyou) sem travar.
- [ ] **Pixel/rastreio** não quebra a página (sem erro visível).
- [ ] Voltar/fechar o in-app e reabrir não perde estado essencial.

Registrar: app + SO + modelo, o que falhou e um print do problema. Priorizar correção pelo impacto na conversão.
