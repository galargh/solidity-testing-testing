export default {
  "paths": {
    "sources": [
      "contracts",
      "test"
    ]
  },
  "solidity": {
    "version": "0.8.24",
    "remappings": [
      "@soulwallet-core/=lib/soulwallet-core/",
      "@source/=contracts/",
      "@arbitrum/nitro-contracts=lib/nitro-contracts/",
      "@solady=lib/solady/",
      "@solenv=lib/solenv/src/",
      "@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/",
      "@account-abstraction/=lib/account-abstraction/",
      "@crypto-lib/=lib/crypto-lib/src/",
      "forge-std/=lib/forge-std/src/",
      "@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts/"
    ],
    "settings": {
      "viaIR": true
    }
  },
  "solidityTest": {
    "testFail": true
  }
};
