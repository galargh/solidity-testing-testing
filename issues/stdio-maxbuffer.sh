#!/usr/bin/env bash

rm -rf repositories/ProjectOpenSea/seaport || true
mkdir repositories
git clone --depth 1 --recurse-submodules https://github.com/ProjectOpenSea/seaport.git repositories/ProjectOpenSea/seaport

./init.sh ProjectOpenSea/seaport repositories/ProjectOpenSea/seaport

pushd repositories/sablier-labs/lockup
hardhat test solidity
popd
