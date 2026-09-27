# v1 - Catálogo de Recursos e Desinstalação Cirúrgica

## 1. Contexto e Motivação
Atualmente, o `myskills` permite inicializar (`init`), adicionar (`add`), atualizar (`update`) e instalar globalmente (`install-global`) skills, agents e workflows.
No entanto, não há um mecanismo de desinstalação. Para garantir segurança contra perda acidental de dados, a remoção **nunca deve ser cega** (ex: `rm -rf .agent` ou `rm -rf ~/.gemini/antigravity/global_workflows`).

**Regra de Ouro**:
O `myskills` deve remover **única e exclusivamente** os arquivos e diretórios que foram catalogados e fornecidos por este projeto, preservando integralmente qualquer skill, agent, workflow ou arquivo criado/modificado pelo usuário.

---

## 2. Estratégias de Catalogação (Como saber o que é nosso)

### Opção A: Catálogo Dinâmico Baseado no Pacote Fonte (Zero Overhead)
- **Como funciona**: A CLI inspeciona os arquivos presentes dentro de `__dirname` (`.agent/skills`, `.agent/agents`, `.agent/workflows`) no momento da execução.
- **Vantagens**: Não precisa manter listas estáticas manuais; se uma skill for adicionada ao repositório, o catálogo é atualizado automaticamente.
- **Desvantagens**: Se uma versão antiga instalou um arquivo que foi renomeado ou removido em versões futuras da biblioteca, a versão nova não saberia que aquele arquivo antigo pertencia ao `myskills`.

### Opção B: Manifesto Rastreador Local (`.myskills-manifest.json`)
- **Como funciona**: Durante `init` ou `add`, a CLI grava um arquivo de manifesto (ex: `.agent/.myskills-manifest.json`) registrando hashes, caminhos relativos e data de instalação de cada arquivo copiado.
- **Vantagens**:
  1. Rastreabilidade perfeita do que foi instalado pelo `myskills`.
  2. Permite detectar se o usuário **alterou** o conteúdo de uma skill (via hash checksum). Se alterou, o sistema pode alertar: *"A skill X foi modificada localmente. Deseja realmente remover?"*.
  3. Desinstalação 100% determinística.
- **Desvantagens**: Cria um arquivo de controle adicional dentro de `.agent/`.

### Opção C: Modelo Híbrido (Manifesto no Pacote + Fallback no Fonte)
- O próprio pacote `@ruyfranca/myskills` publica um `manifest.json` com a lista canônica de todas as skills, agents e workflows oficiais.
- A remoção compara o diretório do usuário contra esse inventário oficial.

---

## 3. Escopos de Remoção

### 3.1. Escopo Local do Projeto (`.agent/`)
- **Alvos potenciais**:
  - `.agent/skills/<skill-name>/`
  - `.agent/agents/<agent-name>.md`
  - `.agent/workflows/<workflow-name>.md`
  - Arquivos de regras na raiz: `AGENTS.md`, `GEMINI.md`
- **Comportamento Seguro**:
  - Somente remove as pastas/arquivos que constam no catálogo oficial do `myskills`.
  - Se houver `.agent/skills/minha-skill-customizada/`, ela permanece intacta.
  - Diretórios pais (`.agent/skills`, `.agent`) só são removidos se ficarem totalmente vazios após a remoção cirúrgica.
  - Para `AGENTS.md` e `GEMINI.md`: Verificar se foram customizados pelo usuário antes de deletar ou solicitar confirmação.

### 3.2. Escopo Global (`~/.gemini/...`)
- **Alvos potenciais**:
  - `~/.gemini/config/plugins/myskills` (Plugin dedicado: pode ser removido integralmente, pois pertence 100% ao myskills).
  - `~/.gemini/antigravity/global_workflows/<workflow>.md`: **Remoção cirúrgica obrigatória**. O usuário ou outros plugins podem ter workflows nesta pasta compartilhada. Apenas os arquivos `.md` listados no catálogo oficial de workflows do `myskills` são deletados.

---

## 4. Matriz de Segurança e Trade-offs

| Ação | Risco de Segurança | Mitigação Proposta |
| :--- | :--- | :--- |
| Deletar skill específica | Baixo | Confirmar se o nome existe no catálogo e se pertence ao projeto. |
| Deletar todas as skills | Médio/Alto | Listar todos os itens que serão removidos e exigir confirmação explícita (`--yes` para CI). |
| Deletar workflows globais | Alto | Deletar arquivo por arquivo baseado na lista do catálogo; nunca usar `rm -rf` no diretório pai. |
| Conteúdo modificado pelo usuário | Alto | Comparar checksum ou alertar se o arquivo tiver alterações em relação ao original. |
