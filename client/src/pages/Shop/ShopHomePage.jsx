import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import ShopCouponData from "../../components/Shop/ShopCouponData";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import { Menu } from "lucide-react";

const ShopHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
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
          <DashboardSidebar  active={14}/>
        </div>

        {/* Overlay khi sidebar mở trên mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
        <div className="w-full justify-center scroll-y-auto">

          <div className="w-full">
            <ShopInfo isOwner={true} />
          </div>
          <div className="w-full mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <ShopCouponData isOwner={true} />
          </div>
          <div className="w-full min-h-screen mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <ShopProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
