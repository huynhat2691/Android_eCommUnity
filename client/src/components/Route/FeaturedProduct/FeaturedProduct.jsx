// import { useSelector } from "react-redux";
// import ProductCard from "../ProductCard/ProductCard";

// const FeaturedProduct = () => {
//   const { allProducts } = useSelector((state) => state.product);

//   return (
//     <div>
//       <div className="bg-white h-full my-1 mt-3 px-4 py-2 rounded-md border">
//         <div className="font-[600] text-[20px] mt-1 mb-2 ml-1">
//           <h1>Sản phẩm nổi bật</h1>
//         </div>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-3 mb-12 border-0">
//           {allProducts && allProducts.length !== 0 && (
//             <>
//               {allProducts &&
//                 allProducts.map((i, index) => (
//                   <ProductCard data={i} key={index} />
//                 ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProduct;

import { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { Button } from "../../ui/button";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.product);
  const [visibleProducts, setVisibleProducts] = useState(20); // 5 cột * 7 hàng
  const productsPerPage = 10;

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + productsPerPage);
  };

  return (
    <div>
      <div className=" min-h-full mt-3 py-2 rounded-none">
        <div className="bg-white font-[600] text-[18px] mt-1 p-4 ">
          <h1>Gợi ý hôm nay</h1>
        </div>
        <div className="m-3">
          <div className="grid grid-cols-2 gap-3 my-3 justify-items-center">
            {allProducts &&
              allProducts
                .slice(0, visibleProducts)
                .map((i, index) => (
                  <ProductCard data={i} key={index} isBigger={true} />
                ))}
          </div>
        </div>
        {allProducts && allProducts.length > visibleProducts && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={loadMoreProducts}
              variant="outline"
              className="w-[40%] text-[#27b3e2] !bg-white !border-[#27b3e2]"
            >
              Xem thêm sản phẩm
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
