---
name: uncle-bob-craft
description: Applies Uncle Bob's body of work for code review and writing. Use when reviewing code, refactoring, discussing architecture, evaluating SOLID principles, identifying code smells, or discussing Clean Architecture, Clean Code, The Clean Coder principles.
tags: [clean-code, clean-architecture, solid, code-review, craftsmanship, refactoring, code-smells]
triggers: [code review, clean code, SOLID, refactor, architecture review, code smell, dependency rule, uncle bob, clean architecture, single responsibility, open closed, liskov, interface segregation, dependency inversion]
risk: safe
source: sickn33/antigravity-awesome-skills
date_added: "2026-03-15"
---

# Uncle Bob Craft

Agrega os princípios dos livros do Uncle Bob para **revisão** e **escrita** de código: nomenclatura e funções (Clean Code), arquitetura e fronteiras (Clean Architecture), profissionalismo e estimativa (The Clean Coder), valores ágeis (Clean Agile), e uso vs abuso de design patterns.

> **Não substitui** o linter, formatter ou testes automatizados do projeto — esses permanecem responsabilidade das ferramentas do projeto.

---

## Quando Usar

- **Code review**: Aplique Dependency Rule, fronteiras, SOLID, e heurísticas de smell; sugira refactors concretos
- **Refactoring**: Decida o que extrair, onde desenhar fronteiras, e se um design pattern é justificado
- **Discussão de arquitetura**: Verifique camadas, direção de dependências, e separação de interesses
- **Design patterns**: Avalie uso correto vs cargo-cult ou overuse antes de introduzir um pattern
- **Estimativa e profissionalismo**: Aplique ideias do Clean Coder (dizer não, ritmo sustentável, estimativas de 3 pontos)

---

## Fontes por Livro

| Fonte | Foco |
|-------|------|
| **Clean Code** | Nomes, funções, comentários, formatação, testes, classes, smells |
| **Clean Architecture** | Dependency Rule, camadas, fronteiras, SOLID na arquitetura |
| **The Clean Coder** | Profissionalismo, estimativa, dizer não, ritmo sustentável |
| **Clean Agile** | Valores, Iron Cross, TDD, refactoring, pair programming |
| **Design Patterns** | Quando usar, abuso, cargo cult |

---

## Dependency Rule (Clean Architecture)

```
Externas → Frameworks/Drivers
           → Interface Adapters
             → Application Business Rules
               → Enterprise Business Rules (Entities)
```

- Dependências apontam **para dentro** (em direção às Entities)
- Camadas internas **não conhecem** camadas externas
- **Violação**: quando uma Entity importa algo de um Controller

---

## SOLID em Contexto

| Princípio | Verificação Rápida |
|-----------|-------------------|
| **SRP** | Esta classe/função tem mais de um motivo para mudar? |
| **OCP** | Posso adicionar comportamento sem modificar código existente? |
| **LSP** | Posso substituir por uma subclasse sem quebrar o sistema? |
| **ISP** | A interface tem métodos que os clientes não usam? |
| **DIP** | Módulos de alto nível dependem de abstrações, não de implementações? |

---

## Design Patterns: Uso vs Abuso

- **Use patterns** quando resolvem um problema de design real (variação de comportamento, ciclo de vida, cross-cutting)
- **Evite cargo-cult**: não adicione Factory/Strategy/Repository só porque o codebase "deveria" tê-los
- **Sinais de abuso**: nome do pattern em toda classe, camadas que só delegam sem lógica, patterns que tornam código simples mais difícil
- **Regra de ouro**: introduza um pattern na terceira duplicação ou segunda razão para mudar

---

## Code Smells e Heurísticas

| Smell | Significado |
|-------|-------------|
| **Rigidity** | Pequena mudança força muitas edições |
| **Fragility** | Mudanças quebram áreas não relacionadas |
| **Immobility** | Difícil de reusar em outro contexto |
| **Viscosity** | Fácil de hackear, difícil de fazer a coisa certa |
| **Needless Complexity** | Abstração especulativa ou não usada |
| **Needless Repetition** | DRY violado; mesma ideia em múltiplos lugares |
| **Opacity** | Código difícil de entender |

---

## Aplicação por Contexto

| Contexto | Aplicar |
|----------|---------|
| **Code review** | Dependency Rule e fronteiras; SOLID em contexto; listar smells; sugerir 1-2 refactors concretos (ex: extrair função, inverter dependência); verificar testes |
| **Escrevendo código** | Prefira funções pequenas e responsabilidade única; dependa para dentro (Clean Architecture); escreva testes primeiro quando fazendo TDD; evite patterns até duplicação ou variação justificar |
| **Refactoring** | Identifique um smell por vez; refatore em pequenos passos com testes verdes; melhore nomes e estrutura antes de adicionar comportamento |

---

## Ao Fazer Code Review

```
1. Dependency Rule está sendo respeitada?
2. SOLID violations óbvias?
3. Code smells presentes?
4. Nomes comunicam intenção?
5. Funções fazem uma coisa?
6. Testes presentes e significativos?
7. Design patterns justificados (ou desnecessários)?
```

**Formato de sugestão:**
```
Smell: [nome]
Local: [arquivo/função]
Refactor: [sugestão concreta]
Justificativa: [qual princípio ou heurística]
```

## Related Skills
- `clean-code` — regras práticas de código limpo
- `code-reviewer` — processo de code review
- `software-architecture` — padrões de arquitetura limpa e DDD
