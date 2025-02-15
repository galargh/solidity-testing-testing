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
      "@openzeppelin/contracts/=node_modules/@openzeppelin/contracts/",
      "@prb/math/=node_modules/@prb/math/",
      "forge-std/=node_modules/forge-std/",
      "solady/=node_modules/solady/",
      "solarray/=node_modules/solarray/"
    ],
    "settings": {
      "viaIR": true,
      "optimizer": {
        "enabled": true,
        "runs": 570
      }
    }
  },
  "solidityTest": {
    "fsPermissions": {
      "read": [
        "./out-optimized",
        "package.json"
      ],
      "readWrite": [
        "./benchmark/results",
        "./script/"
      ]
    },
    "blockGasLimit": BigInt(9223372036854776000),
    "fuzz": {
      "runs": 50,
      "maxTestRejects": 1000000
    },
    "invariant": {
      "runs": 20,
      "depth": 20,
      "failOnRevert": true,
      "callOverride": false
    },
    "sender": "0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38"
  }
};
