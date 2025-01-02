import Footer from "../components/Layout/Footer";
import HeaderCart from "../components/Layout/HeaderCart";
// import CheckoutSteps from "../components/Checkout/CheckoutSteps"
import Checkout from "../components/Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div>
      <div>
      <div className="bg-[#27b3e2] h-[60px]">
          <ChevronLeft
            color="#fff"
            size={30}
            className="absolute top-4 left-4 cursor-pointer"
            onClick={handleGoBack}
          />
          <div className="flex items-center justify-center h-full">
            <p className="text-[20px] text-[#fff]">Xác nhận đơn hàng</p>
          </div>
        </div>
      </div>
      {/* <HeaderCart isCart={false} /> */}
      {/* <br /> */}
      <Checkout />
      {/* <br /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default CheckoutPage;
