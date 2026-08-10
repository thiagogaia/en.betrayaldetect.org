# SafelinkSpy-Afl — Funil front (afiliado)

Funil **estático** só com o front principal. Sem backend, sem n8n, sem pixels, sem Clarity, sem upsell, sem cloaker.

Projeto **separado** do produto principal — use este repositório para subir na sua hospedagem.

## Fluxo

```
index.html → step2 → step3 → step4 → step5 → step6 ($39)
                                              ↓ (sair / back)
                                        backredirect.html ($29)
```

## Checkouts PerfectPay

| Página | Preço | Link |
|--------|-------|------|
| `step6.html` | **$39** | https://go.centerpag.com/PPU38CQF0SI |
| `backredirect.html` | **$29** | https://go.centerpag.com/PPU38CQF0SJ |

## Como subir

1. Hospede a pasta inteira como site estático (Netlify, Vercel static, Cloudflare Pages, S3, Apache/Nginx, etc.).
2. Aponte o domínio para a raiz do projeto (`index.html` deve ser a home).
3. Não precisa de Node, API, banco nem variáveis de ambiente.

Exemplo local:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Abra `http://localhost:8080`.

## O que NÃO está neste pacote

- Upsells
- Famguard
- Cloaker
- E-mails de recuperação / n8n
- Microsoft Clarity
- UTMify / Meta Pixel / Google Ads do produto principal
- Analytics do backend principal
- Captura de leads para workflows alheios

## Estrutura

```
index.html
step2.html … step6.html
backredirect.html
js/          # block-back, urgency-bar, profile-photo (stub)
assets/      # imagens do funil
icons/
```

## Observações

- Foto de perfil WhatsApp usa stub local (avatares padrão) — sem chamada a API externa do produto principal.
- Query params da URL (UTMs do **seu** tráfego) são repassados entre steps e no redirect de checkout via `buildForwardUrl` / `navigateWithQuery`.
- Coloque **seus** pixels/tracking só se quiser — este pacote vem limpo de propósito.
