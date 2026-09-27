import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';

import { getCatalog } from '../lib/catalog.js';
import {
  scanProject,
  uninstallProject,
  removeLocalItem,
  scanGlobal,
  uninstallGlobal
} from '../lib/cleaner.js';

describe('Catálogo Canônico e Remoção Cirúrgica', () => {
  const repoRoot = path.resolve();
  let tempDir;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'myskills-test-'));
  });

  afterEach(async () => {
    if (tempDir && existsSync(tempDir)) {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  });

  test('getCatalog deve carregar os componentes canônicos do pacote', async () => {
    const catalog = await getCatalog(repoRoot);

    assert.ok(Array.isArray(catalog.skills));
    assert.ok(catalog.skills.includes('brainstorming'));
    assert.ok(catalog.skills.includes('clean-code'));

    assert.ok(Array.isArray(catalog.agents));
    assert.ok(catalog.agents.includes('orchestrator.md'));

    assert.ok(Array.isArray(catalog.workflows));
    assert.ok(catalog.workflows.includes('brainstorm.md'));

    assert.deepEqual(catalog.rootFiles, ['AGENTS.md', 'GEMINI.md']);
  });

  test('scanProject e uninstallProject devem remover apenas itens oficiais e preservar itens do usuário', async () => {
    const catalog = await getCatalog(repoRoot);

    // Setup do projeto fake
    const agentDir = path.join(tempDir, '.agent');
    await fs.mkdir(path.join(agentDir, 'skills', 'brainstorming'), { recursive: true });
    await fs.writeFile(path.join(agentDir, 'skills', 'brainstorming', 'SKILL.md'), '# Brainstorming');

    await fs.mkdir(path.join(agentDir, 'skills', 'minha-skill-propria'), { recursive: true });
    await fs.writeFile(path.join(agentDir, 'skills', 'minha-skill-propria', 'SKILL.md'), '# Minha Skill');

    await fs.mkdir(path.join(agentDir, 'agents'), { recursive: true });
    await fs.writeFile(path.join(agentDir, 'agents', 'orchestrator.md'), '# Orchestrator');
    await fs.writeFile(path.join(agentDir, 'agents', 'meu-agente-proprio.md'), '# Meu Agente');

    await fs.mkdir(path.join(agentDir, 'workflows'), { recursive: true });
    await fs.writeFile(path.join(agentDir, 'workflows', 'brainstorm.md'), '# Workflow Brainstorm');
    await fs.writeFile(path.join(agentDir, 'workflows', 'meu-workflow-proprio.md'), '# Meu Workflow');

    await fs.writeFile(path.join(tempDir, 'AGENTS.md'), '# Rules');
    await fs.writeFile(path.join(tempDir, 'user-code.js'), 'console.log("hello");');

    // 1. Validar Scan
    const scan = await scanProject(tempDir, catalog);
    const toRemoveNames = scan.toRemove.map(i => i.name);
    const preservedNames = scan.preserved.map(i => i.name);

    assert.ok(toRemoveNames.includes('brainstorming'));
    assert.ok(toRemoveNames.includes('orchestrator.md'));
    assert.ok(toRemoveNames.includes('brainstorm.md'));
    assert.ok(toRemoveNames.includes('AGENTS.md'));

    assert.ok(preservedNames.includes('minha-skill-propria'));
    assert.ok(preservedNames.includes('meu-agente-proprio.md'));
    assert.ok(preservedNames.includes('meu-workflow-proprio.md'));

    // 2. Executar Desinstalação Cirúrgica
    const result = await uninstallProject(tempDir, catalog);
    assert.ok(result.removed.length > 0);

    // Itens oficiais devem ter sido removidos
    assert.ok(!existsSync(path.join(agentDir, 'skills', 'brainstorming')));
    assert.ok(!existsSync(path.join(agentDir, 'agents', 'orchestrator.md')));
    assert.ok(!existsSync(path.join(agentDir, 'workflows', 'brainstorm.md')));
    assert.ok(!existsSync(path.join(tempDir, 'AGENTS.md')));

    // Itens do usuário DEVEM continuar existindo
    assert.ok(existsSync(path.join(agentDir, 'skills', 'minha-skill-propria', 'SKILL.md')));
    assert.ok(existsSync(path.join(agentDir, 'agents', 'meu-agente-proprio.md')));
    assert.ok(existsSync(path.join(agentDir, 'workflows', 'meu-workflow-proprio.md')));
    assert.ok(existsSync(path.join(tempDir, 'user-code.js')));
  });

  test('removeLocalItem deve remover pontualmente skill ou agent', async () => {
    const catalog = await getCatalog(repoRoot);
    const agentDir = path.join(tempDir, '.agent');

    await fs.mkdir(path.join(agentDir, 'skills', 'clean-code'), { recursive: true });
    await fs.writeFile(path.join(agentDir, 'skills', 'clean-code', 'SKILL.md'), '# Clean Code');

    // Remoção bem sucedida
    const res = await removeLocalItem(tempDir, 'skill', 'clean-code', catalog);
    assert.equal(res.success, true);
    assert.ok(!existsSync(path.join(agentDir, 'skills', 'clean-code')));

    // Remoção de item inexistente
    const resNotFound = await removeLocalItem(tempDir, 'skill', 'inexistente', catalog);
    assert.equal(resNotFound.success, false);
    assert.equal(resNotFound.reason, 'not_found');
  });

  test('uninstallGlobal deve remover o plugin e apenas os workflows oficiais do myskills', async () => {
    const catalog = await getCatalog(repoRoot);

    const fakeHome = path.join(tempDir, 'home');
    const fakePlugin = path.join(fakeHome, '.gemini', 'config', 'plugins', 'myskills');
    const fakeWorkflows = path.join(fakeHome, '.gemini', 'antigravity', 'global_workflows');

    await fs.mkdir(fakePlugin, { recursive: true });
    await fs.writeFile(path.join(fakePlugin, 'plugin.json'), '{}');

    await fs.mkdir(fakeWorkflows, { recursive: true });
    await fs.writeFile(path.join(fakeWorkflows, 'brainstorm.md'), '# Brainstorm');
    await fs.writeFile(path.join(fakeWorkflows, 'meu-workflow-pessoal.md'), '# Meu Workflow');

    const scan = await scanGlobal(catalog, fakeHome);
    assert.ok(scan.toRemove.some(i => i.name === 'myskills'));
    assert.ok(scan.toRemove.some(i => i.name === 'brainstorm.md'));
    assert.ok(scan.preserved.some(i => i.name === 'meu-workflow-pessoal.md'));

    await uninstallGlobal(catalog, { homeDir: fakeHome });

    // Plugin removido
    assert.ok(!existsSync(fakePlugin));
    // Workflow oficial removido
    assert.ok(!existsSync(path.join(fakeWorkflows, 'brainstorm.md')));
    // Workflow pessoal do usuário DEVE ser preservado
    assert.ok(existsSync(path.join(fakeWorkflows, 'meu-workflow-pessoal.md')));
  });
});
