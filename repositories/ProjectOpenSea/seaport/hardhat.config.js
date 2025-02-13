export default {
  "paths": {
    "sources": [
      "contracts",
      "test/foundry"
    ]
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
    ]
  }
};
