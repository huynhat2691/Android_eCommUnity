// import Footer from "../../components/Layout/Footer";
// import AdminShopInfo from "./AdminShopInfo";
// import AdminShopCouponData from "./AdminShopCouponData";
// import AdminShopProfileData from "./AdminShopProfileData";
// import AdminHeader from "../../components/Layout/AdminHeader";

// const AdminShopHomePage = () => {
//   const adminShopId = "66e47c9b81cc1412b8c9edca";

//   return (
//     <div>
//       <AdminHeader />
//       <div className="w-full mx-auto">
//         <div className="">
//           <div className="w-full">
//             <AdminShopInfo isOwner={true} id={adminShopId} />
//           </div>
//           <div className="w-[1100px] mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
//             <AdminShopCouponData id={adminShopId} />
//           </div>
//           <div className="w-[1100px] min-h-screen mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
//             <AdminShopProfileData isOwner={true} id={adminShopId} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminShopHomePage;

import AdminShopInfo from "./AdminShopInfo";
import AdminShopCouponData from "./AdminShopCouponData";
import AdminShopProfileData from "./AdminShopProfileData";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const AdminShopHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
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
          <AdminSidebar active={17} />
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
            <AdminShopInfo isOwner={true} />
          </div>
          <div className="w-full mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <AdminShopCouponData />
          </div>
          <div className="w-full min-h-screen mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <AdminShopProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShopHomePage;
