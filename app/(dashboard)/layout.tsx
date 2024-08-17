import NavBar from "@/components/dashboard/navbar";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default DashboardLayout;
