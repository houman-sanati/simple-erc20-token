import { expect } from "chai";
import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";

describe("Test ERC20 all available methods", function () {
  let myToken: MyToken;
  const totalSupply = 12000000;
  const initialOwnerBalance = 1e6;

  beforeEach(async () => {
    const MyToken = (await ethers.getContractFactory(
      "MyToken"
    )) as MyToken__factory;
    myToken = await MyToken.deploy(
      "Metaverse",
      "MTV",
      totalSupply,
      initialOwnerBalance
    );
    await myToken.deployed();
  });

  it("should show the balance of the owner", async function () {
    const [owner] = await ethers.getSigners();
    const balance = await myToken.balanceOf(owner.address);
    expect(balance.toNumber()).equals(initialOwnerBalance);
  });

  it("should show the total supply of token", async function () {
    const balance = await myToken.totalSupply();
    expect(balance.toNumber()).equals(totalSupply);
  });

  it("transfer some tokens to another address and get the balance of both addresses", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    myToken.transfer(addr1.address, 20);
    expect(await myToken.balanceOf(addr1.address)).equal(20);
    expect(await myToken.balanceOf(owner.address)).equal(
      initialOwnerBalance - 20
    );
  });

  it("approve `spender` by owner to transfer tokens to someone address", async () => {
    const [owner, spender, someone] = await ethers.getSigners();
    await myToken.connect(owner).approve(spender.address, 500);
    await myToken
      .connect(spender)
      .transferFrom(owner.address, someone.address, 400);
    const someoneBalance = await myToken.balanceOf(someone.address);
    expect(someoneBalance.toNumber()).equal(400);

    const allowance = await myToken.allowance(owner.address, spender.address);
    expect(allowance.toNumber()).equal(100);
  });
});
