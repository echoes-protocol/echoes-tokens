import { ethers, run } from "hardhat";

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  const args = [
    "0x29219dd400f2Bf60E5a23d13Be72B486D4038894", // underlying asset
    "0xD1288f01Ba458de8659694A1E7d239dD36f8fd75", // comptroller
    "0x4cDa66BB86323B46367e42b530e63A82C3404A79", // interest rate model
    "200000000000000", // The initial exchange rate, scaled by 1e18
    "Echoes USD Coin", // name
    "eUSDC", // symbol
    8, // decimals
  ];

  const contract = await ethers.deployContract("CErc20", args);

  await contract.deployed();

  console.log(`contract deployed to ${contract.address}`);

  await sleep(20000);

  await run("verify:verify", {
    address: contract.address,
    constructorArguments: args
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
