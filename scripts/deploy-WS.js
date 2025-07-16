import { ethers, run } from "hardhat";

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  const args = [
    "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38", // underlying asset
    "0xD1288f01Ba458de8659694A1E7d239dD36f8fd75", // comptroller
    "0x170a6678155955DA4df9C2971140D6677917B80b", // interest rate model
    // formula initialExchangeRateMantissa = exchangeRate * 10^(underlyingDecimals + 18 - cTokenDecimals)
    "200000000000000000000000000", // The initial exchange rate, scaled by 1e18
    "Echoes Wrapped Sonic", // name
    "eWS", // symbol
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
