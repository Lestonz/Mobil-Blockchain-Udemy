const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using 'node' you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    console.log("Deploying your contract...")
    console.log("Keep your contract address and you shoul paste in env.")

    const LestonzGame = await hre.ethers.getContractFactory("LestonzGame");
    const lestonzGame = await LestonzGame.deploy();

    await lestonzGame.deployed();

    console.log("Welcome to Lestonz Lz-DApp, your contract address: ", lestonzGame.address )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});