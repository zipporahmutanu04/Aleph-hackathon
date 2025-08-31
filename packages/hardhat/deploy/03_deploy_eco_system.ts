import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployEcoSystem: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // First deploy EcoToken
  const ecoToken = await deploy("EcoToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`EcoToken deployed to ${ecoToken.address}`);

  // Then deploy WasteManagement with EcoToken address
  const wasteManagement = await deploy("WasteManagement", {
    from: deployer,
    args: [ecoToken.address],
    log: true,
    autoMine: true,
  });

  console.log(`WasteManagement deployed to ${wasteManagement.address}`);

  // For testing: Set up some demo data
  const ecoTokenContract = await hre.ethers.getContract("EcoToken", deployer);
  const wasteManagementContract = await hre.ethers.getContract("WasteManagement", deployer);

  // Add some demo collectors
  // Get signers for test accounts
  const signers = await hre.ethers.getSigners();
  
  const demoCollectors = [
    { address: signers[1].address, name: "John Collector" },
    { address: signers[2].address, name: "Alice Collector" },
  ];

  for (const collector of demoCollectors) {
    try {
      const registerCollectorTx = await wasteManagementContract.getFunction('registerCollector(address,string)').send(collector.address, collector.name);
      console.log(`Registered collector ${collector.name} at ${collector.address}`);
    } catch (error) {
      console.error(`Failed to register collector ${collector.name}:`, error);
    }
  }
};

export default deployEcoSystem;
deployEcoSystem.tags = ["EcoSystem"];
