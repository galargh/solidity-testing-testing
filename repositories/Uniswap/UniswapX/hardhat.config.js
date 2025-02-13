export default {
  "paths": {
    "sources": "src",
    "test": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.24",
    "remappings": [
      "ds-test/=lib/forge-std/lib/ds-test/src/",
      "forge-gas-snapshot/=lib/forge-gas-snapshot/src/",
      "forge-std/=lib/forge-std/src/",
      "openzeppelin-contracts/=lib/openzeppelin-contracts/contracts/",
      "permit2/=lib/permit2/",
      "solmate/=lib/solmate/",
      "solarray/=lib/solarray/src/"
    ]
  }
};
