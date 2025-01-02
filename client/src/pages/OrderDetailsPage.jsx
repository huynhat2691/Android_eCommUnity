import { Link } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import UserOrderDetails from "../components/UserOrderDetails";
import { ChevronLeft } from "lucide-react";

const OrderDetailsPage = () => {
  return (
    <div>
      {/* <Header/> */}
      <div>
        <div className="bg-[#27b3e2] h-[60px]">
          <Link to="/profile/orders">
            <ChevronLeft
              color="#fff"
              size={30}
              className="absolute top-4 left-4 cursor-pointer"
            />
          </Link>
          <div className="flex items-center justify-center h-full">
            <p className="text-[20px] text-[#fff]">Đơn hàng</p>
          </div>
        </div>
      </div>
      <UserOrderDetails />
      {/* <Footer/> */}
    </div>
  );
};

export default OrderDetailsPage;
