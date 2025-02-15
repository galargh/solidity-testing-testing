export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test",
    }
  },
  "solidity": {
    "version": "0.8.26",
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 1000000
      }
    }
  },
  "solidityTest": {
    "fuzz": {
      "runs": 256
    }
  }
};
