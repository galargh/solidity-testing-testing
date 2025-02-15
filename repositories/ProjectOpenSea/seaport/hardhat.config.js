export default {
  "paths": {
    "sources": "contracts",
    "tests": {
      "solidity": "test/foundry"
    }
  },
  "solidity": {
    "version": "0.8.24",
    "remappings": [
      "@rari-capital/solmate/=lib/solmate/",
      "ds-test/=lib/ds-test/src/",
      "forge-std/=lib/forge-std/src/",
      "murky/=lib/murky/src/",
      "@openzeppelin/=lib/openzeppelin-contracts/",
      "solarray/=lib/solarray/src/",
      "solady/=lib/solady/",
      "seaport-sol/=lib/seaport-sol/",
      "seaport-types/=lib/seaport-types/",
      "seaport-core/=lib/seaport-core/",
      "seaport/=contracts/"
    ],
    "settings": {
      "optimizer": {
        "runs": 4294967292
      }
    }
  },
  "solidityTest": {
    "fuzz": {
      "runs": 1000
    },
    "fsPermissions": {
      "read": [
        "./optimized-out",
        "./reference-out"
      ],
      "write": [
        "./call-metrics.txt",
        "./mutation-metrics.txt",
        "./assume-metrics.txt",
        "./fuzz_debug.json"
      ]
    }
  }
};
