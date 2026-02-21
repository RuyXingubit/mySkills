#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const program = new Command();

const SKILLS_DIR = path.join(__dirname, 'docs');

program
  .name('myskills')
  .description('CLI para gerenciar e instalar skills do Antigravity')
  .version('1.0.0');

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
  .command('add')
  .description('Adiciona uma skill ao projeto atual')
  .argument('[skill]', 'Nome da skill para adicionar')
  .action(async (skillName) => {
    const skills = (await fs.readdir(SKILLS_DIR)).filter(s => 
      fs.statSync(path.join(SKILLS_DIR, s)).isDirectory()
    );

    if (!skillName) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedSkill',
          message: 'Qual skill você deseja adicionar?',
          choices: skills
        }
      ]);
      skillName = answers.selectedSkill;
    }

    if (!skills.includes(skillName)) {
      console.error(chalk.red(`\n❌ Erro: Skill "${skillName}" não encontrada.\n`));
      return;
    }

    const sourceDir = path.join(SKILLS_DIR, skillName);
    const destDir = path.join(process.cwd(), '.claude', 'skills', skillName);

    try {
      await fs.ensureDir(path.dirname(destDir));
      await fs.copy(sourceDir, destDir);
      console.log(chalk.green(`\n✅ Skill "${skillName}" instalada com sucesso em .claude/skills/${skillName}!\n`));
    } catch (err) {
      console.error(chalk.red(`\n❌ Erro ao copiar skill: ${err.message}\n`));
    }
  });

program.parse();
