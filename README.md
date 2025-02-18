# Solidity Testing Testing

This repository contains a collection of Solidity repositories that are used for testing the Solidity testing ecosystem.

## Latest Report

| Tool | Version |
| --- | --- |
| Solidity Testing Testing | 36acc4d6353f6ddb4f152ae7090ca16db5e4506c |
| Node.js) | 22.10.0 |
| Hardhat | 3.0.0-next.19 |
| Forge | v0.3.0 |

| Repository | SHA | forge build | forge test | hardhat compile | hardhat test |
| --- | --- | --- | --- | --- | --- |
| Elytro-eth/soul-wallet-contract | fc7cc084563ad1bda870df841b77caa9ee3a3661 | ✅ (176 in 189.02s) | ✅ (30 in 163.68s) | ✅ (40 in 13.63s) | ❌ (23/29 in 166.12s) |
| PaulRBerg/prb-math | 9f089908714c38f1e6a3d23f4b2b5a2c9b6c1d7a | ✅ (108 in 6.70s) | ✅ (314 in 9.38s) | ✅ (40 in 3.44s) | ✅ (314 in 12.60s) |
| PaulRBerg/prb-proxy | e45f5325d4b6003227a6c4bdaefac9453f89de2e | ✅ (72 in 6.48s) | ✅ (103 in 9.20s) | ✅ (5 in 3.71s) | ✅ (103 in 14.35s) |
| PaulRBerg/prb-test | cd07166bdd12c7c4a899cb53951653b53939a644 | ✅ (16 in 1.21s) | ✅ (192 in 56.00s) | ✅ (3 in 3.29s) | ✅ (192 in 63.83s) |
| ProjectOpenSea/seaport | 585b2ef8376dd979171522027bbdb048c2a4999c | ✅ (390 in 161.07s) | ❌ (47/91 in 159.78s) | ✅ (87 in 14.77s) | ❌ (0/0 in 55.22s) |
| Uniswap/UniswapX | 1fd0d1ccc0ec869131d6d1c4b9048d82fbc3d129 | ✅ (148 in 28.91s) | ✅ (428 in 37.17s) | ✅ (40 in 4.80s) | ❌ Exit Code 143 |
| Vectorized/solady | 5dd6f93498b8ebdc9d72194cfa680a90b738e1ad | ✅ (203 in 23.67s) | ✅ (1472 in 36.59s) | ✅ (102 in 6.53s) | ❌ Exit Code 143 |
| foundry-rs/forge-std | bf909b22fa55e244796dfa920c9639fdffa1c545 | ✅ (41 in 5.63s) | ✅ (164 in 89.12s) | ✅ (26 in 5.48s) | ❌ (162/168 in 67.01s) |
| kalidao/keep | 21213d34042b8a5a68afeb590f43018f08c81a58 | ✅ (54 in 9.08s) | ✅ (134 in 13.21s) | ✅ (0 in 3.00s) | ✅ (134 in 21.56s) |
| mds1/multicall | bc6fe175ae633bb2d5221cfa7ff9c15d10a932ce | ✅ (28 in 2.26s) | ✅ (45 in 2.49s) | ✅ (8 in 3.27s) | ✅ (45 in 6.38s) |
| pancakeswap/infinity-core | 397723e1a3b2ee8f03534a136d37bd4602f928a6 | ✅ (243 in 288.83s) | ❌ (826/828 in 274.17s) | ✅ (84 in 8.75s) | ❌ Exit Code 143 |
| pcaversaccio/createx | f089b5191492c8d3faa5b441cb7e8701fff3ac0a | ✅ (61 in 16.45s) | ✅ (129 in 20.80s) | ✅ (2 in 3.43s) | ❌ (112/131 in 40.27s) |
| sablier-labs/lockup | 95717b7b970a8000446febe0053fbb3afab2c418 | ✅ (243 in 93.98s) | ❌ (575/590 in 127.20s) | ✅ (20 in 5.58s) | ❌ Exit Code 143 |
| sablier-labs/v2-periphery | c3ea8d7f7aab4cb33c6b4517ba38d32ca35b1257 | ✅ (169 in 24.35s) | ❌ (77/87 in 24.08s) | ✅ (12 in 4.51s) | ❌ Exit Code 143 |
| transmissions11/solmate | c93f7716c9909175d45f6ef80a34a650e2d24e56 | ✅ (60 in 6.96s) | ✅ (568 in 23.94s) | ✅ (38 in 3.72s) | ❌ (565/570 in 51.67s) |

## Issues

Run `./issues/143.sh` to reproduce the `Process exited with code 143` error we saw in the GitHub Actions environment. Locally, the error shows up as `Process exited with code 137` i.e. out-of-memory. Please note that this is quite slow when running on an MacOS ARM machine.

## Docker

Run the following command to build all the Docker images:

```bash
for key in $(jq -r 'keys[]' repositories.json); do
  docker build --platform linux/x86_64 --build-arg HARDHAT_VERSION=3.0.0-next.19 --build-arg PROJECT_REPOSITORY=$key -t $key .
done
```

Run the following command to run all the tests:

```bash
for key in $(jq -r 'keys[]' repositories.json); do
  docker run --platform linux/x86_64 --rm --memory=16g --cpus=4 $key test solidity
  echo $?
done
```

## Native

Run the following command to clone and initialize all the repositories:

```bash
for key in $(jq -r 'keys[]' repositories.json); do
  # git clone --depth 1 --recurse-submodules https://github.com/$key.git repositories/$key
  ./init.sh $key repositories/$key
done
```

Run the following command to run all the tests:

```bash
for key in $(jq -r 'keys[]' repositories.json); do
  root="$(pwd)"
  pushd repositories/$key
  hardhat test solidity 2>&1 | tee "hardhat.test.out"
  popd
done

grep "✔ Run Passed" repositories/*/*/hardhat.test.out
grep "✘ Run Failed" repositories/*/*/hardhat.test.out
```
