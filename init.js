#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { spawnSync } = require('child_process');

const { argv } = yargs
  .usage('Usage: $0 <org> <repo>')
  .help('h')
  .alias('h', 'help')
  .check((argv) => {
    if ((argv._.length === 0) || (argv._.length === 2)) {
      return true;
    }
    throw new Error('Either supply no arguments or exactly 2 arguments for <org> and <repo>');
  })
  .example('$0')
  .example('$0 foundry-rs forge-std')
  .example('$0 foundry-rs forge-std --force');

if (argv.h) {
  console.log(argv.help());
  process.exit(0);
}

const org = argv._[0];
const repo = argv._[1];

const repositories = JSON.parse(fs.readFileSync(path.join(__dirname, 'repositories.json'), 'utf8'));

const repositoriesToClone = org !== undefined && repo !== undefined ? repositories.filter((r) => r.org === org && r.repo === repo) : repositories;

console.log(`Initializing Hardhat in ${repositoriesToClone.length} repositories...`);

for (const repository of repositoriesToClone) {
  const { org, repo } = repository;
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} does not exist`);
  }
  console.log(`Initializing Hardhat in ${org}/${repo}...`);
  switch (repository.packageManager) {
    case 'bun':
      spawnSync('bun', ['install'], { cwd: dir, stdio: 'inherit' });
      spawnSync('bun', ['add', '-d', '@ignored/hardhat-vnext@next'], { cwd: dir, stdio: 'inherit' });
      break;
    case 'yarn':
      spawnSync('yarn', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('yarn', ['add', '-D', '@ignored/hardhat-vnext@next'], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'npm':
      spawnSync('npm', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['install', '--save-dev', '@ignored/hardhat-vnext@next'], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'pnpm':
      spawnSync('pnpm', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('pnpm', ['add', '-D', '@ignored/hardhat-vnext@next'], { cwd: dir, sdtio: 'inherit' });
      break;
    default:
      spawnSync('npm', ['init'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['install', '--save-dev', '@ignored/hardhat-vnext@next'], { cwd: dir, sdtio: 'inherit' });
  }
  const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  if (packageJson.type === undefined) {
    packageJson.type = 'module';
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
  }
  // Copy hardhat.config.js if it doesn't exist
  if (!fs.existsSync(path.join(dir, 'hardhat.config.js'))) {
    fs.copyFileSync(path.join(__dirname, 'hardhat.config.js'), path.join(dir, 'hardhat.config.js'));
  }
}
