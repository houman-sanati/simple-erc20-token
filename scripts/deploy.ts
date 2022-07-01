import { ethers, run } from "hardhat";

async function main() {
  await run("compile");

  const [addr1, addr2, addr3] = await ethers.getSigners();

  const MyToken = await ethers.getContractFactory("MyToken", addr2);
  const myToken = await MyToken.deploy("Metaverse", "MTV", 12000000, 1000000);
  await myToken.deployed();

  console.log("deployed at: ", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
