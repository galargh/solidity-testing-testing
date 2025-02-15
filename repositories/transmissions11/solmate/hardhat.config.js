export default {
  "paths": {
    "sources": "src"
  },
  "solidity": {
    "version": "0.8.15",
    "remappings": [
      "ds-test/=lib/ds-test/src/"
    ],
    "settings": {
      "optimizer": {
        "runs": 1000000
      }
    }
  },
  "solidityTest": {
    "testFail": true
  }
};
