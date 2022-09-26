const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {

    async function deployTokenFixture() {
        const Token = await ethers.getContractFactory("MyToken");
        const [owner, addr1, addr2] = await ethers.getSigners();
    
        const myToken = await upgrades.deployProxy(Token, { kind: 'uups' });
    
        await myToken.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { Token, myToken, owner, addr1, addr2 };
      }

      it("Should assign the total supply of tokens to the owner", async function () {
        const { myToken, owner } = await loadFixture(deployTokenFixture);
        const ownerBalance = await myToken.balanceOf(owner.address);
        console.log("Total supply %s", await myToken.totalSupply())
        expect(await myToken.totalSupply()).to.equal(ownerBalance);
      });

      it("Should transfer tokens between accounts", async function () {
        const { myToken, owner, addr1, addr2 } = await loadFixture(
          deployTokenFixture
        );
    
        // Transfer 50 tokens from owner to addr1
        await expect(
            myToken.transfer(addr1.address, 50)
        ).to.changeTokenBalances(myToken, [owner, addr1], [-50, 50]);
    
        // Transfer 50 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await expect(
            myToken.connect(addr1).transfer(addr2.address, 50)
        ).to.changeTokenBalances(myToken, [addr1, addr2], [-50, 50]);
      });

      it("Should be able to upgrade", async function () {
        const { myToken, owner, addr1, addr2 } = await loadFixture(
          deployTokenFixture
        );
        // before upgrade, version should be v1
        expect(await myToken.version()).to.equal("v1");
          
        // Upgrading
        const TokenV2 = await ethers.getContractFactory("MyTokenV2");
        const myTokenV2 = await upgrades.upgradeProxy(myToken.address, TokenV2);
        expect(await myToken.version()).to.equal("v2");
      });

});