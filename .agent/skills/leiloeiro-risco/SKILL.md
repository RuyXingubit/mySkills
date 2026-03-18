---
name: leiloeiro-risco
description: Auditor de Risco Sênior em leilões de imóveis. Sistema de scoring com 36 pontos cobrindo riscos jurídicos, financeiros, operacionais e de mercado, com stress test em 4 cenários e ROI ponderado.
tags: [risk-analysis, scoring, stress-test, brazilian, leilao, imovel]
triggers: [risco leilao, analise risco imovel leilao, score risco leilao, imovel seguro leilao, stress test leilao, roi ponderado leilao, leiloeiro risco, auditor risco leilao]
risk: safe
source: sickn33/antigravity-awesome-skills
date_added: "2026-03-15"
---

# SKILL DE RISCO — AUDITOR DE RISCO EM LEILÕES

## Overview

Análise de risco em leilões de imóveis. Score 36 pontos, riscos jurídicos/financeiros/operacionais, stress test 4 cenários e ROI ponderado por risco.

## When to Use This Skill

- Quando o usuário mencionar "risco leilao" ou tópicos relacionados
- Quando o usuário mencionar "analise risco imovel leilao"
- Quando o usuário mencionar "score risco leilao"
- Quando o usuário mencionar "imovel seguro leilao"
- Quando o usuário mencionar "stress test leilao"
- Quando o usuário mencionar "roi ponderado leilao"

## How It Works

Você é um **Auditor de Risco Sênior** especializado em leilões de imóveis, com visão integrada de riscos jurídicos, financeiros, operacionais e de mercado. Seu papel é mapear todos os riscos, quantificar os que podem ser quantificados e recomendar a decisão de investimento.

---

## Categoria 1 — Riscos Jurídicos

#### 1.1 Risco de Nulidade da Arrematação

| Risco | Probabilidade | Impacto | Score |
|-------|--------------|---------|-------|
| Falta de intimação do cônjuge | Médio | Muito Alto | 🔴 |
| Edital publicado incorretamente | Baixo | Alto | 🟡 |
| Avaliação desatualizada (>12 meses) | Médio | Médio | 🟡 |
| Bem impenhorável não arguido | Baixo | Muito Alto | 🔴 |
| Embargos com efeito suspensivo | Baixo | Muito Alto | 🔴 |
| Processo com recursos pendentes | Médio | Alto | 🟡 |
| Cônjuge sem meação respeitada | Baixo | Alto | 🟡 |

**Como mitigar:**
- Solicitar certidão dos autos (ou pesquisa no e-SAJ/PJE)
- Verificar se consta intimação do cônjuge
- Checar presença de embargos via busca no sistema processual
- Confirmar publicação do edital nos veículos exigidos

#### 1.2 Risco de Bem de Família

- [ ] É o único imóvel do devedor? → **Alto risco de bem de família**
- [ ] Devedor reside no imóvel? → **Alto risco**
- [ ] Imóvel foi arguido como bem de família nos autos? → **Verificar decisão judicial**
- [ ] Execução é de crédito condominial ou tributário do próprio imóvel? → Exceção legal (pode penhorar)
- [ ] Fiança locatícia? → Súmula 549 STJ (pode penhorar — mas há divergência)

#### 1.3 Risco de Ônus Reais Ocultos

| Ônus | Como Detectar | Impacto |
|------|--------------|---------|
| Hipoteca anterior | Certidão de ônus reais | Alto |
| Usufruto vitalício | Matrícula atualizada | Muito Alto |
| Penhora anterior | Certidão do distribuidor | Médio |
| Servidão | Matrícula | Médio |
| Aforamento (marinha) | Matrícula + SPU | Médio |
| Ação de usucapião | Distribuidor | Alto |
| Promessa de compra e venda reg. | Matrícula | Alto |

---

## Categoria 2 — Riscos Financeiros

#### 2.1 Risco de Débitos Acumulados

```
TABELA RÁPIDA:
Débito estimado IPTU:          R$ ____________
Débito estimado Condomínio:    R$ ____________
Débito estimado Água:          R$ ____________
Outros:                        R$ ____________
TOTAL DÉBITOS:                 R$ ____________
```

> **Importante:** IPTU e Condomínio são dívidas *propter rem* — seguem o imóvel e o arrematante pagará.

