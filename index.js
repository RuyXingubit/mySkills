#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

const SKILLS_DIR = path.join(__dirname, '.agent', 'skills');
const AGENTS_DIR = path.join(__dirname, '.agent', 'agents');

program
  .name('myskills')
  .description('CLI para gerenciar e instalar skills e agents do Antigravity')
  .version('1.0.34');

// Helper para copiar pastas recursivamente
async function copyRecursively(src, dest) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src);
    for (const entry of entries) {
      await copyRecursively(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    // Para simplificar, substitui se existir
    await fs.copyFile(src, dest);
  }
}

// Helper para substituir inquirer.prompt
async function promptList(message, choices) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log(chalk.bold(`\n${message}`));
  choices.forEach((c, idx) => console.log(`  ${chalk.cyan(idx + 1)}) ${c}`));
  
  while (true) {
    const answer = await rl.question(chalk.yellow('\nDigite o número da opção desejada: '));
    const num = parseInt(answer.trim(), 10);
    if (!isNaN(num) && num > 0 && num <= choices.length) {
      rl.close();
      return choices[num - 1];
    }
    console.log(chalk.red('❌ Opção inválida, tente novamente digitando o número correspondente.'));
  }
}

program
  .command('list')
  .description('Lista todas as skills disponíveis na biblioteca')
  .action(async () => {
    const skills = await fs.readdir(SKILLS_DIR);
    console.log(chalk.cyan.bold('\n🚀 Skills Disponíveis:\n'));
    skills.forEach(skill => {
      if (statSync(path.join(SKILLS_DIR, skill)).isDirectory()) {
        console.log(`  - ${chalk.green(skill)}`);
      }
    });
    console.log('');
  });

program
  .command('list-agents')
  .description('Lista todos os agents disponíveis na biblioteca')
  .action(async () => {
    if (!existsSync(AGENTS_DIR)) {
      console.log(chalk.yellow('\n⚠️ Nenhum agent disponível ainda.\n'));
      return;
    }
    const agents = await fs.readdir(AGENTS_DIR);
    console.log(chalk.magenta.bold('\n🤖 Agents Disponíveis:\n'));
    agents.forEach(agent => {
      if (agent.endsWith('.md')) {
        console.log(`  - ${chalk.green(agent.replace('.md', ''))}`);
      }
    });
    console.log('');
  });

program
  .command('init')
  .description('Inicializa o Antigravity no projeto atual (instala todas as skills, agents, workflows, rules e scripts)')
  .action(async () => {
    const destRoot = process.cwd();
    const sourceAgentDir = path.join(__dirname, '.agent');
    const destAgentDir = path.join(destRoot, '.agent');

    console.log(chalk.cyan('\n🚀 Inicializando kit completo do Antigravity...\n'));

    try {
      await fs.mkdir(destAgentDir, { recursive: true });
      await copyRecursively(sourceAgentDir, destAgentDir);
      console.log(chalk.green('  ✅ Pasta .agent instalada!'));

      const rootRuleFiles = ['AGENTS.md', 'GEMINI.md'];
      for (const ruleFile of rootRuleFiles) {
        const src = path.join(__dirname, ruleFile);
        const dest = path.join(destRoot, ruleFile);
        if (existsSync(src)) {
          await copyRecursively(src, dest);
          console.log(chalk.green(`  ✅ ${ruleFile} instalado na raiz!`));
        }
      }

      console.log(chalk.green.bold('\n✅ Kit inicializado com sucesso!\n'));
      console.log(chalk.gray('Inclui: skills, agents, workflows, rules, scripts e AGENTS.md na raiz.\n'));
    } catch (err) {
      console.error(chalk.red(`\n❌ Erro ao inicializar: ${err.message}\n`));
    }
  });

