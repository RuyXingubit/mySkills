#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

const SKILLS_DIR = path.join(__dirname, '.agent', 'skills');
const AGENTS_DIR = path.join(__dirname, '.agent', 'agents');

program
  .name('myskills')
  .description('CLI para gerenciar e instalar skills e agents do Antigravity')
  .version('1.0.14');

program
  .command('list')
  .description('Lista todas as skills disponíveis na biblioteca')
  .action(async () => {
    const skills = await fs.readdir(SKILLS_DIR);
    console.log(chalk.cyan.bold('\n🚀 Skills Disponíveis:\n'));
    skills.forEach(skill => {
      if (fs.statSync(path.join(SKILLS_DIR, skill)).isDirectory()) {
        console.log(`  - ${chalk.green(skill)}`);
      }
    });
    console.log('');
  });

program
  .command('list-agents')
  .description('Lista todos os agents disponíveis na biblioteca')
  .action(async () => {
    if (!await fs.pathExists(AGENTS_DIR)) {
      console.log(chalk.yellow('\n⚠️ Nanhum agent disponível ainda.\n'));
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
  .command('add')
  .description('Adiciona uma skill ou agent ao projeto atual')
  .argument('[name]', 'Nome da skill ou agent para adicionar')
  .option('-a, --all', 'Adiciona todas as skills disponíveis')
  .option('--agent', 'Indica que o alvo é um agent')
  .action(async (name, options) => {
    if (options.all) {
      const skills = (await fs.readdir(SKILLS_DIR)).filter(s =>
        fs.statSync(path.join(SKILLS_DIR, s)).isDirectory()
      );
      console.log(chalk.cyan(`\n📦 Instalando todas as ${skills.length} skills...\n`));

      for (const s of skills) {
        const sourceDir = path.join(SKILLS_DIR, s);
        const destDir = path.join(process.cwd(), '.claude', 'skills', s);

        try {
          await fs.ensureDir(path.dirname(destDir));
          await fs.copy(sourceDir, destDir);
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
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedAgent',
            message: 'Qual agent você deseja adicionar?',
            choices: agentNames
          }
        ]);
        name = answers.selectedAgent;
      }

      if (!agentNames.includes(name)) {
        console.error(chalk.red(`\n❌ Erro: Agent "${name}" não encontrado.\n`));
        return;
      }

      const sourceFile = path.join(AGENTS_DIR, `${name}.md`);
      const destFile = path.join(process.cwd(), '.claude', 'agents', `${name}.md`);

      try {
        await fs.ensureDir(path.dirname(destFile));
        await fs.copy(sourceFile, destFile);
        console.log(chalk.green(`\n✅ Agent "${name}" instalado com sucesso em .claude/agents/${name}.md!\n`));
      } catch (err) {
        console.error(chalk.red(`\n❌ Erro ao copiar agent: ${err.message}\n`));
      }
      return;
    }

    // Default: Skill
    const skills = (await fs.readdir(SKILLS_DIR)).filter(s =>
      fs.statSync(path.join(SKILLS_DIR, s)).isDirectory()
    );

    if (!name) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedSkill',
          message: 'Qual skill você deseja adicionar?',
          choices: skills
        }
      ]);
      name = answers.selectedSkill;
    }

    if (!skills.includes(name)) {
      console.error(chalk.red(`\n❌ Erro: Skill "${name}" não encontrada.\n`));
      return;
    }

    const sourceDir = path.join(SKILLS_DIR, name);
    const destDir = path.join(process.cwd(), '.claude', 'skills', name);

    try {
      await fs.ensureDir(path.dirname(destDir));
      await fs.copy(sourceDir, destDir);
      console.log(chalk.green(`\n✅ Skill "${name}" instalada com sucesso em .claude/skills/${name}!\n`));
    } catch (err) {
      console.error(chalk.red(`\n❌ Erro ao copiar skill: ${err.message}\n`));
    }
  });

program.parse();
