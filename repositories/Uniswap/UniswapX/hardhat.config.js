export default {
  "paths": {
    "sources": "src",
    "tests": {
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
    ],
    "settings": {
      "optimizer": {
        "runs": 1000000
      }
    }
  },
  "solidityTest": {
    "ffi": true,
    "fsPermissions": {
      "readWrite": [
        ".forge-snapshots/"
      ]
    }
  }
};
