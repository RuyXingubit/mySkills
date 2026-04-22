---
name: doc-coauthoring
description: "Structured workflow for collaborative document creation. Use when writing documentation, proposals, technical specs, decision docs, PRDs, design docs, RFCs, or any substantial writing task. Guides through Context Gathering, Refinement and Structure, and Reader Testing stages. / Testes e qualidade."
tags: [documentation, writing, co-authoring, prd, rfc, spec, proposal, design-doc]
triggers: [PRD, RFC, co-author, cobertura, create a spec, decision doc, design, design doc, docs, documentation, documentação, draft a proposal, especificação, experiência do usuário, garantia de qualidade, qa, readme, technical spec, testes, ui, ux, write a doc, write up]
risk: safe
source: sickn33/antigravity-awesome-skills
date_added: "2026-03-15"
---
# Doc Co-Authoring Workflow

Workflow estruturado para co-criação colaborativa de documentos. Atua como guia ativo, conduzindo o usuário por 3 etapas: **Coleta de Contexto**, **Refinamento & Estrutura** e **Teste com Leitor**.

---

## Quando Ativar

**Gatilhos:**
- Usuário menciona escrever documentação: "escreve uma doc", "cria um PRD", "preciso de uma spec"
- Tipos específicos: **PRD, design doc, decision doc, RFC, proposta técnica**
- Qualquer tarefa de escrita substancial

**Oferta inicial:**
Ofereça o workflow estruturado. Explique as 3 etapas:
1. **Coleta de Contexto**: usuário fornece todo o contexto enquanto você faz perguntas
2. **Refinamento & Estrutura**: construir cada seção iterativamente via brainstorming e edição
3. **Teste com Leitor**: testar o doc com um Claude "sem contexto" para encontrar pontos cegos

Se o usuário recusar, trabalhe de forma livre. Se aceitar, inicie o **Estágio 1**.

---

## Estágio 1: Coleta de Contexto

**Objetivo:** Fechar a lacuna entre o que o usuário sabe e o que você sabe.

### Coleta Ativa
Peça ao usuário que despeje tudo o que sabe sobre o tópico. Enquanto ele fala:
- Faça perguntas de acompanhamento sobre pontos que precisam de esclarecimento
- Identifique lacunas ou suposições
- Continue até ter contexto suficiente para guiar de forma inteligente

### Questões Típicas de Contexto
- **Propósito**: O que este documento alcança?
- **Audiência**: Quem vai ler? O que eles já sabem?
- **Escopo**: O que está dentro/fora do escopo?
- **Restrições**: Prazo, comprimento, formato, aprovadores?
- **Sucesso**: Como saber se o doc fez seu trabalho?

---

## Estágio 2: Refinamento & Estrutura

Trabalhe **uma seção por vez**:

### Passo 1: Perguntas Clarificadoras
Anuncie que vai trabalhar na seção [NOME DA SEÇÃO]. Faça 5-10 perguntas específicas sobre o que deve ser incluído.

### Passo 2: Brainstorming
Para a seção, faça brainstorming de 5-20 itens que poderiam ser incluídos. Numere cada um. Ofereça mais se o usuário quiser.

### Passo 3: Curação
Pergunte quais pontos manter, remover ou combinar:
- "Manter 1, 4, 7, 9"
- "Remover 3 (duplica o 1)"
- "Combinar 11 e 12"

Se o usuário der feedback livre ("ficou bom" ou "gostei de maioria, mas..."), extraia suas preferências e prossiga.

### Passo 4: Verificação de Lacunas
Baseado no que selecionou, pergunte se está faltando algo importante.

### Passo 5: Rascunho
Escreva o conteúdo da seção. Use `str_replace` para substituir o texto placeholder.

**Instrução para o usuário (inclua ao rascunhar a PRIMEIRA seção):**
*"Em vez de editar o doc diretamente, me diga o que mudar. Isso me ajuda a aprender seu estilo para as próximas seções. Por exemplo: 'Remove o bullet X - já coberto por Y' ou 'Deixa o terceiro parágrafo mais conciso'."*

### Passo 6: Refinamento Iterativo
Conforme o usuário dá feedback:
- Use `str_replace` para edits (nunca reimprima o doc inteiro)
- Continue até o usuário estar satisfeito com a seção
- Após 3+ iterações sem mudanças substanciais, pergunte se algo pode ser removido sem perder informação

**Repita para todas as seções.**

### Perto da Conclusão
Quando 80%+ das seções estiverem prontas:
1. Releia o documento inteiro e verifique: fluxo/consistência, redundância, "slop" genérico, frases sem peso
2. Forneça feedback final
3. Pergunte se está pronto para o Teste com Leitor

---

## Estágio 3: Teste com Leitor

**Objetivo:** Pegar pontos cegos antes que outras pessoas leiam.

### Abordagem de Teste
Analise o documento como se fosse um leitor **sem nenhum contexto da conversa**:

**Passo 1: Prever Perguntas do Leitor**
Liste 3-5 perguntas que um leitor novo faria ao ler o doc.

**Passo 2: Verificações Adicionais**
- O propósito/audiência fica claro nos primeiros parágrafos?
- Existem termos ou siglas não definidas?
- Alguma seção pressupõe conhecimento que o leitor não teria?
- O fluxo faz sentido sem saber da conversa que levou a isso?

**Passo 3: Relatório e Correção**
Para cada problema encontrado:
- Descreva o problema
- Sugira como corrigir
- Ofereça fazer a correção

---

## Revisão Final

- [ ] Propósito claro nos primeiros parágrafos?
- [ ] Audiência definida?
- [ ] Escopo explícito?
- [ ] Sem termos não definidos?
- [ ] Fluxo coerente entre seções?
- [ ] Cada frase carrega peso?

## Related Skills
- `writing-plans` — para planos de implementação técnica
- `documentation-templates` — templates e estrutura de documentação
- `brainstorming` — exploração criativa de ideias antes de escrever
