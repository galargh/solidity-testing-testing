export default {
  "paths": {
    "sources": "src"
  },
  "solidity": {
    "version": "0.8.12",
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 10000000
      }
    },
    "remappings": [
      "forge-std/=lib/forge-std/src/"
    ]
  },
  "solidityTest": {
    "fuzz": {
      "runs": 1000
    }
  }
};
