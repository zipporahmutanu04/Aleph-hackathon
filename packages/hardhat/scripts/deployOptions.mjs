import { execa } from "execa";
import inquirer from "inquirer";

(async () => {
  // First prompt for selecting networks including an "others" option

  if (process.argv.includes("--network-options")) {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select networks to deploy:",
        name: "networks",
        choices: [
          { name: "Hardhat (local testnet)", value: "hardhat" },
          { name: "Optimism Sepolia", value: "optimismSepolia" },
          { name: "Base Sepolia", value: "baseSepolia" },
          { name: "Zora Sepolia", value: "zoraSepolia" },
          { name: "All Superchain Sepolias (currently only Optimism, Base & Zora supported)", value: "all" },
          { name: "Others (specify)", value: "others" }, // Add this line
        ],
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one option.";
          }
          return true;
        },
      },
    ]);

    let allNetworks = ["hardhat", "optimismSepolia", "baseSepolia", "zoraSepolia"];
    let selectedNetworks = answers.networks;

    // Check if "all the above" is selected
    if (selectedNetworks.includes("all")) {
      selectedNetworks = allNetworks;
    }

    // Check if "others" is selected and prompt for input
    if (selectedNetworks.includes("others")) {
      const { otherNetworks } = await inquirer.prompt([
        {
          type: "input",
          name: "otherNetworks",
          message:
            "Enter the network separated by commas (i.e. optimism, base). You can check network names in hardhat.config.js:",
        },
      ]);

      // Remove "others" from selected networks and add the user specified networks
      selectedNetworks = selectedNetworks
        .filter(n => n !== "others")
        .concat(otherNetworks.split(",").map(n => n.trim()));
    }

    // Deployment logic remains the same
    for (const network of selectedNetworks) {
      console.log(`Deploying to ${network}...`);
      await execa("hardhat", ["deploy", "--network", network], { stdio: "inherit" });
    }
  } else {
    // If "--network-options" was not provided, directly call "hardhat deploy" without network options
    await execa("hardhat", ["deploy"], { stdio: "inherit" });
  }
})();
