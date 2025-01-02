import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AddEvent from "../../components/Shop/AddEvent";
import { useState } from "react";
import { Menu } from "lucide-react";

const ShopAddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
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
          <DashboardSidebar active={7} />
        </div>

        {/* Overlay khi sidebar mở trên mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="flex-1 overflow-y-auto">
          <AddEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopAddEvent;

