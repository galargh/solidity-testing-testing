#!/usr/bin/env bash

rm -rf repositories/sablier-labs/lockup || true
mkdir repositories
git clone --depth 1 --recurse-submodules https://github.com/sablier-labs/lockup.git repositories/sablier-labs/lockup

./init.sh sablier-labs/lockup repositories/sablier-labs/lockup

pushd repositories/sablier-labs/lockup
hardhat test solidity
popd