program
  .command('add')
  .description('Adiciona uma skill ou agent ao projeto atual')
  .argument('[name]', 'Nome da skill ou agent para adicionar')
  .option('-a, --all', 'Adiciona todas as skills disponíveis')
  .option('--agent', 'Indica que o alvo é um agent')
  .action(async (name, options) => {
    if (options.all) {
      const skills = (await fs.readdir(SKILLS_DIR)).filter(s =>
        statSync(path.join(SKILLS_DIR, s)).isDirectory()
      );
      console.log(chalk.cyan(`\n📦 Instalando todas as ${skills.length} skills...\n`));

      for (const s of skills) {
        const sourceDir = path.join(SKILLS_DIR, s);
        const destDir = path.join(process.cwd(), '.agent', 'skills', s);

        try {
          await fs.mkdir(path.dirname(destDir), { recursive: true });
          await copyRecursively(sourceDir, destDir);
          console.log(`  - ${chalk.green(s)}: ${chalk.gray('OK')}`);
        } catch (err) {
          console.error(chalk.red(`  - ${s}: Erro - ${err.message}`));
        }
      }

      console.log(chalk.green.bold('\n✅ Todas as skills foram instaladas com sucesso!\n'));
      return;
    }

    if (options.agent) {
      const agents = (await fs.readdir(AGENTS_DIR)).filter(a => a.endsWith('.md'));
      const agentNames = agents.map(a => a.replace('.md', ''));

      if (!name) {
        name = await promptList('📋 Qual agent você deseja adicionar?', agentNames);
      }

      if (!agentNames.includes(name)) {
        console.error(chalk.red(`\n❌ Erro: Agent "${name}" não encontrado.\n`));
        return;
      }

      const sourceFile = path.join(AGENTS_DIR, `${name}.md`);
      const destFile = path.join(process.cwd(), '.agent', 'agents', `${name}.md`);

      try {
        await fs.mkdir(path.dirname(destFile), { recursive: true });
        await copyRecursively(sourceFile, destFile);
        console.log(chalk.green(`\n✅ Agent "${name}" instalado com sucesso em .agent/agents/${name}.md!\n`));
      } catch (err) {
        console.error(chalk.red(`\n❌ Erro ao copiar agent: ${err.message}\n`));
      }
      return;
    }

    // Default: Skill
    const skills = (await fs.readdir(SKILLS_DIR)).filter(s =>
      statSync(path.join(SKILLS_DIR, s)).isDirectory()
    );

    if (!name) {
      name = await promptList('📋 Qual skill você deseja adicionar?', skills);
    }

    if (!skills.includes(name)) {
      console.error(chalk.red(`\n❌ Erro: Skill "${name}" não encontrada.\n`));
      return;
    }

    const sourceDir = path.join(SKILLS_DIR, name);
    const destDir = path.join(process.cwd(), '.agent', 'skills', name);

    try {
      await fs.mkdir(path.dirname(destDir), { recursive: true });
      await copyRecursively(sourceDir, destDir);
      console.log(chalk.green(`\n✅ Skill "${name}" instalada com sucesso em .agent/skills/${name}!\n`));
    } catch (err) {
      console.error(chalk.red(`\n❌ Erro ao copiar skill: ${err.message}\n`));
    }
  });

