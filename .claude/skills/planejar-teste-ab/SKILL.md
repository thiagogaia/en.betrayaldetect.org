---
name: planejar-teste-ab
description: Planeja um teste A/B para uma página ou etapa do funil — hipótese, variantes, métrica primária, critérios de validação e tamanho de amostra. Use quando o usuário quiser "testar", "criar um A/B", "validar uma ideia" ou comparar variantes.
---

# Planejar teste A/B

Transforma uma ideia de melhoria em um teste bem desenhado e mensurável. **Não implementa nem altera páginas** — produz o plano.

## Passos
1. **Hipótese** no formato: "Se [mudança] em [página/elemento], então [métrica] melhora, porque [raciocínio apoiado em dado/evidência]." Puxe a evidência com `analytics-specialist`; se não houver, marque como hipótese fraca e diga que dado a fortaleceria.
2. **Variantes**: A (controle) e B (mudança). Uma variável por teste, salvo justificativa. Descreva exatamente o que muda (texto, layout, preço, ordem…).
3. **Métrica primária** (uma só): normalmente take-rate da etapa ou lucro por visitante do funil a partir dali. Métricas secundárias e guardrails (ex.: não derrubar a conversão das etapas seguintes).
4. **Tamanho de amostra e duração**: estime com a taxa-base atual (dos dados reais), efeito mínimo detectável e poder ~80%, α 0,05. Diga quantas sessões/vendas por variante e o tempo provável no volume atual. Se o volume for baixo demais, diga e sugira alternativa (teste sequencial, mudar só o que tem impacto grande esperado).
5. **Critério de decisão**: o que conta como vencedor, quando parar, como evitar parar cedo demais.
6. **Como rodar** no stack atual: o site é estático sem ferramenta de A/B nativa. Liste as opções reais (split no servidor/CDN, redirecionamento por parâmetro, ferramenta client-side) e o que cada uma exige — sem instalar nada sem aprovação.

## Formato
Plano em uma página: Hipótese · Variantes · Métrica primária + guardrails · Amostra/duração · Critério de decisão · Como medir (qual fonte de dado confirma) · Riscos. Classifique a hipótese por impacto esperado × esforço.

## Regras
Um teste por vez com objetivo claro. Priorize testes que mexem no lucro por visitante. Sem mudança enganosa. Nada vai ao ar sem autorização.
