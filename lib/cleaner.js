import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Remove um diretório se ele estiver completamente vazio.
 * @param {string} dir Caminho do diretório
 * @returns {Promise<boolean>} true se foi removido, false caso contrário
 */
export async function removeIfEmpty(dir) {
  if (!existsSync(dir)) return false;
  try {
    const entries = await fs.readdir(dir);
    if (entries.length === 0) {
      await fs.rmdir(dir);
      return true;
    }
  } catch {
    // Falha silenciosa
  }
  return false;
}

/**
 * Remove diretórios vazios recursivamente subindo até stopAtDir (inclusive).
 * @param {string} startDir Diretório inicial
 * @param {string} stopAtDir Diretório limite superior
 */
export async function cleanEmptyDirsUpwards(startDir, stopAtDir) {
  let current = path.resolve(startDir);
  const stop = path.resolve(stopAtDir);

  while (current.startsWith(stop) && current !== path.dirname(stop)) {
    const removed = await removeIfEmpty(current);
    if (!removed) break;
    current = path.dirname(current);
  }
}

/**
 * Mapeia o que será removido e o que será preservado no projeto local.
 * @param {string} projectRoot Raiz do projeto
 * @param {import('./catalog.js').getCatalog} catalog Catálogo oficial
 */
export async function scanProject(projectRoot, catalog) {
  const toRemove = [];
  const preserved = [];

  const agentDir = path.join(projectRoot, '.agent');

  // 1. Skills
  const localSkillsDir = path.join(agentDir, 'skills');
  if (existsSync(localSkillsDir)) {
    const existing = await fs.readdir(localSkillsDir);
    for (const item of existing) {
      const fullPath = path.join(localSkillsDir, item);
      if (catalog.skills.includes(item)) {
        toRemove.push({ type: 'skill', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'skill', name: item, path: fullPath });
      }
    }
  }

  // 2. Agents
  const localAgentsDir = path.join(agentDir, 'agents');
  if (existsSync(localAgentsDir)) {
    const existing = await fs.readdir(localAgentsDir);
    for (const item of existing) {
      const fullPath = path.join(localAgentsDir, item);
      if (catalog.agents.includes(item)) {
        toRemove.push({ type: 'agent', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'agent', name: item, path: fullPath });
      }
    }
  }

  // 3. Workflows
  const localWorkflowsDir = path.join(agentDir, 'workflows');
  if (existsSync(localWorkflowsDir)) {
    const existing = await fs.readdir(localWorkflowsDir);
    for (const item of existing) {
      const fullPath = path.join(localWorkflowsDir, item);
      if (catalog.workflows.includes(item)) {
        toRemove.push({ type: 'workflow', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'workflow', name: item, path: fullPath });
      }
    }
  }

  // 4. Scripts
  const localScriptsDir = path.join(agentDir, 'scripts');
  if (existsSync(localScriptsDir)) {
    const existing = await fs.readdir(localScriptsDir);
    for (const item of existing) {
      const fullPath = path.join(localScriptsDir, item);
      if (catalog.scripts.includes(item)) {
        toRemove.push({ type: 'script', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'script', name: item, path: fullPath });
      }
    }
  }

  // 5. Rules (.agent/rules)
  const localRulesDir = path.join(agentDir, 'rules');
  if (existsSync(localRulesDir)) {
    const existing = await fs.readdir(localRulesDir);
    for (const item of existing) {
      const fullPath = path.join(localRulesDir, item);
      if (catalog.rules.includes(item)) {
        toRemove.push({ type: 'rule', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'rule', name: item, path: fullPath });
      }
    }
  }

  // 6. Root rule files
  for (const rootFile of catalog.rootFiles) {
    const fullPath = path.join(projectRoot, rootFile);
    if (existsSync(fullPath)) {
      toRemove.push({ type: 'rootFile', name: rootFile, path: fullPath });
    }
  }

  return { toRemove, preserved };
}

/**
 * Executa a remoção cirúrgica dos arquivos no projeto local.
 * @param {string} projectRoot Raiz do projeto
 * @param {object} catalog Catálogo oficial
 * @param {object} options Opções ({ dryRun: boolean })
 */
