/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Skeleton } from "../../components/ui/skeleton";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../components/ui/carousel";
// import { server } from "../../server";
// import moment from "moment-timezone";

// const AdminShopCouponData = ({ shopId }) => {
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

// export default AdminShopCouponData;

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { server } from "../../server";
import moment from "moment-timezone";

const AdminShopCouponData = ({ shopId }) => {
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
    <Card className="w-full border-[#27b3e2] h-full">
      <CardHeader className="!pb-0 mb-1 text-[#27b3e2]">
        <CardTitle className="text-base sm:text-[18px] break-all">
          {coupon.code}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm mb-1">
          Giảm:{" "}
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}%`
            : `${coupon.discountValue.toLocaleString()} VND`}
        </p>
        <p className="text-xs sm:text-sm mb-1">
          Số lượng: {coupon.maxUses - coupon.usedCount}
        </p>
        <p className="text-xs sm:text-sm mb-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[180px] mb-2" />
              <Skeleton className="h-10 w-full mt-2" />
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
      <p className="text-[14px] sm:text-[16px] font-[450] pb-2">Mã Giảm Giá</p>
      {coupons.length > 3 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {coupons.map((coupon) => (
              <CarouselItem 
                key={coupon._id} 
                className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <CouponCard coupon={coupon} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </div>
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShopCouponData;