# Solidity Testing Testing

This repository contains a collection of Solidity repositories that are used for testing the Solidity testing ecosystem.

## Repositories

- [foundry-rs/forge-std](repositories/foundry-rs/forge-std)
- [kalidao/keep](repositories/kalidao/keep)
- [mds1/multicall](repositories/mds1/multicall)
- [pancakeswap/pancake-v4-core](repositories/pancakeswap/pancake-v4-core)
- [PaulRBerg/prb-math](repositories/PaulRBerg/prb-math)
- [PaulRBerg/prb-proxy](repositories/PaulRBerg/prb-proxy)
- [PaulRBerg/prb-test](repositories/PaulRBerg/prb-test)
- [pcaversaccio/createx](repositories/pcaversaccio/createx)
- [ProjectOpenSea/seaport](repositories/ProjectOpenSea/seaport)
- [sablier-labs/v2-core](repositories/sablier-labs/v2-core)
- [sablier-labs/v2-periphery](repositories/sablier-labs/v2-periphery)
- [SoulWallet/soul-wallet-contract](repositories/SoulWallet/soul-wallet-contract)
- [transmissions11/solmate](repositories/transmissions11/solmate)
- [Uniswap/UniswapX](repositories/Uniswap/UniswapX)
- [Vectorized/solady](repositories/Vectorized/solady)

## Usage

The following commands are available:

- `clone`: Clones the repository.
- `init`: Initializes the repository.
- `update`: Updates the hardhat dependency and config.
- `build:hardhat`: Builds the repository with Hardhat.
- `build:forge`: Builds the repository with Forge.
- `test:hardhat`: Tests the repository with Hardhat.
- `test:forge`: Tests the repository with Forge.

If you want to rerun any of the commands, you can use the `--force` flag.

## Analysis

| Repository | Forge Build | Forge Test | Hardhat Build | Hardhat Test |
| ---------- | ---------- | ------------- | ---------- | ------------ |
| foundry-rs/forge-std | ✅ | ✅ (164) | ✅ | ❌ (162/168) |
| transmissions11/solmate | ✅ | ❌ (55/69) | ✅ | ❌ (565/570) |
| Vectorized/solady | ✅ | ❌ (1424/1472) | ✅ | ❌ (1680/1698) |
| Uniswap/UniswapX | ✅ | ✅ (428) | ✅ | ❌ (384/496) |
| sablier-labs/v2-core | ✅ | ❌ (575/590) | ✅ | ❌ (0/0) |
| sablier-labs/v2-periphery | ✅ | ❌ (77/87) | ✅ | ❌ (81/94) |
| PaulRBerg/prb-math | ✅ | ❌ (222/314) | ✅ | ✅ (314) |
| PaulRBerg/prb-proxy | ✅ | ✅ (103) | ✅ | ✅ (103) |
| PaulRBerg/prb-test | ✅ | ✅ (192) | ✅ | ✅ (192) |
| ProjectOpenSea/seaport | ✅ | ❌ (47/91) | ❌ | ❌ (0/0) |
| kalidao/keep | ✅ | ❌ (82/84) | ✅ | ❌ (0/0) |
| SoulWallet/soul-wallet-contract | ✅ | ❌ (28/29) | ✅ | ❌ (0/0) |
| pancakeswap/pancake-v4-core | ✅ | ❌ (707/802) | ✅ | ❌ (732/848) |
| pcaversaccio/createx | ❓ | ✅ (129) | ✅ | ❌ (112/131) |
| mds1/multicall | ✅ | ✅ (45) | ✅ | ✅ (45) |
