/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import logo from "../../assets/logo3.png";
import Cart from "../Cart/Cart";
import NavBar from "./NavBar";
import Wishlist from "../Wishlist/Wishlist";
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Heart,
  House,
  Languages,
  Laugh,
  LogOut,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { categoriesData } from "../../static/data";
import { logoutUser } from "../../redux/actions/user";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSellerAuthenticated } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const { allProducts } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchResultRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //popover
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 300);
  };

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/profile/account");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // const logoutHandler = () => {
  //   toast.success("Đăng xuất thành công");
  //   dispatch(logoutUser());
  //   navigate("/login"); // Redirect to login page after logout
  // };

  const logoutHandler = async () => {
    try {
      toast.success("Đăng xuất thành công");
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // const logoutHandler = async () => {
  //   toast.success("Đăng xuất thành công");
  //   await dispatch(logoutUser());
  //   navigate("/login");
  // };

  // Cấu hình Fuse.js
  const fuse = new Fuse(allProducts, {
    keys: ["name", "shop.name", "category", "subcategory", "subclassification"],
    threshold: 0.3,
  });

  // Debounced search function
  const debouncedSearch = debounce((term) => {
    if (term.trim() === "") {
      setSearchSuggestions([]);
      setIsSearchVisible(false);
    } else {
      const results = fuse.search(term);
      setSearchSuggestions(
        results.map((result) => result.item.name).slice(0, 7)
      );
      setIsSearchVisible(true);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Gửi truy vấn tìm kiếm với tất cả các từ khóa liên quan
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchVisible(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsSearchVisible(false);
  };

  const handleFocus = () => {
    if (searchSuggestions.length > 0) {
      setIsSearchVisible(true);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleBlur = (e) => {
    // Sử dụng timeout để đảm bảo rằng sự kiện `click` trên gợi ý được xử lý trước khi gợi ý bị ẩn
    setTimeout(() => {
      setIsSearchVisible(false);
    }, 100);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`, {
      state: { category: category },
    });
  };

  const formatAddressPart = (part) => {
    if (part?.startsWith("Phường")) {
      return part.replace("Phường", "P.");
    } else if (part?.startsWith("Quận")) {
      return part.replace("Quận", "Q.");
    } else if (part?.startsWith("Thành phố")) {
      return part.replace("Thành phố", "");
    } else if (part?.startsWith("Thị xã")) {
      return part.replace("Thị xã", "Tx.");
    }
    return part;
  };

  const location = useLocation();

  return (
    <>
      <div className="bg-white lg:bg-[#27b3e2] ">
        <div className="">
          <div className="hidden lg:flex items-center justify-between h-[34px] py-1 pt-2 text-white font-[400]">
            <div className="flex items-center">
              {isSellerAuthenticated && (
                <Link to="/dashboard">
                  <h1 className="flex items-center pl-1">Kênh người bán</h1>
                </Link>
              )}

              {!isSellerAuthenticated && (
                <div className="flex items-center">
                  <Link to="/shop-login">
                    <h1 className="flex items-center pl-1">Kênh người bán</h1>
                  </Link>
                  <div className="w-[1px] h-[16px] bg-gray-300 mx-2 rounded" />

                  <Link to="/shop-create">
                    <h1 className="flex items-center">
                      Bán hàng cùng Ecommunity
                    </h1>
                  </Link>
                </div>
              )}
              <div className="w-[1px] h-[16px] bg-gray-300 mx-2 rounded" />

              {isAuthenticated ? (
                <Link
                  to="/profile/addresses"
                  className="flex items-center text-[14px]"
                >
                  <div className="flex items-center">
                    <MapPin size={18} />
                    <p className="mx-1">Giao đến:</p>
                  </div>
                  {user?.addresses[0]?.ward &&
                  user?.addresses[0]?.district &&
                  user?.addresses[0]?.province ? (
                    <p className="underline">
                      {formatAddressPart(user.addresses[0].ward)},{" "}
                      {formatAddressPart(user.addresses[0].district)},{" "}
                      {formatAddressPart(user.addresses[0].province)}
                    </p>
                  ) : (
                    <p className="underline">...</p>
                  )}
                </Link>
              ) : (
                <Link to="/login" className="flex items-center text-[14px]">
                  <div className="flex items-center">
                    <MapPin size={18} />
                    <p className="mx-1">Giao đến:</p>
                  </div>
                  <p>...</p>
                </Link>
              )}
            </div>
            <div className="flex items-center justify-end">
              <div className="flex items-center w-[200px] justify-between mr-2">
                <div className="flex items-center mr-2">
                  <CircleHelp size={18} />
                  Hỗ trợ
                </div>
                <div className="flex items-center mr-2">
                  <Languages size={18} />
                  Tiếng việt
                  <ChevronDown size={18} />
                </div>
              </div>

              <div
                className="relative cursor-pointer ml-3 "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                ref={popoverRef}
              >
                <div className="w-full flex items-center justify-end ">
                  {isAuthenticated ? (
                    <Link
                      to="/profile/account"
                      className="flex items-center pr-1"
                    >
                      <Avatar className="size-[25px] rounded-full object-cover mr-1">
                        <AvatarImage
                          src={user.avatar}
                          alt={user?.name}
                          className="object-cover"
                        />
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-white font-[500]">{user?.name}</p>
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center pr-1">
                      <Laugh size={30} color="white" className="mr-1" />
                      <p className="text-white font-[500]">Tài khoản</p>
                    </Link>
                  )}
                </div>

                {showPopover && isAuthenticated && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 font-[500]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to="/profile/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between lg:mt-4 p-4 lg:p-0">
            <div className="hidden lg:flex h-full">
              <Link to="/">
                <img src={logo} alt="" className="w-[250px]" />
              </Link>
            </div>
            {/* search box */}
            <div className="flex items-center justify-center mr-3">
              {location.pathname !== "/" && (
                <Link to="/">
                  <House size={25} className="cursor-pointer" />
                </Link>
              )}
            </div>
            <div className="w-[800px] relative">
              <form onSubmit={handleSearchSubmit} className="z-[9999]">
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm, cửa hàng..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  ref={searchInputRef}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="h-[40px] w-full px-2 pl-4 rounded-m !bg-white !border-[#27b3e2]"
                />
                <div className="absolute right-3 top-2 flex items-center gap-2">
                  <button type="submit" className="cursor-pointer">
                    <Search size={25} color="#576574" />
                  </button>
                </div>
              </form>
              <CategoryBar
                categories={categoriesData}
                handleCategoryClick={handleCategoryClick}
                allProducts={allProducts}
              />
              {isSearchVisible && searchSuggestions.length > 0 && (
                <div className="absolute w-full border rounded bg-white shadow-sm-2 z-[9] py-2">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex mr-0 lg:mr-12 mt-[6px] items-start h-full justify-center ">
              {isAuthenticated ? (
                <div className={`${styles.normalFlex}`}>
                  <Link
                    to="/cart"
                    className="relative cursor-pointer mx-3 "
                    onClick={() => setOpenCart(true)}
                  >
                    <ShoppingCart size={26} color="black" />
                    <span className="absolute left-[18px] bottom-4 rounded-full bg-[#e74c3c] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {cart && cart.length}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className={`${styles.normalFlex}`}>
                  <Link to="/login" className="relative cursor-pointer mx-3">
                    <ShoppingCart size={26} color="black" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryBar = ({ categories, handleCategoryClick, allProducts }) => {
  // Lọc ra những category có sản phẩm
  const categoriesWithProducts = categories.filter((category) =>
    allProducts?.some((product) => product.category === category.id.toString())
  );

  return (
    <div className="hidden lg:flex text-[13px] h-[25px] items-end justify-start space-x-3">
      {categoriesWithProducts.slice(0, 6).map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default Header;