export async function uninstallProject(projectRoot, catalog, options = {}) {
  const { toRemove, preserved } = await scanProject(projectRoot, catalog);

  if (options.dryRun) {
    return { toRemove, preserved };
  }

  const removed = [];
  for (const item of toRemove) {
    try {
      await fs.rm(item.path, { recursive: true, force: true });
      removed.push(item);
    } catch (err) {
      console.error(`Erro ao remover ${item.path}: ${err.message}`);
    }
  }

  // Limpeza de diretórios vazios em ordem inversa (folha -> raiz)
  const agentDir = path.join(projectRoot, '.agent');
  const subDirs = ['skills', 'agents', 'workflows', 'scripts', 'rules'];
  for (const sub of subDirs) {
    await removeIfEmpty(path.join(agentDir, sub));
  }
  await removeIfEmpty(agentDir);

  return { removed, preserved };
}

/**
 * Remove um item específico (skill ou agent) do projeto local.
 * @param {string} projectRoot Raiz do projeto
 * @param {'skill'|'agent'} type Tipo do item
 * @param {string} name Nome do item
 * @param {object} catalog Catálogo oficial
 */
export async function removeLocalItem(projectRoot, type, name, catalog) {
  const agentDir = path.join(projectRoot, '.agent');
  let targetPath;
  let normalizedName = name;

  if (type === 'agent') {
    if (!normalizedName.endsWith('.md')) normalizedName += '.md';
    targetPath = path.join(agentDir, 'agents', normalizedName);
  } else {
    targetPath = path.join(agentDir, 'skills', normalizedName);
  }

  if (!existsSync(targetPath)) {
    return { success: false, reason: 'not_found', path: targetPath };
  }

  await fs.rm(targetPath, { recursive: true, force: true });

  // Limpa pasta se ficou vazia
  const parentDir = path.dirname(targetPath);
  await removeIfEmpty(parentDir);
  await removeIfEmpty(agentDir);

  return { success: true, path: targetPath, name: normalizedName, type };
}

/**
 * Mapeia o que será removido e preservado no escopo global.
 * @param {object} catalog Catálogo oficial
 * @param {string} [homeDir] Diretório Home do usuário
 */
export async function scanGlobal(catalog, homeDir = (process.env.HOME || process.env.USERPROFILE || '')) {
  const pluginDir = path.join(homeDir, '.gemini', 'config', 'plugins', 'myskills');
  const globalWorkflowsDir = path.join(homeDir, '.gemini', 'antigravity', 'global_workflows');

  const toRemove = [];
  const preserved = [];

  if (existsSync(pluginDir)) {
    toRemove.push({ type: 'plugin', name: 'myskills', path: pluginDir });
  }

  if (existsSync(globalWorkflowsDir)) {
    const existing = await fs.readdir(globalWorkflowsDir);
    for (const item of existing) {
      const fullPath = path.join(globalWorkflowsDir, item);
      if (catalog.workflows.includes(item)) {
        toRemove.push({ type: 'workflow', name: item, path: fullPath });
      } else {
        preserved.push({ type: 'workflow', name: item, path: fullPath });
      }
    }
  }

  return { toRemove, preserved };
}

/**
 * Executa a desinstalação cirúrgica no escopo global.
 * @param {object} catalog Catálogo oficial
 * @param {object} options Opções ({ dryRun: boolean, homeDir?: string })
 */
export async function uninstallGlobal(catalog, options = {}) {
  const homeDir = options.homeDir || process.env.HOME || process.env.USERPROFILE || '';
  const { toRemove, preserved } = await scanGlobal(catalog, homeDir);

  if (options.dryRun) {
    return { toRemove, preserved };
  }

  const removed = [];
  for (const item of toRemove) {
    try {
      await fs.rm(item.path, { recursive: true, force: true });
      removed.push(item);
    } catch (err) {
      console.error(`Erro ao remover global ${item.path}: ${err.message}`);
    }
  }

  // Tenta remover pasta global_workflows apenas se ficou vazia
  const globalWorkflowsDir = path.join(homeDir, '.gemini', 'antigravity', 'global_workflows');
  await removeIfEmpty(globalWorkflowsDir);

  return { removed, preserved };
}