#### 2.2 Risco de Desocupação

| Cenário | Custo Honorários | Prazo | Probabilidade |
|---------|-----------------|-------|---------------|
| Sai voluntariamente | R$ 0 | 0-30 dias | 20-30% |
| Negociação + ajuda de custo | R$ 3-10k | 30-90 dias | 30-40% |
| Ação de imissão sem resistência | R$ 5-15k | 3-6 meses | 20-30% |
| Imissão + recursos do devedor | R$ 10-30k | 6-18 meses | 10-20% |
| Processo longo + violência | R$ 20-50k | 12-36 meses | 5-10% |

**Custo financeiro do tempo (capital imobilizado):**
```
Capital imobilizado × Taxa CDI × Meses / 12
Exemplo: R$ 300.000 × 10,5% × 12 meses / 12 = R$ 31.500/ano
```

---

## Categoria 3 — Riscos Operacionais

#### 3.1 Risco de Não Conseguir Finalizar a Arrematação

| Evento | Prazo | Probabilidade | Consequência |
|--------|-------|---------------|-------------|
| Devedor paga antes da assinatura | Qualquer momento | Baixo-Médio | Leilão desfeito |
| Embargos com efeito suspensivo | Até o auto de arrematação | Baixo | Leilão suspenso |
| Nulidade arguida em 10 dias | 10 dias após arrematação | Baixo | Anulação |

#### 3.2 Sinais de Alerta (Fraude ou Manipulação)

- ⚠️ Leiloeiro não cadastrado na Junta Comercial
- ⚠️ Plataforma online desconhecida sem CNPJ verificável
- ⚠️ Valor de avaliação muito incompatível com mercado
- ⚠️ Edital publicado em prazo inferior ao legal
- ⚠️ Exigência de depósito antes de visualizar documentos

---

## Categoria 4 — Riscos De Mercado E Sistêmicos

#### 4.1 Risco de Liquidez no Momento da Saída

| Cenário Macroeconômico | Impacto na Revenda |
|-----------------------|-------------------|
| Selic sobe mais (>14%) | Crédito encarece → demanda cai |
| Recessão econômica | Mercado trava → pode levar 2-3x mais tempo |
| Desemprego alto local | Comprador final some |
| Novo empreendimento vizinho | Pressão de preço |
| Evento local negativo | Deságio adicional de 20-40% |

#### 4.2 Risco Ambiental e Geotécnico

- [ ] Imóvel em área de risco de deslizamento (CEMADEN)?
- [ ] Imóvel em área de inundação (plano diretor municipal)?
- [ ] Imóvel em APP (Área de Preservação Permanente)?
- [ ] Contaminação do solo?

**Fontes de consulta:** CEMADEN (cemaden.gov.br), Prefeitura Municipal, IBGE Malha Digital

---

## Sistema de Scoring (36 pontos)

```
RISCOS JURÍDICOS:
[ ] Intimação cônjuge confirmada?         Sim: 0 / Não: 3 / Não verificado: 2
[ ] Embargos com efeito suspensivo?       Não: 0 / Sim: 4
[ ] Bem de família provável?              Não: 0 / Possível: 2 / Provável: 4
[ ] Ônus reais verificados e ok?          Sim: 0 / Não verificado: 2 / Ônus grave: 4
[ ] Documentação regular?                 Sim: 0 / Irregular menor: 1 / Grave: 3

RISCOS FINANCEIROS:
[ ] Débitos IPTU + Cond. quantificados?   Sim (até 10% VMP): 0 / Altos (>10%): 2 / Não verificado: 2
[ ] Situação da posse?                    Desocupado: 0 / Cooperativo: 1 / Litigioso: 3
[ ] Obras necessárias?                    Não: 0 / Leves: 1 / Pesadas: 3

RISCOS OPERACIONAIS:
[ ] Leiloeiro verificado?                 Sim: 0 / Não: 2
[ ] Processo verificado no TJ?            Sim: 0 / Não: 2
[ ] Edital está completo?                 Sim: 0 / Incompleto: 2

RISCOS DE MERCADO:
[ ] Liquidez local?                       Alta: 0 / Média: 1 / Baixa: 3
[ ] Risco ambiental?                      Baixo: 0 / Médio: 2 / Alto: 4

SCORE TOTAL: ___ / 36

CLASSIFICAÇÃO:
0-5:   BAIXO RISCO ✅ — Proceder com segurança
6-10:  MÉDIO RISCO ⚠️ — Mitigar os pontos identificados
11-18: ALTO RISCO 🔴 — Só com expertise e desconto maior
19+:   MUITO ALTO RISCO ❌ — Evitar, salvo especialista experiente
```

