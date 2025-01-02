import CategoriesList from "../components/Layout/CategoriesList";
import Cart from "../components/Cart/Cart";
import Footer from "../components/Layout/Footer";
import HeaderCart from "../components/Layout/HeaderCart";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
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
            <p className="text-[20px] text-[#fff]">Giỏ hàng</p>
          </div>
        </div>
      </div>
      {/* <HeaderCart isCart={true} /> */}
      <Cart />
      {/* <CategoriesList/> */}
      {/* <Footer /> */}
    </div>
  );
};

export default CartPage;
