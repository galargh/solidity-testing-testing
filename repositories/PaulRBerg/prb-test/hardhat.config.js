export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.26",
    "settings": {
      "optimizer": {
        "enabled": false
      }
    }
  },
  "solidityTest": {
    "fuzz": {
      "runs": 100,
      "maxTestRejects": 100000
    }
  }
};
