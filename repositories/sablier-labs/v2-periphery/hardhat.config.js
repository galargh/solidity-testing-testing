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
      "@sablier/v2-core/=node_modules/@sablier/v2-core/",
      "forge-std/=node_modules/forge-std/",
      "solady/=node_modules/solady/"
    ],
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 10000
      }
    }
  },
  "solidityTest": {
    "blockTimestamp": BigInt(1714518000),
    "fsPermissions": {
      "read": [
        "./out-optimized",
        "package.json"
      ],
      "readWrite": [
        "./benchmark/results",
        "./cache"
      ]
    },
    "blockGasLimit": BigInt(9223372036854775807),
    "sender": "0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38",
    "fuzz": {
      "runs": 20,
      "maxTestRejects": 1000000
    }
  }
};
