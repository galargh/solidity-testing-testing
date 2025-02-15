export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.23",
    "remappings": [
      "solady/=lib/solady/src/",
      "forge-std/=lib/forge-std/src/",
      "openzeppelin/=lib/openzeppelin-contracts/contracts/"
    ],
    "optimizer": {
      "enabled": true,
      "runs": 10000000
    },
    "viaIR": false
  },
  "solidityTest": {
    "fuzz": {
      "runs": 100
    },
    "fsPermissions": {
      "readWrite": [
        "./"
      ]
    },
    "invariant": {
      "runs": 256,
      "depth": 15
    }
  }
};
