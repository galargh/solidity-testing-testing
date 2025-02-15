export default {
  "paths": {
    "sources": "src",
    "tests": {
      "solidity": "test"
    }
  },
  "solidity": {
    "version": "0.8.26",
    "settings": {
      "optimizer": {
        "enabled": true,
        "runs": 200
      }
    }
  },
  "solidityTest": {
    "fsPermissions": {
      "readWrite": [
        "./"
      ]
    },
    "rpcEndpoints": {
      "mainnet": "https://eth-mainnet.alchemyapi.io/v2/WV407BEiBmjNJfKo9Uo_55u0z0ITyCOX",
      "optimism_sepolia": "https://sepolia.optimism.io/",
      "arbitrum_one_sepolia": "https://sepolia-rollup.arbitrum.io/rpc/",
      "needs_undefined_env_var": "${UNDEFINED_RPC_URL_PLACEHOLDER}"
    }
  }
};
