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
- `build:hardhat`: Builds the repository with Hardhat.
- `build:forge`: Builds the repository with Forge.
- `test:hardhat`: Tests the repository with Hardhat.
- `test:forge`: Tests the repository with Forge.

If you want to rerun any of the commands, you can use the `--force` flag.

## Analysis

| Repository | Forge Build | Forge Test | Hardhat Build | Hardhat Test |
| ---------- | ---------- | ------------- | ---------- | ------------ |
| foundry-rs/forge-std | ✅ | ✅ (164) | ✅ | ❌ (162/168) |
| transmissions11/solmate | ✅ | ✅ (568) | ✅ | ❌ (565/570) |
| Vectorized/solady | ✅ | ✅ (1472) | ✅ | ❌ (0/0) |
| Uniswap/UniswapX | ❌ | ❌ (0/0) | ✅ | ❌ (0/0) |
| sablier-labs/v2-core | ✅ | ❌ (575/590) | ✅ | ❌ (0/0) |
| sablier-labs/v2-periphery | ✅ | ❌ (0/0) | ✅ | ❌ (81/94) |
| PaulRBerg/prb-math | ✅ | ❌ (0/0) | ✅ | ✅ (314) |
| PaulRBerg/prb-proxy | ✅ | ❌ (0/0) | ✅ | ✅ (103) |
| PaulRBerg/prb-test | ✅ | ✅ (192) | ✅ | ✅ (192) |
| ProjectOpenSea/seaport | ❌ | ❌ (0/0) | ❌ | ❌ (0/0) |
| kalidao/keep | ✅ | ✅ (134) | ✅ | ❌ (0/0) |
| SoulWallet/soul-wallet-contract | ❌ | ❌ (0/0) | ❌ | ❌ (0/0) |
| pancakeswap/pancake-v4-core | ❌ | ❌ (731/827) | ❌ | ❌ (0/0) |
| pcaversaccio/createx | ✅ | ❌ (0/0) | ✅ | ❌ (112/131) |
| mds1/multicall | ❌ | ❌ (0/0) | ✅ | ✅ (45) |

### Issues

#### `foundry-rs/forge-std`

Some of the tests fail only in Hardhat (see the [full test output](repositories/foundry-rs/forge-std/npx_hardhat3_test_solidity.out)). Some of them because:
- we don't set rpc endpoint urls
- we don't enable test fail kind of tests
- we don't allow filesystem access

There are also fewer tests executed in Hardhat than in Forge. Likely because of the issues with the setup in some of the test contracts.

#### `kalidao/keep`

Some of the tests fail only in Hardhat (see the [full test output](repositories/kalidao/keep/npx_hardhat3_test_solidity.out)). All of them because we don't enable test fail kind of tests.

#### `pancakeswap/pancake-v4-core`

The compilation fails with the following error only in Hardhat:

```sh
CompilerError: Stack too deep. Try compiling with `--via-ir` (cli) or the equivalent `viaIR: true` (standard JSON) while enabling the optimizer. Otherwise, try removing local variables.
   --> src/pool-bin/BinPoolManager.sol:185:91:
    |
185 |             vault.accountAppBalanceDelta(key.currency0, key.currency1, hookDelta, address(key.hooks));
    |                                                                                           ^^^
```

#### `pcaversaccio/createx`

Some of the tests fail both in Hardhat and Forge (see the [full test output](repositories/pcaversaccio/createx/npx_hardhat3_test_solidity.out)). All of them because an unknown cheatcode with selector `0x9cd23835` was used. There's one extra setup failure in Hardhat.

#### `ProjectOpenSea/seaport`

The compilation fails with the following error in both Hardhat and Forge:

```sh
DeclarationError: Identifier not found or not unique.
  --> test/foundry/utils/BaseOrderTest.sol:56:5:
   |
56 |     Account offerer1;
   |     ^^^^^^^
```

#### `sablier-labs/v2-core`

The compilation fails with the following error only in Hardhat:

```sh
An unexpected error occurred:

RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded
    at Socket.onChildStdout (node:child_process:489:14)
    at Socket.emit (node:events:520:28)
    at addChunk (node:internal/streams/readable:559:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:510:3)
    at Readable.push (node:internal/streams/readable:390:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:191:23)
```

#### `sablier-labs/v2-periphery`

Some of the tests fail both in Hardhat and Forge (see the [full test output](repositories/sablier-labs/v2-periphery/npx_hardhat3_test_solidity.out)). Most of them because the mainnet rpc url is not set. There are some extra tests in Hardhat, and an extra failure because of a faulty cheatcode with selector `0x6229498b` (possibly a mismatch between forge-std and edr_solidity_tests).

#### `SoulWallet/soul-wallet-contract`

The compilation fails with the following error only in Hardhat:

```sh
CompilerError: Stack too deep. Try compiling with `--via-ir` (cli) or the equivalent `viaIR: true` (standard JSON) while enabling the optimizer. Otherwise, try removing local variables.
   --> contracts/modules/socialRecovery/base/BaseSocialRecovery.sol:319:84:
    |
319 |                         abi.encodeWithSelector(IERC1271.isValidSignature.selector, digest, dynamicData)
    |                                                                                    ^^^^^^
```

#### `transmissions11/solmate`

Some of the tests fail only in Hardhat (see the [full test output](repositories/transmissions11/solmate/npx_hardhat3_test_solidity.out)). All of them because we don't enable test fail kind of tests.

#### `Uniswap/UniswapX`

Some of the tests fail only in Hardhat (see the [full test output](repositories/Uniswap/UniswapX/npx_hardhat3_test_solidity.out)). All of them because we don't enable FFI.

#### `Vectorized/solady`

The compilation fails with the following error only in Hardhat:

```sh
CompilerError: Stack too deep. Try compiling with `--via-ir` (cli) or the equivalent `viaIR: true` (standard JSON) while enabling the optimizer. Otherwise, try removing local variables. When compiling inline assembly: Variable key_ is 2 slot(s) too deep inside the stack. Stack too deep. Try compiling with `--via-ir` (cli) or the equivalent `viaIR: true` (standard JSON) while enabling the optimizer. Otherwise, try removing local variables.
```

#### Other

It seems Forge is able to automatically resolve remappings from the `lib` directory, but in Hardhat, they need to be explicitly specified. What's interesting is that I think remappings in `lib` are resolved recursively, too (see [Uniswap/UniswapX](repositories/Uniswap/UniswapX)).

## Summary

It seems the vast majority of the Hardhat test failures could be fixed by providing a modified test runner configuration to the EDR. A version of enabling that kind of workflow is implemented in https://github.com/NomicFoundation/hardhat/pull/5837.
