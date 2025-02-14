export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.26",
    "remappings": [
      "ds-test/=lib/forge-std/lib/ds-test/src/",
      "forge-std/=lib/forge-std/src/",
      "@openzeppelin/=lib/openzeppelin-contracts/",
      "solmate/=lib/solmate/",
      "forge-gas-snapshot/=lib/forge-gas-snapshot/src/"
    ]
  },
  "solidityTest": {
    "testFail": true
  }
};
