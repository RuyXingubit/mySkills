---
name: analyze-project
description: Forensic root cause analyzer for Antigravity sessions. Classifies scope deltas, rework patterns, root causes, hotspots, and auto-improves prompts/health.
tags: [analysis, diagnostics, meta, root-cause, project-health, session-review]
triggers: [ai, analyze project, analyze-project, diagnose sessions, engenharia de prompt, inteligência artificial, llm, project health, root cause, session analysis]
risk: safe
source: sickn33/antigravity-awesome-skills
date_added: "2026-03-15"
---
# /analyze-project — Root Cause Analyst Workflow

Analise sessões do Antigravity na pasta `brain/` e produza um relatório diagnóstico que explica não apenas **o que aconteceu**, mas **por que aconteceu**, **quem/o que causou** e **o que deve mudar na próxima vez**.

Este workflow não é um painel de métricas simples.
É um **workflow de análise forense** para sessões de codificação com IA.

---

## Primary Objective

Para cada sessão, determine:

1. O que mudou do pedido inicial para o trabalho final executado
2. Se a mudança foi causada principalmente por:
   - o usuário/especificação
   - o agente (IA)
   - a base de código/repositório
   - testes/verificação
   - complexidade legítima da tarefa
3. Se o prompt original era suficiente para o trabalho real
4. Quais subsistemas ou arquivos se correlacionam repetidamente com dificuldades
5. Quais mudanças concretas melhorariam mais as sessões futuras

---

## Core Principles

- Trate contagens `.resolved.N` como **sinais de intensidade de iteração**, não prova de falha
- Não rotule dificuldades apenas com base em contagens; classifique a **forma** do retrabalho
- Separe **escopo adicionado pelo humano** de **escopo necessário descoberto**
- Separe **erro do agente** de **atrito do repositório**
- Todo diagnóstico deve incluir **evidências**
- Toda recomendação deve mapear para um padrão observado específico
- Use níveis de confiança:
  - **Alto** = diretamente suportado por conteúdo de artefato ou timestamps
  - **Médio** = suportado por múltiplos sinais indiretos
  - **Baixo** = inferência plausível, não diretamente comprovada

---

## Step 1: Discovery — Encontrar Conversas Relevantes

1. Leia os resumos de conversas disponíveis no contexto do sistema.
2. Liste todos os subdiretórios em `~/.gemini/antigravity/brain/`
3. Construa um **Índice de Conversas** cruzando resumos com pastas UUID.
4. Registre para cada conversa:
   - `conversation_id`
   - `title`
   - `objective`
   - `created`
   - `last_modified`
5. Se o usuário forneceu uma palavra-chave/caminho, filtre por ela. Caso contrário, analise todas as conversas do workspace.

> Saída: lista indexada de conversas para analisar.

---

## Step 2: Artifact Extraction — Construir Evidências da Sessão

Para cada conversa, leia todos os artefatos estruturados existentes.

### 2a. Core Artifacts
- `task.md`
- `implementation_plan.md`
- `walkthrough.md`

### 2b. Metadata
- `*.metadata.json`

### 2c. Version Snapshots
- `task.md.resolved.0 ... N`
- `implementation_plan.md.resolved.0 ... N`
- `walkthrough.md.resolved.0 ... N`

### 2d. Additional Signals
- outros artefatos `.md`
- arquivos de relatório/avaliação
- timestamps entre atualizações de artefatos
- nomes de arquivos/pastas mencionados em planos e walkthroughs
- referências repetidas a subsistemas
- linguagem explícita de teste/validação
- não-objetivos ou restrições explícitas, se presentes

### 2e. Registrar Por Conversa

#### Presença / Ciclo de Vida
- `has_task`
- `has_plan`
- `has_walkthrough`
- `is_completed`
- `is_abandoned_candidate` = tem task mas sem walkthrough

#### Revisão / Volume de Mudanças
- `task_versions`
- `plan_versions`
- `walkthrough_versions`
- `extra_artifacts`

#### Escopo
- `task_items_initial`
- `task_items_final`
- `task_completed_pct`
- `scope_delta_raw`
- `scope_creep_pct_raw`

#### Tempo
- `created_at`
- `completed_at`
- `duration_minutes`

---

## Step 3: Prompt Sufficiency Analysis

Para cada conversa, avalie se o prompt inicial era suficiente para o trabalho real:

- **Altamente suficiente**: prompt inicial capturou escopo, arquivos-alvo, critérios de aceitação, restrições
- **Moderadamente suficiente**: prompt capturou objetivo principal mas estava incompleto em detalhes
- **Insuficiente**: prompt era vago, multidimensional demais, ou faltava contexto crítico

---

## Step 4: Scope Change Classification

### 4a. Human-Added Scope
Novo trabalho solicitado pelo usuário *após* o trabalho inicial começar.

