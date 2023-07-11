/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");

const { HARDHAT_PORT } = process.env;
const DEFAULT_GAS_MULTIPLIER = 1;
module.exports = {
  solidity: "0.8.7",
  networks: {
    // localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    // hardhat: {
    //   accounts: [{"privateKey":"0xd387d47761b95f9e54a27d099a9ab0f41c203a664434e630edecb7605564e6f8","balance":"1000000000000000000000"},{"privateKey":"0xbedbc076165caec34ec7ec6c01b5b9b6d4ba3033eb164ef056d44ad2e64407d6","balance":"1000000000000000000000"},{"privateKey":"0xfec9c3d14ace16159cd6f8b730ae721300181836900e2217600fe8fe98fa8893","balance":"1000000000000000000000"},{"privateKey":"0xf7ef2e251a011620108fbfb1ea119348dbf75663fdb9cc7155cecf227c0912de","balance":"1000000000000000000000"},{"privateKey":"0x263a5b3afd81c4d8953e13eeba158b2c83f967f88ab886049339d8b5887bf353","balance":"1000000000000000000000"},{"privateKey":"0x6753ecccde4c51a51ed2a9aa5e029054a066e792b38008c8aa54daecaf9552bc","balance":"1000000000000000000000"},{"privateKey":"0x75cd07429f243104e184eb5c29aa618c4c7be3a83e87cb360c2262bf97257de4","balance":"1000000000000000000000"},{"privateKey":"0x3c536f2c8aa3c264380dc853f05dc189896daeee88b75ea5c6e7ff8a791ccc28","balance":"1000000000000000000000"},{"privateKey":"0x3b608e63d7759c1dd5c4b92ca4e81e085f28b75bf9190b91445b8e504374447c","balance":"1000000000000000000000"},{"privateKey":"0x9b584a670fa0642ec9482fedbf699cb4bbe21e20e75f745db0beb63f001e845a","balance":"1000000000000000000000"}]
    // },
    truffle: {
      url: 'http://localhost:24012/rpc',
      timeout: 60000,
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    }
  },
  etherscan: {
    apiKey: {
      // Ethereum
      goerli: process.env.BLOCK_EXPLORER_API_KEY,
      sepolia: process.env.BLOCK_EXPLORER_API_KEY,
      // mainnet: process.env.BLOCK_EXPLORER_API_KEY,
      bscTestnet: process.env.BLOCK_EXPLORER_API_KEY_BSC_TESTNET,
      // // Polygon
      // polygon: process.env.BLOCK_EXPLORER_API_KEY,
      // polygonMumbai: process.env.BLOCK_EXPLORER_API_KEY,
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};