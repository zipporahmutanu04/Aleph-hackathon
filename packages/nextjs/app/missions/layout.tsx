import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Missions",
  description: "Discover and join environmental missions to earn TAKA tokens",
});

const MissionsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MissionsLayout;