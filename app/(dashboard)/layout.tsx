import NavBar from "@/components/dashboard/navbar";
import { cookies } from "next/headers";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = cookies();
  const theme = cookieStore.get("token");
  console.log(theme);
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
