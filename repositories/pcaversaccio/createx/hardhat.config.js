export default {
  "paths": {
    "sources": "src",
    "test": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.23",
    "remappings": [
      "solady/=lib/solady/src/",
      "forge-std/=lib/forge-std/src/",
      "openzeppelin/=lib/openzeppelin-contracts/contracts/"
    ]
  }
};
