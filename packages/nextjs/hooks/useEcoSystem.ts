import { useScaffoldContract, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { EcoSystemStats, Redemption, UserStats } from "~~/types/ecotrack";

export const useEcoSystem = () => {
  const { address } = useAccount();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [systemStats, setSystemStats] = useState<EcoSystemStats | null>(null);

  // Contract instances
  const { data: ecoToken } = useScaffoldContract({ contractName: "EcoToken" });
  const { data: wasteManagement } = useScaffoldContract({ contractName: "WasteManagement" });

  // Read functions
  const { data: tokenBalance } = useScaffoldContractRead({
    contractName: "EcoToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: totalWaste } = useScaffoldContractRead({
    contractName: "WasteManagement",
    functionName: "totalWasteCollected",
  });

  // Write functions
  const { writeAsync: requestRedemption } = useScaffoldContractWrite({
    contractName: "EcoToken",
    functionName: "requestMPesaRedemption",
    args: ["0", ""],
  });

  const { writeAsync: recordWaste } = useScaffoldContractWrite({
    contractName: "WasteManagement",
    functionName: "recordWasteCollection",
    args: ["", "0", "", ""],
  });

  // Get user redemptions
  const { data: userRedemptions } = useScaffoldContractRead({
    contractName: "EcoToken",
    functionName: "getUserRedemptions",
    args: [address],
  });

  useEffect(() => {
    if (address && tokenBalance && totalWaste && userRedemptions) {
      const stats: UserStats = {
        tokenBalance: tokenBalance as BigNumber,
        wasteContributed: BigNumber.from(0), // Need to calculate from events
        pendingRedemptions: (userRedemptions as Redemption[]).filter(r => !r.processed).length,
        processedRedemptions: (userRedemptions as Redemption[]).filter(r => r.processed).length,
      };
      setUserStats(stats);

      const sysStats: EcoSystemStats = {
        totalWasteCollected: totalWaste as BigNumber,
        totalTokensMinted: BigNumber.from(0), // Need to calculate from events
        totalCollectors: 0, // Need to get from contract
        totalRedemptions: (userRedemptions as Redemption[]).length,
        activeRedemptions: (userRedemptions as Redemption[]).filter(r => !r.processed).length,
        wasteTypes: {
          plastic: 0, // Placeholder, need to implement from contract
          paper: 0,
          glass: 0,
          metal: 0,
        },
      };
      setSystemStats(sysStats);
    }
  }, [address, tokenBalance, totalWaste, userRedemptions]);

  const handleRedemption = async (amount: BigNumber, phoneNumber: string) => {
    if (!address) return;
    try {
      await requestRedemption({ args: [amount, phoneNumber] });
      return true;
    } catch (error) {
      console.error("Error requesting redemption:", error);
      return false;
    }
  };

  const handleWasteRecord = async (
    citizen: string,
    amount: string,
    qrCode: string,
    location: string,
  ) => {
    if (!address) return;
    try {
      await recordWaste({ args: [citizen, amount, qrCode, location] });
      return true;
    } catch (error) {
      console.error("Error recording waste:", error);
      return false;
    }
  };

  return {
    userStats,
    systemStats,
    handleRedemption,
    handleWasteRecord,
    isCollector: false, // Need to implement
    isOwner: false, // Need to implement
  };
};
