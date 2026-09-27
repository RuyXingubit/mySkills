import fs from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';

/**
 * Obtém o catálogo canônico de itens distribuídos pelo pacote myskills.
 * @param {string} sourceRoot Diretório raiz do pacote myskills
 * @returns {Promise<{ skills: string[], agents: string[], workflows: string[], scripts: string[], rules: string[], rootFiles: string[] }>}
 */
export async function getCatalog(sourceRoot) {
  const getDirFiles = async (dirPath, filterFn = () => true) => {
    if (!existsSync(dirPath)) return [];
    const entries = await fs.readdir(dirPath);
    return entries.filter(filterFn);
  };

  const skillsDir = path.join(sourceRoot, '.agent', 'skills');
  const agentsDir = path.join(sourceRoot, '.agent', 'agents');
  const workflowsDir = path.join(sourceRoot, '.agent', 'workflows');
  const scriptsDir = path.join(sourceRoot, '.agent', 'scripts');
  const rulesDir = path.join(sourceRoot, '.agent', 'rules');

  const skills = await getDirFiles(skillsDir, (e) => {
    try {
      return statSync(path.join(skillsDir, e)).isDirectory();
    } catch {
      return false;
    }
  });

  const agents = await getDirFiles(agentsDir, (e) => e.endsWith('.md'));
  const workflows = await getDirFiles(workflowsDir, (e) => e.endsWith('.md'));
  const scripts = await getDirFiles(scriptsDir);
  const rules = await getDirFiles(rulesDir);

  const rootFiles = ['AGENTS.md', 'GEMINI.md'];

  return {
    skills,
    agents,
    workflows,
    scripts,
    rules,
    rootFiles
  };
}