### 4b. Necessary Discovered Scope
Trabalho que o agente *precisou* adicionar para completar a solicitação original corretamente.

### 4c. Agent-Introduced Scope
Trabalho que o agente adicionou que *não era necessário* e que o usuário não pediu.

---

## Step 5: Rework Shape Analysis

Não apenas conte revisões. Determine a **forma** do retrabalho da sessão.

Classifique cada conversa em um destes padrões:

- **Execução limpa** — pouca mudança, conclusão tranquila
- **Replano inicial depois conclusão estável** — plano mudou cedo, depois a execução convergiu
- **Expansão progressiva de escopo** — trabalho continuou crescendo ao longo da sessão
- **Churn de reabertura/refechamento** — ajustes repetidos de tarefas/retrocesso
- **Churn de verificação tardia** — implementação quase pronta, mas testes/validação causaram loops
- **Abandonado no meio** — trabalho iniciou mas não chegou ao walkthrough
- **Exploratório / sessão de pesquisa** — iterações são altas mas esperadas devido à descoberta do problema

---

## Step 6: Root Cause Analysis

Para cada sessão não-limpa, atribua:

### 6a. Causa Raiz Primária (escolha uma)

| Código | Categoria | Quando Aplicar |
|--------|-----------|----------------|
| `PROMPT_VAGUE` | Prompt vago/incompleto | Objetivo central não estava claro no início |
| `PROMPT_MISSING_FILES` | Prompt sem arquivos-alvo | Agente teve que descobrir onde fazer as mudanças |
| `PROMPT_MISSING_ACCEPTANCE` | Sem critérios de aceitação | Sem definição de "feito" levou a loops de verificação |
| `HUMAN_SCOPE_ADD` | Usuário adicionou escopo | Usuário fez novos pedidos após o início |
| `AGENT_HALLUCINATION` | Agente alucinador | Agente inventou requisitos não pedidos |
| `AGENT_OVER_ENGINEERING` | Agente superengenheirou | Agente construiu mais do que necessário |
| `REPO_FRICTION` | Atrito do repositório | Bugs, inconsistências ou código não documentado causaram dificuldades |
| `TASK_COMPLEXITY` | Complexidade legítima | O trabalho era genuinamente difícil, não por falha do prompt |
| `TESTING_DRIVEN` | Achados de testes | Implementação estava correta, mas testes revelaram retrabalho necessário |
| `UNKNOWN` | Desconhecido | Evidências insuficientes para determinar a causa |

---

## Step 7: Subsystem / File Clustering

Em todas as conversas, agrupe dificuldades repetidas por subsistema, pasta ou menções de arquivo.

Para cada cluster, calcule:
- número de conversas tocando nele
- média de revisões
- taxa de conclusão
- taxa de abandono
- causas raiz comuns

Saída: as principais zonas de atrito recorrentes.

---

## Step 8: Comparative Cohort Analysis

Compare estas coortes:
- sucessos de primeira tentativa vs sessões replanejadas
- concluídas vs abandonadas
- alta suficiência de prompt vs baixa suficiência
- escopo estreito vs alto crescimento de escopo

Para cada comparação, identifique:
- o que difere materialmente
- quais características do prompt se correlacionam com execução mais tranquila

---

## Step 9: Non-Obvious Findings

Gere 3–7 descobertas que não são simples reafirmações de métricas.

**Bons exemplos:**
- "A maioria dos replanos acontece em sessões com alvos de arquivo fracos, não critérios de aceitação fracos."
- "Crescimento de escopo geralmente começa após a primeira implementação bem-sucedida."

Cada descoberta deve incluir: observação, por que importa, evidências, confiança.

---

## Step 10: Report Generation

Crie `session_analysis_report.md` na pasta brain da conversa atual.

### Template do Relatório

```markdown
# 📊 Relatório de Análise de Sessão — [Nome do Projeto]

**Gerado**: [timestamp]
**Conversas Analisadas**: [N]
**Período**: [mais antiga] → [mais recente]

---

## Resumo Executivo
[2-4 frases: o mais importante que surgiu desta análise]

## Breakdown de Causa Raiz
[tabela com categorias e contagens]

## Análise de Suficiência do Prompt
[distribuição: alto/médio/baixo]

## Análise de Mudança de Escopo
[percentagem de mudança de escopo de cada tipo]

## Análise de Forma de Retrabalho
[distribuição de padrões de retrabalho]

## Zonas de Atrito (Friction Hotspots)
[top subsistemas/arquivos com dificuldades]

## Descobertas Não-Óbvias
[3-7 insights com evidências]

## Recomendações
[priorizadas por impacto esperado]

## Breakdown Por Conversa
[tabela detalhada por sessão]
```
