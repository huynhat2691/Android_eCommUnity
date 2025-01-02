// components/Layout/MobileNav.jsx
import { Link } from "react-router-dom";
import { House, LayoutGrid, ShoppingCart, User } from "lucide-react";

const MobileNav = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center h-14">
        <button onClick={scrollToTop} className="flex flex-col items-center">
          <House size={20} />
          <span className="text-xs">Trang chủ</span>
        </button>
        <Link to="/categories" className="flex flex-col items-center">
          <LayoutGrid size={20} />
          <span className="text-xs">Danh mục</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center">
          <ShoppingCart size={20} />
          <span className="text-xs">Giỏ hàng</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <User size={20} />
          <span className="text-xs">Cá nhân</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
