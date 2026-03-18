---
name: skill-developer
description: Guide for creating and managing skills in Antigravity/Claude Code. Use when creating new skills, understanding YAML frontmatter format, writing SKILL.md files, setting up trigger patterns, following the 500-line rule, or debugging skill activation issues.
tags: [skill-development, antigravity, claude-code, yaml, frontmatter, triggers, skill-creation]
triggers: [create a skill, new skill, skill template, skill frontmatter, SKILL.md, skill trigger, skill activation, 500-line rule, add skill to project]
risk: safe
source: sickn33/antigravity-awesome-skills
date_added: "2026-03-15"
---

# Skill Developer Guide

Guia completo para criar e gerenciar skills no Antigravity/Claude Code, seguindo as melhores práticas da Anthropic incluindo a regra das 500 linhas e o padrão de divulgação progressiva.

---

## Estrutura de uma Skill

```
.agent/skills/
└── minha-skill/
    ├── SKILL.md          ← arquivo principal (obrigatório, < 500 linhas)
    └── references/       ← detalhes opcionais referenciados pelo SKILL.md
        └── guia-avancado.md
```

---

## Template de SKILL.md

```markdown
---
name: minha-skill
description: Descrição breve incluindo palavras-chave que disparam esta skill.
  Mencione tópicos, tipos de arquivo e casos de uso. Seja explícito sobre termos gatilho.
tags: [tag1, tag2, tag3]
triggers: [frase gatilho 1, frase gatilho 2, keyword]
risk: safe
source: community
date_added: "2025-01-15"
---

# Nome da Skill

## Propósito
Para que esta skill serve.

## Quando Usar
Cenários específicos e condições.

## Informação Principal
A orientação real, documentação, padrões, exemplos.
```

---

## Regras de Ouro (Anthropic Best Practices)

| Regra | Detalhe |
|-------|---------|
| **< 500 linhas** | SKILL.md deve ter menos de 500 linhas — use arquivos de referência para detalhes |
| **Descrição com keywords** | Inclua TODOS os termos que disparam esta skill (max 1024 chars) |
| **Títulos claros** | Nomes em minúsculo com hífens, forma gerundiva preferida (verb + -ing) |
| **Exemplos reais** | Inclua exemplos de código reais, não genéricos |
| **Divulgação progressiva** | SKILL.md = visão geral; `references/` = profundidade |

---

## Campos do Frontmatter

```yaml
---
name: nome-da-skill           # obrigatório: identificador único
description: "texto..."       # obrigatório: inclui triggers e contexto
tags: [tag1, tag2]            # recomendado: para indexação e busca
triggers: [frase, keyword]    # recomendado: termos que ativam a skill
risk: safe                    # safe | caution | dangerous
source: community             # origem da skill
date_added: "2025-01-15"      # data de adição
---
```

---

## Como Criar uma Skill — Passo a Passo

### 1. Crie o arquivo
```bash
mkdir -p .agent/skills/minha-skill
touch .agent/skills/minha-skill/SKILL.md
```

### 2. Escreva o conteúdo
Siga o template acima. Foque em:
- **Propósito**: o que esta skill FAZ?
- **Quando usar**: condições específicas, não genéricas
- **Exemplos**: código real, comandos reais

### 3. Teste os gatilhos
Confirme que os `triggers` no frontmatter cobrem as frases que o usuário usaria naturalmente.

Exemplos de bons triggers:
```yaml
triggers: [create new component, add react component, novo componente react]
```

### 4. Adicione ao GEMINI.md ou arquivos de configuração
Para que o Antigravity indexe a skill, ela precisa estar no diretório `.agent/skills/` do projeto.

### 5. Iterate
- Teste com 3+ cenários reais antes de considerar pronto
- Refine os triggers baseado no uso real
- Adicione sections `references/` se ultrapassar 500 linhas

---

## Checklist de Qualidade

```
[ ] SKILL.md tem menos de 500 linhas?
[ ] Frontmatter tem `name` e `description`?
[ ] Description inclui palavras-chave que ativariam esta skill?
[ ] Triggers são naturais e cobrem variações de linguagem?
[ ] Há pelo menos um exemplo real no conteúdo?
[ ] A skill tem um propósito claro e delimitado?
[ ] Se > 300 linhas, há `references/` para detalhes?
```

---

## Divulgação Progressiva

Para skills complexas, divida o conteúdo:

```
SKILL.md (visão geral, < 500 linhas)
├── Propósito e quando usar
├── Conceitos chave com exemplos breves
└── Links para: [guia-avancado.md](./references/guia-avancado.md)

references/guia-avancado.md (detalhe técnico)
├── Tópico 1 aprofundado
├── Tópico 2 aprofundado
└── Edge cases e troubleshooting
```

## Related Skills
- `intelligent-routing` — como o Antigravity faz o roteamento automático de skills
- `clean-code` — boas práticas aplicadas à própria escrita de skills
- `brainstorming` — exploração antes de criar uma skill nova
