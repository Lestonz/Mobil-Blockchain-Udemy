const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using 'node' you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    console.log("Deploying your first contract...")
    console.log("Keep your contract address and you shoul paste in env.")

    const BweterTicket = await hre.ethers.getContractFactory("BweterTicket");
    const bweterTicket = await BweterTicket.deploy();

    await bweterTicket.deployed();

    console.log("Your first contract address: ", bweterTicket.address )

    console.log("Deploying your second contract...")
    console.log("Keep your contract address and you shoul paste in env.")

    const BweetContract = await hre.ethers.getContractFactory("BweetContract");
    const bweetContract = await BweetContract.deploy();

    await bweetContract.deployed();

    console.log("Your second contract address: ", bweetContract.address )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});