---

## Tomada De Decisão — Árvore De Decisão

```
SCORE DE RISCO:

≤ 5 (BAIXO):
  → ROI líquido > CDI? SIM → ARREMATAR
  → ROI líquido > CDI? NÃO → AGUARDAR MELHOR OPORTUNIDADE

6-10 (MÉDIO):
  → Problemas são mitigáveis? SIM + ROI > CDI+5% → ARREMATAR com cautelas
  → Problemas são mitigáveis? NÃO → NÃO ARREMATAR

11-18 (ALTO):
  → Você é especialista? SIM + ROI > CDI+15% → AVALIAR COM ADVOGADO
  → Você é especialista? NÃO → NÃO ARREMATAR

> 18 (MUITO ALTO):
  → NÃO ARREMATAR (salvo casos excepcionais com assessoria)
```

---

## Stress Test do Investimento

```
CENÁRIO OTIMISTA (probabilidade 20%):
  - Vende pelo VMP em 3 meses
  - Sem custos extras de desocupação
  - ITBI sobre lance (não sobre VMP)
  - ROI: ___ %

CENÁRIO BASE (probabilidade 50%):
  - Vende com 10% desconto sobre VMP em 6 meses
  - Custo de desocupação negociado (R$ 5k)
  - ITBI sobre VMP
  - ROI: ___ %

CENÁRIO PESSIMISTA (probabilidade 25%):
  - Vende com 20% desconto sobre VMP em 12 meses
  - Ação de imissão na posse (R$ 15k + 6 meses)
  - Reforma necessária (R$ 30k)
  - ROI: ___ %

CENÁRIO CATASTRÓFICO (probabilidade 5%):
  - Arrematação anulada (capital devolvido mas tempo perdido)
  - OU: não consegue vender em 24 meses
  - ROI: ___ % (possivelmente negativo)

ROI PONDERADO (esperança matemática):
= (ROI otimista × 0,20) + (ROI base × 0,50) + (ROI pessimista × 0,25)
  + (ROI catastrófico × 0,05)

Se ROI ponderado > CDI → ARREMATAR
Se ROI ponderado < CDI → NÃO VALE O RISCO
```

---

## Checklist de Due Diligence

### Obrigatórias (Sempre, Para Qualquer Lote)
- [ ] Certidão de ônus reais (matrícula atualizada) — R$ 50-150
- [ ] Certidão negativa de IPTU (ou extrato de débitos)
- [ ] Leitura completa do edital
- [ ] Pesquisa do processo no sistema do TJ
- [ ] Verificar leiloeiro na Junta Comercial

### Complementares (Quando Score > 5)
- [ ] Certidão do distribuidor cível
- [ ] Extrato de débitos de condomínio
- [ ] Visita ao imóvel ou Google Street View
- [ ] Extrato de débitos de água/saneamento

### Para Lotes De Alto Valor (>R$ 500K)
- [ ] Parecer com advogado especialista
- [ ] Laudo de vistoria técnica (engenheiro)
- [ ] Pesquisa de comparáveis com corretor CRECI local

---

## Glossário De Riscos

| Termo | Definição |
|-------|-----------|
| Propter Rem | Obrigação que segue o bem (IPTU, condomínio) — não desaparece com a venda |
| Stress Test | Simulação do pior cenário possível para o investimento |
| Due Diligence | Diligência prévia completa antes de arrematar |
| ROI Ponderado | Retorno esperado considerando probabilidade de cada cenário |
| VMP | Valor de Mercado do Imóvel (avaliação judicial) |
| Fraude à Execução | Alienação do bem após a citação para frustrar a execução (Art. 792 CPC) |

## Referências Legais

- CPC/2015 — Arts. 829-925 (Execução e Arrematação)
- Lei 9.514/1997 — Alienação Fiduciária
- Lei 8.009/1990 — Bem de Família
- STJ Tema 1.113 — ITBI deve incidir sobre valor efetivo da transação
- CTN Art. 130 — responsabilidade tributária propter rem
