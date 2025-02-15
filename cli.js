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
  .example('$0 update')
  .example('$0 report')
  .example('$0 build:hardhat')
  .example('$0 build:forge')
  .example('$0 test:hardhat')
  .example('$0 test:forge')
  .example('$0 clone --org foundry-rs --repo forge-std')
  .example('$0 init --org foundry-rs --repo forge-std')
  .example('$0 update --org foundry-rs --repo forge-std')
  .example('$0 report --org foundry-rs --repo forge-std')
  .example('$0 test:hardhat --org foundry-rs --repo forge-std')
  .example('$0 test:forge --org foundry-rs --repo forge-std');

if (argv.h) {
  console.log(argv.help());
  process.exit(0);
}

const repositories = JSON.parse(fs.readFileSync(path.join(__dirname, 'repositories.json'), 'utf8'));

const repositoriesToClone = argv.org !== undefined && argv.repo !== undefined ? repositories.filter((r) => r.org === argv.org && r.repo === argv.repo) : repositories;

if (argv._[0] === 'report') {
  console.log('| Repository | Forge Build | Forge Test | Hardhat Build | Hardhat Test |');
  console.log('| ---------- | ---------- | ------------- | ---------- | ------------ |');
}

for (const repository of repositoriesToClone) {
  const { org, repo, packageManager, hardhatConfig, env } = repository;
  const executable = packageManager === undefined || packageManager === 'npm' ? 'npx' : packageManager;

  switch (argv._[0]) {
    case 'clone':
      clone(org, repo);
      break;
    case 'init':
      init(org, repo, packageManager, hardhatConfig);
      break;
    case 'update':
      update(org, repo, executable);
      break;
    case 'report':
      report(org, repo, executable);
      break;
    case 'build:hardhat':
      run(org, repo, [executable, 'hardhat', 'compile'], env);
      break;
    case 'build:forge':
      run(org, repo, ['forge', 'build'], env);
      break;
    case 'test:hardhat':
      run(org, repo, [executable, 'hardhat', 'test', 'solidity'], env);
      break;
    case 'test:forge':
      run(org, repo, ['forge', 'test'], env);
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
  const { status } = spawnSync('git', ['clone', '--recurse-submodules', `git@github.com:${org}/${repo}.git`, "--depth=1", dir], { stdio: 'inherit' });
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
  const jsHardhatConfig = `export default ${JSON.stringify(hardhatConfig ?? {}, null, 2)};\n`
    .replaceAll(/"blockGasLimit": (\d+)/g, (_, blockGasLimit) => `"blockGasLimit": BigInt(${blockGasLimit})`)
    .replaceAll(/"blockTimestamp": (\d+)/g, (_, blockTimestamp) => `"blockTimestamp": BigInt(${blockTimestamp})`);
  if (fs.existsSync(path.join(dir, 'hardhat.config.js')) || fs.existsSync(path.join(dir, 'hardhat.config.ts'))) {
    if (argv.force) {
      if (fs.existsSync(path.join(dir, 'hardhat.config.js'))) {
        fs.rmSync(path.join(dir, 'hardhat.config.js'));
      }
      if (fs.existsSync(path.join(dir, 'hardhat.config.ts'))) {
        fs.rmSync(path.join(dir, 'hardhat.config.ts'));
      }
    } else {
      console.log(`Skipping ${org}/${repo} as it already has a hardhat.config.js or hardhat.config.ts file. Use --force to override.`);
      return;
    }
  }
  const hardhatVersion = process.env.HARDHAT_VERSION ?? 'next';
  fs.writeFileSync(path.join(dir, 'hardhat.config.js'), jsHardhatConfig);
  switch (packageManager) {
    case 'bun':
      spawnSync('bun', ['install'], { cwd: dir, stdio: 'inherit' });
      spawnSync('bun', ['remove', 'hardhat'], { cwd: dir, stdio: 'inherit' });
      spawnSync('bun', ['add', '-d', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, stdio: 'inherit' });
      break;
    case 'yarn':
      spawnSync('yarn', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('yarn', ['remove', 'hardhat'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('yarn', ['add', '-D', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'npm':
      spawnSync('npm', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['remove', 'hardhat'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['install', '--save-dev', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'pnpm':
      spawnSync('pnpm', ['install'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('pnpm', ['remove', 'hardhat'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('pnpm', ['add', '-D', '-w', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    default:
      spawnSync('npm', ['init', '-y'], { cwd: dir, sdtio: 'inherit' });
      spawnSync('npm', ['install', '--save-dev', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
  }
  const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
  if (packageJson.type === undefined) {
    packageJson.type = 'module';
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify(packageJson, null, 2));
  }
  return;
}

function update(org, repo, packageManager) {
  console.log(`Updating Hardhat in ${org}/${repo}...`);
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} does not exist`);
  }
  const hardhatVersion = process.env.HARDHAT_VERSION ?? 'next';
  switch (packageManager) {
    case 'bun':
      spawnSync('bun', ['add', '-d', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, stdio: 'inherit' });
      break;
    case 'yarn':
      spawnSync('yarn', ['add', '-D', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'npm':
      spawnSync('npm', ['install', '--save-dev', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    case 'pnpm':
      spawnSync('pnpm', ['add', '-D', '-w', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
      break;
    default:
      spawnSync('npm', ['install', '--save-dev', `@ignored/hardhat-vnext@${hardhatVersion}`], { cwd: dir, sdtio: 'inherit' });
  }
  return;
}

function run(org, repo, command, env) {
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
  spawnSync(command[0] , command.slice(1), { cwd: dir, stdio: ['inherit', outputFD, errorFD], env: {
    ...process.env,
    ...(env ?? {})
  } });
  fs.closeSync(outputFD);
  fs.closeSync(errorFD);
}

function report(org, repo, executable) {
  const repository = `${org}/${repo}`;

  let forgeBuild;
  try {
    const forgeBuildOutput = read(org, repo, ['forge', 'build'], 'out');
    const forgeBuildSuccess = forgeBuildOutput.match(/Compiler run successful/);
    forgeBuild = forgeBuildSuccess ? '✅' : '❌';
  } catch (e) {
    console.warn(e);
    forgeBuild = '❓';
  }

  let forgeTest;
  try {
    const forgeTestOutput = read(org, repo, ['forge', 'test'], 'out');
    const forgeTestSummary = forgeTestOutput.match(/Ran (\d+) test suites in (\d+\.\d+)s \((\d+\.\d+)s CPU time\): (\d+) tests passed, (\d+) failed, (\d+) skipped \((\d+) total tests\)/);
    let forgeTestPassed = 0;
    let forgeTestFailed = 0;
    if (forgeTestSummary !== null) {
      forgeTestPassed = Number(forgeTestSummary[4]);
      forgeTestFailed = Number(forgeTestSummary[5]);
    }
    forgeTest = forgeTestPassed > 0 && forgeTestFailed === 0 ? `✅ (${forgeTestPassed})` : `❌ (${forgeTestPassed}/${forgeTestPassed+forgeTestFailed})`;
  } catch (e) {
    console.warn(e);
    forgeTest = '❓';
  }

  let hardhatBuild;
  try {
    const hardhatCompileOutput = read(org, repo, [executable, 'hardhat', 'compile'], 'out');
    const hardhatCompileSuccess = hardhatCompileOutput.match(/Compiled (\d+) Solidity files with solc (\d+\.\d+)/);
    hardhatBuild = hardhatCompileSuccess ? '✅' : '❌';
  } catch (e) {
    console.warn(e);
    hardhatBuild = '❓';
  }

  let hardhatTest;
  try {
    const hardhatTestOutput = read(org, repo, [executable, 'hardhat', 'test', 'solidity'], 'out');
    const hardhatTestSummary = hardhatTestOutput.match(/Run (Failed|Passed): (\d+) tests, (\d+) passed, (\d+) failed, (\d+) skipped \(duration: (\d+) ms\)/);
    let hardhatTestPassed = 0;
    let hardhatTestFailed = 0;
    if (hardhatTestSummary !== null) {
      hardhatTestPassed = Number(hardhatTestSummary[3]);
      hardhatTestFailed = Number(hardhatTestSummary[4]);
    }
    hardhatTest = hardhatTestPassed > 0 && hardhatTestFailed === 0 ? `✅ (${hardhatTestPassed})` : `❌ (${hardhatTestPassed}/${hardhatTestPassed+hardhatTestFailed})`;
  } catch (e) {
    console.warn(e);
    hardhatTest = '❓';
  }

  console.log(`| ${repository} | ${forgeBuild} | ${forgeTest} | ${hardhatBuild} | ${hardhatTest} |`);
}

function read(org, repo, command, type) {
  const dir = path.join(__dirname, 'repositories', org, repo);
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory ${dir} does not exist`);
  }
  const file = path.join(dir, `${command.join('_')}.${type}`);
  if (!fs.existsSync(file)) {
    throw new Error(`File ${file} does not exist`);
  }
  return fs.readFileSync(file, 'utf8');
}
