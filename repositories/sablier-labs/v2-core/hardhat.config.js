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
    ]
  }
};
