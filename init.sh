#!/usr/bin/env bash

set -xeuo pipefail

root=$(dirname "$0")

config=$(jq -r '.["'$1'"]' "$root/repositories.json")
packageManager=$(jq -r '.packageManager // "npm"' <<< "$config")
hardhatConfig=$(jq -r '.hardhatConfig' <<< "$config")
ignore=$(jq -r '.ignore // ""' <<< "$config")

pushd $2
  if [ -n "$ignore" ]; then
    for path in $(jq -r 'keys' <<< "$ignore"); do
      rm -rf "${path}"
    done
  fi

  rm hardhat.config.* 2>/dev/null || true

  echo "export default $hardhatConfig;" > hardhat.config.js
  sed -i 's/blockGasLimit": "\([0-9]\+\)"/blockGasLimit": BigInt(\1)/' hardhat.config.js
  sed -i 's/blockTimestamp": "\([0-9]\+\)"/blockTimestamp": BigInt(\1)/' hardhat.config.js

  $packageManager install || npm init -y
  npm pkg set type="module"
popd
