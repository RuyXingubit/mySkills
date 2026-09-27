# v2 - Catálogo Canônico do Pacote e Retrocompatibilidade

## 1. Decisão Arquitetural: Catálogo Baseado no Pacote
Conforme definido, adotamos o **Catálogo Canônico do Pacote (Opção 3)**.

### Racional de Decisão:
* **Retrocompatibilidade Imediata**: Usuários que já executaram `init`, `add` ou `install-global` em versões anteriores não possuem nenhum manifesto de rastreamento local gravado.
* **Fonte Única da Verdade**: O pacote `@ruyfranca/myskills` contém a referência oficial de tudo o que ele próprio distribui.
* **Zero Poluição**: Não exige a criação de arquivos extras de metadados nos projetos dos usuários.

---

## 2. Estrutura do Catálogo Oficial

A CLI pode gerar em tempo de execução (ou via arquivo `catalog.json` gerado no build) a lista exata dos itens distribuídos:

```javascript
{
  skills: [
    "brainstorming",
    "clean-code",
    "senior-frontend",
    // ... lista completa de pastas em .agent/skills
  ],
  agents: [
    "orchestrator.md",
    "project-planner.md",
    "backend-specialist.md",
    // ... lista completa de arquivos em .agent/agents
  ],
  workflows: [
    "brainstorm.md",
    "debug.md",
    "plan.md",
    // ... lista completa de arquivos em .agent/workflows
  ],
  rootFiles: [
    "AGENTS.md",
    "GEMINI.md"
  ]
}
```

---

## 3. Algoritmo de Remoção Cirúrgica

### 3.1. Remoção Local (`myskills remove` ou `myskills uninstall --project`)
1. **Identificação**:
   - Compara o conteúdo existente no projeto (`.agent/skills`, `.agent/agents`, `.agent/workflows`) contra o Catálogo Canônico.
   - Identifica itens do `myskills` presentes no projeto.
   - Identifica itens **personalizados do usuário** (itens que não constam no catálogo).
2. **Execução Segura**:
   - Deleta **apenas** os diretórios de skills e arquivos de agents/workflows pertencentes ao catálogo.
   - Preserva 100% de quaisquer skills, agents ou workflows customizados pelo usuário.
   - Remove arquivos de regras raiz (`AGENTS.md`, `GEMINI.md`) caso correspondam ao kit.
   - Limpa pastas intermediárias (`.agent/skills`, `.agent/agents`, `.agent`) **apenas se estiverem vazias**. Se o usuário tiver arquivos próprios lá, a pasta é mantida.

### 3.2. Remoção Global (`myskills uninstall --global` ou `myskills uninstall-global`)
1. **Workflows Globais (`~/.gemini/antigravity/global_workflows`)**:
   - Itera sobre a lista oficial de `workflows` do catálogo.
   - Para cada item oficial que existir na pasta global, remove **apenas o arquivo `.md` correspondente**.
   - Se o usuário ou outro plugin tiver arquivos `.md` nessa pasta, eles são estritamente preservados.
2. **Plugin Global (`~/.gemini/config/plugins/myskills`)**:
   - Como este diretório é o namespace reservado e exclusivo do plugin `myskills`, o diretório é removido integralmente com segurança.

---

## 4. Design dos Comandos da CLI

1. **Remoção Pontual**:
   - `myskills remove [name] [--agent]`
     - Se `name` não for passado: exibe lista interativa para escolher qual remover (idêntico ao comportamento do `add`).
     - Remove apenas a skill ou agent especificado.

2. **Desinstalação Completa**:
   - `myskills uninstall`
     - Opções:
       - `-p, --project`: Remove cirurgicamente os componentes do projeto atual.
       - `-g, --global`: Remove o plugin e os workflows globais do `myskills`.
       - `-a, --all`: Executa a desinstalação tanto do projeto quanto do global.
       - `-y, --yes`: Pula o pedido de confirmação interativa.

---

## 5. Garantia de Qualidade e Testes Unitários
Para assegurar a blindagem contra regressão e integridade dos dados do usuário:
- Teste unitário simulando projeto com:
  1. Skills oficiais do `myskills`.
  2. Uma skill personalizada criada pelo usuário (`minha-skill-propria`).
- Executar a remoção cirúrgica e validar:
  - As skills oficiais foram removidas.
  - A skill personalizada do usuário permaneceu **100% intacta**.
