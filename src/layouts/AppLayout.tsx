import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface AppLayoutsProps {}

const AppLayout = ({}: AppLayoutsProps) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main>
        <div className="px-2 py-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AppLayout;
