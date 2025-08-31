import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Dashboard",
  description: "Track your trash collection progress and TAKA token rewards",
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default DashboardLayout;