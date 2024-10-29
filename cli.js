#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { spawnSync } = require('child_process');

const { argv } = yargs
  .usage('Usage: $0 <command> [options]')
  .option('org', {
    alias: 'o',
    describe: 'The name of the organization',
    type: 'string',
  })
  .option('repo', {
    alias: 'r',
    describe: 'The name of the repository',
    type: 'string',
  })
  .option('force', {
    alias: 'f',
    type: 'boolean',
    description: 'Force cloning by removing existing directories',
    default: false
  })
  .demandCommand(1)
  .help('h')
  .alias('h', 'help')
  .example('$0 clone')
  .example('$0 init')
  .example('$0 build:hardhat')
  .example('$0 build:forge')
  .example('$0 test:hardhat')
  .example('$0 test:forge')
  .example('$0 clone --org foundry-rs --repo forge-std')
  .example('$0 init --org foundry-rs --repo forge-std')
  .example('$0 test:hardhat --org foundry-rs --repo forge-std')
  .example('$0 test:forge --org foundry-rs --repo forge-std');

if (argv.h) {
  console.log(argv.help());
  process.exit(0);
}

const repositories = JSON.parse(fs.readFileSync(path.join(__dirname, 'repositories.json'), 'utf8'));

const repositoriesToClone = argv.org !== undefined && argv.repo !== undefined ? repositories.filter((r) => r.org === argv.org && r.repo === argv.repo) : repositories;

for (const repository of repositoriesToClone) {
  const { org, repo, packageManager, hardhatConfig } = repository;

  switch (argv._[0]) {
    case 'clone':
      clone(org, repo);
      break;
    case 'init':
      init(org, repo, packageManager, hardhatConfig);
      break;
    case 'build:hardhat':
      run(org, repo, packageManager, ['hardhat3', 'compile']);
      break;
    case 'build:forge':
      run(org, repo, packageManager, ['forge', 'build']);
      break;
    case 'test:hardhat':
      run(org, repo, packageManager, ['hardhat3', 'test:solidity']);
      break;
    case 'test:forge':
      run(org, repo, packageManager, ['forge', 'test']);
      break;
    default:
      throw new Error(`Invalid command: ${argv._[0]}`);
  }
}

function clone(org, repo) {
  console.log(`Cloning ${org}/${repo}...`);
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(path.dirname(dir))) {
    fs.mkdirSync(path.dirname(dir), { recursive: true });
  }
  if (fs.existsSync(dir)) {
    if (argv.force) {
      console.log(`Removing existing directory for ${org}/${repo} due to force flag...`);
      fs.rmSync(dir, { recursive: true, force: true });
    } else {
      console.log(`Skipping ${org}/${repo} as it already exists. Use --force to override.`);
      return;
    }
  }
  const { status } = spawnSync('git', ['clone', `git@github.com:${org}/${repo}.git`, "--depth=1", dir], { stdio: 'inherit' });
  if (status !== 0) {
    throw new Error(`Failed to clone ${org}/${repo}`);
  }
  fs.rmSync(path.join(dir, '.git'), { recursive: true, force: true });
  return;
}

function init(org, repo, packageManager, hardhatConfig) {
  console.log(`Initializing Hardhat in ${org}/${repo}...`);
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} does not exist`);
  }
  switch (packageManager) {
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
      spawnSync('npm', ['init', '-y'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['install', '--save-dev', '@ignored/hardhat-vnext@next'], { cwd: dir, sdtio: 'inherit' });
  }
  const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  if (packageJson.type === undefined) {
    packageJson.type = 'module';
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
  }
  const jsHardhatConfig = `export default ${JSON.stringify(hardhatConfig, null, 2)};\n`;
  if (!fs.existsSync(path.join(dir, 'hardhat.config.js'))) {
    fs.writeFileSync(path.join(dir, 'hardhat.config.js'), jsHardhatConfig);
  } else if (argv.force) {
    fs.rmSync(path.join(dir, 'hardhat.config.js'));
    fs.writeFileSync(path.join(dir, 'hardhat.config.js'), jsHardhatConfig);
  }
  return;
}

function run(org, repo, packageManager, command) {
  console.log(`Running ${command.join(' ')} in ${org}/${repo}...`);
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} does not exist`);
  }
  const outputFile = path.join(dir, `${command.join('_')}.out`);
  const errorFile = path.join(dir, `${command.join('_')}.err`);
  if (fs.existsSync(outputFile)) {
    if (argv.force) {
      fs.rmSync(outputFile);
    } else {
      console.log(`Skipping ${org}/${repo} as it already has a ${path.basename(outputFile)} file. Use --force to override.`);
      return;
    }
  }
  if (fs.existsSync(errorFile)) {
    if (argv.force) {
      fs.rmSync(errorFile);
    } else {
      console.log(`Skipping ${org}/${repo} as it already has a ${path.basename(errorFile)} file. Use --force to override.`);
      return;
    }
  }
  const outputFD = fs.openSync(outputFile, 'w');
  const errorFD = fs.openSync(errorFile, 'w');
  const executable = packageManager === undefined || packageManager === 'npm' ? 'npx' : packageManager;
  spawnSync(executable , ['hardhat3', 'compile'], { cwd: dir, stdio: ['inherit', outputFD, errorFD] });
  fs.closeSync(outputFD);
  fs.closeSync(errorFD);
}
