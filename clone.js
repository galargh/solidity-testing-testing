#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { spawnSync } = require('child_process');

const { argv } = yargs
  .usage('Usage: $0 <org> <repo> [options]')
  .option('force', {
    alias: 'f',
    type: 'boolean',
    description: 'Force cloning by removing existing directories',
    default: false
  })
  .alias('f', 'force')
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

console.log(`Cloning ${repositoriesToClone.length} repositories...`);

for (const { org, repo } of repositoriesToClone) {
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
      continue;
    }
  }
  console.log(`Cloning ${org}/${repo}...`);
  const { status } = spawnSync('git', ['clone', `git@github.com:${org}/${repo}.git`, "--depth=1", dir], { stdio: 'inherit' });
  if (status !== 0) {
    throw new Error(`Failed to clone ${org}/${repo}`);
  }
  fs.rmSync(path.join(dir, '.git'), { recursive: true, force: true });
}
