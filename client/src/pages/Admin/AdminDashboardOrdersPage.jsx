import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AllOrders from "../../components/Admin/AllOrders";
import { useState } from "react";
import { Menu } from "lucide-react";

const AdminDashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Nút toggle cho mobile */}
        <button
          className="lg:hidden fixed top-[70px] right-2 z-50 p-2 rounded-md bg-white shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <div
          className={`
          fixed lg:relative
          lg:w-[16rem] w-[20rem]
          transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-40
        `}
        >
          <AdminSidebar active={4} />
        </div>

        {/* Overlay khi sidebar mở trên mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="flex-1 overflow-y-auto">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
