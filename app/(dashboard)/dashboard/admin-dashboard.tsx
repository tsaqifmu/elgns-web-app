import ContainerPage from "@/components/dashboard/container-page";
import NavBar from "@/components/dashboard/navbar";

export const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      <ContainerPage className="font-oswald">Halo ini admin</ContainerPage>
    </>
  );
};
