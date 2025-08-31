import { BigNumber } from "ethers";

export interface Redemption {
  amount: BigNumber;
  phoneNumber: string;
  timestamp: BigNumber;
  processed: boolean;
}

export interface WasteRecyclingEvent {
  citizen: string;
  collector: string;
  amount: BigNumber;
  tokens: BigNumber;
}

export interface RedemptionEvent {
  user: string;
  amount: BigNumber;
  phoneNumber: string;
}

export interface CollectorInfo {
  name: string;
  active: boolean;
  totalCollected: BigNumber;
  lastCollection: BigNumber;
  collectionProofs: string[];
}

export interface EcoSystemStats {
  totalWasteCollected: BigNumber;
  totalTokensMinted: BigNumber;
  totalCollectors: number;
  totalRedemptions: number;
  activeRedemptions: number;
  wasteTypes: {
    plastic: number;
    paper: number;
    glass: number;
    metal: number;
  };
}

export interface UserStats {
  tokenBalance: BigNumber;
  wasteContributed: BigNumber;
  pendingRedemptions: number;
  processedRedemptions: number;
}
