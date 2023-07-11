
const { expect } = require('chai');

describe("HelloLestonz", function() {
  it("Should return the default greeting", async function() {
    const HelloLestonz = await ethers.getContractFactory("HelloLestonz");
    const helloLestonz = await HelloLestonz.deploy();

    await helloLestonz.deployed();

    console.log("Welcome to Lestonz Lz-DApp, your contract address: " ,helloLestonz.address )
  });
});
    