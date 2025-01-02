import { Link, useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { Store } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`, {
      state: { category: category },
    });
  };

  return (
    <div className="items-center justify-center " id="categories">
      <div className="bg-white flex flex-col justify-between">
        <p className="text-center text-[20px] font-[500] py-4">Danh mục sản phẩm</p>
        <div className="p-2 py-4 grid grid-cols-3 gap-3 justify-items-center">
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center justify-center rounded-2xl border-[#27b3e2] cursor-pointer p-2 hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image_Url}
                alt=""
                className="size-[60px] object-cover rounded-lg"
              />
              <h5 className="text-[14px] font-[450] leading-[1.3]">
                {category.title}
              </h5>
            </div>
          ))}
        </div>
        <Link
          to="/shop-create"
          className="bg-white px-2 py-4 border-t border-[#27b3e2] mt-3 flex items-center justify-center cursor-pointer"
        >
          <div className="flex items-center  hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200 p-2 pl-3">
            <Store size={30} className="text-[#27b3e2]" />
            <p className="text-[20px] font-[500] leading-[1.3] text-center pl-2">
              Bán hàng cùng eCommUnity
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
