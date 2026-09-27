# Desinstalação Cirúrgica e Gestão de Catálogo Canônico

Este documento consolida a especificação e comportamento oficial dos comandos de remoção e desinstalação do **mySkills** (`@ruyfranca/myskills`).

---

## 1. Princípio Fundamental de Segurança (Zero Data Loss)

> **Regra de Ouro**: O `myskills` remove **única e exclusivamente** os arquivos e diretórios que pertencem ao seu catálogo oficial de distribuição.
> Qualquer skill, agent, workflow ou arquivo criado pelo usuário ou por terceiros deve permanecer **100% intacto**.

---

## 2. Catálogo Canônico do Pacote

O catálogo oficial é extraído dinamicamente a partir dos diretórios de distribuição do pacote (`__dirname`):
- **Skills**: Diretórios presentes em `.agent/skills/`
- **Agents**: Arquivos `.md` presentes em `.agent/agents/`
- **Workflows**: Arquivos `.md` presentes em `.agent/workflows/`
- **Root Rules**: `AGENTS.md` e `GEMINI.md`

Dessa forma, garante-se **retrocompatibilidade imediata** para usuários que instalaram versões antigas sem a necessidade de manifestos locais.

---

## 3. Comandos Disponíveis

### 3.1. `myskills remove [name]`
Remove pontualmente uma skill ou agent do projeto local.
- **Uso**:
  ```bash
  myskills remove <nome-da-skill>
  myskills remove <nome-do-agent> --agent
  ```
- Se omitido o nome, abre prompt interativo para seleção.
- Apenas remove se o item estiver presente no projeto.

### 3.2. `myskills uninstall`
Executa a desinstalação cirúrgica de componentes.
- **Flags**:
  - `-p, --project`: Remove do projeto local apenas os arquivos e diretórios que constam no catálogo oficial do `myskills`. Diretórios como `.agent/skills`, `.agent/agents`, etc., só são removidos se ficarem vazios. Se houver arquivos do usuário, eles são preservados.
  - `-g, --global`: Remove o diretório do plugin (`~/.gemini/config/plugins/myskills`) e remove cirurgicamente de `~/.gemini/antigravity/global_workflows` apenas os arquivos `.md` que pertencem ao `myskills`. Workflows de terceiros ou pessoais são mantidos.
  - `-a, --all`: Executa tanto `--project` quanto `--global`.
  - `-y, --yes`: Confirmação automática sem prompt interativo.

---

## 4. Garantia de Qualidade

Todos os fluxos de remoção cirúrgica são cobertos por testes unitários automatizados executados via `node --test`, validando que dados customizados pelo usuário nunca são apagados.
