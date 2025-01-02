/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const NavBar = () => {
  return (
    <div>
      <div className="w-screen lg:w-full bg-white h-full mt-0 lg:mt-3 py-2 lg:py-4 ">
        <div className="grid grid-cols-4 lg:flex lg:items-start lg:justify-around pt-0 lg:pt-2 px-2">
          {navItems &&
            navItems.map((i, index) => (
              <div className="w-full py-2 lg:p-0" key={index}>
                <Link
                  to={i.url}
                  className="text-black flex flex-col items-center justify-between mx-0 lg:mx-3"
                >
                  <div className="relative">
                    <div className="absolute inset-0 -m-2 rounded-2xl border border-gray-300 bg-gradient-to-b from-current to-transparent opacity-10"></div>
                    <div className="relative z-5">
                      <img
                        src={i.image_Url}
                        alt=""
                        className="size-[30px] lg:size-[35px] object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <p
                    className="text-center text-[12px] lg:text-[14px] font-[550] mt-3 break-words"
                    style={{ color: i.color }}
                  >
                    {i.title}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
