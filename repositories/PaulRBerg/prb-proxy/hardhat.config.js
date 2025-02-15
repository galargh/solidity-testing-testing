export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.23",
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 200
      }
    }
  },
  "solidityTest": {
    "fuzz": {
      "runs": 1000,
      "maxTestRejects": 1000000
    },
    "fsPermissions": {
      "read": [
        "./out-optimized"
      ]
    }
  }
};
