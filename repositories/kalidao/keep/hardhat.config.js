export default {
  "paths": {
    "sources": [
      "contracts",
      "test"
    ]
  },
  "solidity": {
    "version": "0.8.18",
    "remappings": [
      "@std/=lib/forge-std/src/",
      "@solady/=lib/solady/",
      "ds-test/=lib/forge-std/lib/ds-test/src/",
      "forge-std/=lib/forge-std/src/"
    ]
  },
  "solidityTest": {
    "testFail": true
  }
};