program
  .command('update')
  .description('Atualiza skills, agents, workflows e rules do projeto atual com a versão mais recente do kit')
  .option('-s, --skills', 'Atualiza apenas as skills')
  .option('-a, --agents', 'Atualiza apenas os agents')
  .option('-w, --workflows', 'Atualiza apenas os workflows')
  .option('-r, --rules', 'Atualiza apenas os arquivos de rules (AGENTS.md, GEMINI.md)')
  .action(async (options) => {
    const updateAll = !options.skills && !options.agents && !options.workflows && !options.rules;
    const destRoot = process.cwd();
    const srcRoot = __dirname;

    console.log(chalk.cyan('\n🔄 Atualizando kit do Antigravity...\n'));

    const tasks = [];

    if (updateAll || options.skills) {
      tasks.push({ label: 'skills', src: path.join(srcRoot, '.agent', 'skills'), dest: path.join(destRoot, '.agent', 'skills') });
    }
    if (updateAll || options.agents) {
      tasks.push({ label: 'agents', src: path.join(srcRoot, '.agent', 'agents'), dest: path.join(destRoot, '.agent', 'agents') });
    }
    if (updateAll || options.workflows) {
      tasks.push({ label: 'workflows', src: path.join(srcRoot, '.agent', 'workflows'), dest: path.join(destRoot, '.agent', 'workflows') });
    }

    for (const task of tasks) {
      if (!existsSync(task.src)) {
        console.log(chalk.yellow(`  ⚠️ Fonte não encontrada: ${task.label} (${task.src})`));
        continue;
      }
      try {
        await fs.mkdir(task.dest, { recursive: true });
        await copyRecursively(task.src, task.dest);
        console.log(chalk.green(`  ✅ ${task.label}: copiado`));
      } catch (err) {
        console.error(chalk.red(`  ❌ ${task.label}: erro na cópia — ${err.message}`));
        continue;
      }
    }

    if (destRoot !== srcRoot) {
      console.log(chalk.cyan('\n🔧 Corrigindo paths nos arquivos copiados...\n'));

      const srcPathEncoded = `file://${srcRoot}`;
      const destPathEncoded = `file://${destRoot}`;

      const dirsToFix = [
        path.join(destRoot, '.agent', 'workflows'),
        path.join(destRoot, '.agent', 'agents'),
        path.join(destRoot, '.agent', 'rules'),
        path.join(destRoot, '.agent', 'skills'),
      ];

      let fixedFiles = 0;

      for (const dir of dirsToFix) {
        if (!existsSync(dir)) continue;

        const walk = async (currentDir) => {
          const entries = await fs.readdir(currentDir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
              await walk(fullPath);
            } else if (['.md', '.txt', '.json'].includes(path.extname(entry.name))) {
              try {
                const content = await fs.readFile(fullPath, 'utf8');
                if (content.includes(srcPathEncoded)) {
                  const fixed = content.replaceAll(srcPathEncoded, destPathEncoded);
                  await fs.writeFile(fullPath, fixed, 'utf8');
                  fixedFiles++;
                }
              } catch {
                // ignorar
              }
            }
          }
        };

        await walk(dir);
      }

      if (fixedFiles > 0) {
        console.log(chalk.green(`  ✅ paths: ${fixedFiles} arquivo(s) corrigido(s)`));
      } else {
        console.log(chalk.gray('  ℹ️  paths: nenhuma substituição necessária'));
      }
    }

    if (updateAll || options.rules) {
      const rootRuleFiles = ['AGENTS.md', 'GEMINI.md'];
      for (const ruleFile of rootRuleFiles) {
        const src = path.join(srcRoot, ruleFile);
        const dest = path.join(destRoot, ruleFile);
        if (existsSync(src)) {
          try {
            await copyRecursively(src, dest);
            console.log(chalk.green(`  ✅ ${ruleFile}: atualizado na raiz`));
          } catch (err) {
            console.error(chalk.red(`  ❌ ${ruleFile}: ${err.message}`));
          }
        }
      }
    }

    if (updateAll || options.workflows) {
      const homeDir = process.env.HOME || process.env.USERPROFILE || '';
      const globalWorkflowsDir = path.join(homeDir, '.gemini', 'antigravity', 'global_workflows');
      const workflowsSrc = path.join(srcRoot, '.agent', 'workflows');

      if (existsSync(workflowsSrc)) {
        try {
          await fs.mkdir(globalWorkflowsDir, { recursive: true });
          const files = await fs.readdir(workflowsSrc);
          let copied = 0;
          for (const file of files) {
            if (file.endsWith('.md')) {
              await copyRecursively(path.join(workflowsSrc, file), path.join(globalWorkflowsDir, file));
              copied++;
            }
          }
          console.log(chalk.green(`  ✅ global_workflows: ${copied} workflow(s) instalados em ~/.gemini/antigravity/global_workflows/`));
        } catch (err) {
          console.log(chalk.yellow(`  ⚠️  global_workflows: ${err.message}`));
        }
      }
    }

    console.log(chalk.cyan.bold('\n✨ Atualização concluída!\n'));
  });

program
  .command('install-global')
  .description('Instala os workflows globalmente para aparecerem no / em qualquer projeto do Antigravity')
  .action(async () => {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    const globalWorkflowsDir = path.join(homeDir, '.gemini', 'antigravity', 'global_workflows');
    const workflowsSrc = path.join(__dirname, '.agent', 'workflows');

    console.log(chalk.cyan('\n🌐 Instalando workflows globalmente...\n'));

    try {
      await fs.mkdir(globalWorkflowsDir, { recursive: true });
      const files = await fs.readdir(workflowsSrc);
      let copied = 0;
      for (const file of files) {
        if (file.endsWith('.md')) {
          await copyRecursively(path.join(workflowsSrc, file), path.join(globalWorkflowsDir, file));
          copied++;
        }
      }
      console.log(chalk.green(`  ✅ ${copied} workflows instalados em ${globalWorkflowsDir}`));
      console.log(chalk.cyan.bold('\n✨ Feito! Reinicie o Antigravity e use / para ver os workflows.\n'));
    } catch (err) {
      console.error(chalk.red(`  ❌ Erro: ${err.message}`));
    }
  });

program.parse();
