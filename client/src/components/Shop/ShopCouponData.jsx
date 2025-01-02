// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Skeleton } from "../ui/skeleton";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import { server } from "../../server";
// import moment from "moment-timezone";

// const ShopCouponData = ({ shopId }) => {
//   const [coupons, setCoupons] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await axios.get(
//           `${server}/coupon/get-all-coupons/${shopId}`,
//           {
//             withCredentials: true,
//           }
//         );
//         setCoupons(response.data.couponCodes);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching coupons:", error);
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, [shopId]);

//   // console.log(coupons);

//   const CouponCard = ({ coupon }) => (
//     <Card className="w-full border-[#27b3e2]">
//       <CardHeader className="!pb-0 mb-1 text-[#27b3e2]">
//         <CardTitle className="text-[18px]">{coupon.code}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="text-sm mb-1">
//           Giảm:{" "}
//           {coupon.discountType === "percentage"
//             ? `${coupon.discountValue}%`
//             : `${coupon.discountValue.toLocaleString()} VND`}
//         </p>
//         <p className="text-sm mb-1">
//           Số lượng: {coupon.maxUses - coupon.usedCount}
//         </p>
//         <p className="text-sm mb-2">
//           Hạn sử dụng:{" "}
//           {moment(coupon.expiryDate)
//             .tz("Asia/Ho_Chi_Minh")
//             .format("DD-MM-YYYY | HH:mm")}
//         </p>
//       </CardContent>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[...Array(3)].map((_, index) => (
//           <Card key={index} className="w-full">
//             <CardHeader>
//               <Skeleton className="h-4 w-[200px]" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-4 w-[150px] mb-2" />
//               <Skeleton className="h-4 w-[100px] mb-2" />
//               <Skeleton className="h-4 w-[180px] mb-2" />
//               <Skeleton className="h-10 w-full mt-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   if (coupons.length === 0) {
//     return;
//   }

//   // Nếu có coupon, render component như bình thường
//   return (
//     <div className="w-full px-4 py-2">
//       <p className="text-[16px] font-[450] pb-2">Mã Giảm Giá</p>
//       {coupons.length > 3 ? (
//         <Carousel
//           opts={{
//             align: "start",
//           }}
//           className="w-full"
//         >
//           <CarouselContent>
//             {coupons.map((coupon) => (
//               <CarouselItem key={coupon._id} className="md:basis-1/3">
//                 <div className="p-1">
//                   <CouponCard coupon={coupon} />
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {coupons.map((coupon) => (
//             <CouponCard key={coupon._id} coupon={coupon} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShopCouponData;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { server } from "../../server";
import moment from "moment-timezone";

const ShopCouponData = ({ shopId }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `${server}/coupon/get-all-coupons/${shopId}`,
          {
            withCredentials: true,
          }
        );
        setCoupons(response.data.couponCodes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [shopId]);

  const CouponCard = ({ coupon }) => (
    <Card className="w-full border-[#27b3e2] shadow-sm !bg-white !text-black">
      <CardHeader className="!pb-0 mb-1 text-[#27b3e2] px-3 py-2 sm:px-4 sm:py-3">
        <CardTitle className="text-[16px] sm:text-[18px] line-clamp-1">
          {coupon.code}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 sm:px-4">
        <p className="text-[13px] sm:text-sm mb-1">
          Giảm:{" "}
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}%`
            : `${coupon.discountValue.toLocaleString()} VND`}
        </p>
        <p className="text-[13px] sm:text-sm mb-1">
          Số lượng: {coupon.maxUses - coupon.usedCount}
        </p>
        <p className="text-[13px] sm:text-sm mb-1">
          Hạn sử dụng:{" "}
          {moment(coupon.expiryDate)
            .tz("Asia/Ho_Chi_Minh")
            .format("DD-MM-YYYY | HH:mm")}
        </p>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="px-3 sm:px-4">
              <Skeleton className="h-3 sm:h-4 w-[150px] mb-2" />
              <Skeleton className="h-3 sm:h-4 w-[100px] mb-2" />
              <Skeleton className="h-3 sm:h-4 w-[180px] mb-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-2 sm:px-4 py-2">
      <p className="text-[15px] sm:text-[16px] font-[450] pb-2">Mã Giảm Giá</p>
      {coupons.length > 3 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4 ">
            {coupons.map((coupon) => (
              <CarouselItem 
                key={coupon._id} 
                className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 "
              >
                <CouponCard coupon={coupon} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopCouponData;