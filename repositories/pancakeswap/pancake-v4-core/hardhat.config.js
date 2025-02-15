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
    ],
    "settings": {
      "viaIR": true,
      "optimizer": {
        "runs": 25666
      }
    }
  },
  "solidityTest": {
    "testFail": true,
    "ffi": true,
    "fsPermissions": {
      "readWrite": [
        ".forge-snapshots/"
      ],
      "read": [
        "./foundry-out",
        "./script/config",
        "./test/pool-cl/bin",
        "./test/pool-bin/bin"
      ]
    },
    "blockGasLimit": 300000000,
    "fuzz": {
      "runs": 5
    }
  }
};
