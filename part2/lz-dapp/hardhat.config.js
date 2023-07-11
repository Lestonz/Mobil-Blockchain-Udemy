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
    //   accounts: [{"privateKey":"0xeac1c8a683260e2da8503c05e0f3ecfca24b9839eaf677bf7852d9ab1c977ad5","balance":"1000000000000000000000"},{"privateKey":"0x169b9b1294a855bd47835a41b6a542bdf62656b86d39603db448fb3275c08bfc","balance":"1000000000000000000000"},{"privateKey":"0x7d31815e2065f82963bc6db14c1d548df287e011f8e57caf5e6d45578a3a2b1c","balance":"1000000000000000000000"},{"privateKey":"0x244fcbf5c825617ddf1ed16c461f0e5fa833ff36853ce2a843502b1bbda162ae","balance":"1000000000000000000000"},{"privateKey":"0x3d66bf186a613c9140e6670c624031ebf3065e605437bb536cb929c849b7be27","balance":"1000000000000000000000"},{"privateKey":"0xf797523dd12659902a304bd0d321cb253af585689b306630dd91ea696bbad483","balance":"1000000000000000000000"},{"privateKey":"0x4bc05470708e3163525f84edf18b107a2813b8059b11fcdcd95bc5c746673788","balance":"1000000000000000000000"},{"privateKey":"0x0786ea220de55579ae0196398ea249897bb83e104da2d1f74c78098f044784f4","balance":"1000000000000000000000"},{"privateKey":"0x8d73146129fa185ef34a7d299e08e62f20f1118e5af48db09fa89aaa112028c7","balance":"1000000000000000000000"},{"privateKey":"0x31a6fe3d7805493ef3dd38bdca24d262c39e1e43c35aee2a5da3d83871370c36","balance":"1000000000000000000000"}]
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