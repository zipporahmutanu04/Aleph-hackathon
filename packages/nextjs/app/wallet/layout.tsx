import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Wallet",
  description: "Manage your TAKA tokens and view transaction history",
});

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default WalletLayout;