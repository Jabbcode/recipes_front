import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface AppLayoutsProps {}

const AppLayout = ({}: AppLayoutsProps) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default AppLayout;
