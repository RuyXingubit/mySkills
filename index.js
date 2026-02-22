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
  .option('-a, --all', 'Adiciona todas as skills disponíveis')
  .action(async (skillName, options) => {
    const skills = (await fs.readdir(SKILLS_DIR)).filter(s =>
      fs.statSync(path.join(SKILLS_DIR, s)).isDirectory()
    );

    if (options.all) {
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
