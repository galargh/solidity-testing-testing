export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.28",
    "remappings": [
      "forge-std=test/utils/forge-std/"
    ],
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 1000
      }
    }
  },
  "solidityTest": {
    "blockGasLimit": 100000000,
    "fsPermissions": {
      "read": [
        "./test/data"
      ]
    },
    "fuzz": {
      "runs": 256
    }
  }
};
