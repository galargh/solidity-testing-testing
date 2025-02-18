#/usr/bin/env bash

docker build --platform linux/x86_64 --build-arg HARDHAT_VERSION=3.0.0-next.19 --build-arg PROJECT_REPOSITORY=Vectorized/solady -t solady .
docker run --platform linux/x86_64 --rm --memory=16g --cpus=4 solady test solidity
echo $? # 137
