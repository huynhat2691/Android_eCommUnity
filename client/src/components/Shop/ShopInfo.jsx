// import axios from "axios";
// import { useEffect, useState } from "react";
// import { backend_url, server } from "../../server";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getApprovedProductsShop } from "../../redux/actions/product";
// import { Button } from "../ui/button";
// import { CardContent, CardFooter } from "../ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Skeleton } from "../ui/skeleton";
// import { MapPin, MessageSquare, Star, Store, UserCheck } from "lucide-react";
// import { toast } from "react-toastify";
// import { logoutSeller } from "../../redux/actions/seller";

// const ShopInfo = ({ isOwner }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   const [data, setData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const { approvedProducts } = useSelector((state) => state.product);
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getApprovedProductsShop(id));
//     setIsLoading(true);
//     axios
//       .get(`${server}/shop/get-shop-info/${id}`)
//       .then((res) => {
//         setData(res.data.shop);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setIsLoading(false);
//       });
//   }, []);

//   // const logoutHandler = () => {
//   //   toast.success("Đăng xuất thành công");
//   //   dispatch(logoutSeller());
//   //   navigate("/shop-login");
//   // };

//   const logoutHandler = async () => {
//     try {
//       toast.success("Đăng xuất thành công");
//       await dispatch(logoutSeller());
//       navigate("/shop-login");
//     } catch (error) {
//       console.error("Lỗi khi đăng xuất:", error);
//     }
//   };

//   const handleMessageSubmit = async () => {
//     if (isAuthenticated) {
//       if (!data || !data._id) {
//         toast.error("Không thể lấy thông tin shop. Vui lòng thử lại sau.");
//         return;
//       }

//       const userId = user._id;
//       const sellerId = data._id;

//       try {
//         // Check if the conversation exists based on both user IDs
//         const checkResponse = await axios.get(
//           `${server}/conversation/check-conversation`,
//           {
//             params: { userId, sellerId },
//           }
//         );

//         let conversationId;

//         if (checkResponse.data.exists) {
//           // If conversation exists, use its ID
//           conversationId = checkResponse.data.conversation._id;
//         } else {
//           // If conversation doesn't exist, create a new one
//           const createResponse = await axios.post(
//             `${server}/conversation/create-new-conversation`,
//             {
//               userId,
//               sellerId,
//             }
//           );
//           conversationId = createResponse.data.conversation._id;
//         }

//         // Navigate to the conversation
//         navigate(`/profile/inbox?conversationId=${conversationId}`);
//       } catch (err) {
//         toast.error(
//           err.response?.data?.message ||
//             "Có lỗi xảy ra khi xử lý cuộc trò chuyện"
//         );
//       }
//     } else {
//       toast.error("Vui lòng đăng nhập để gửi tin nhắn");
//     }
//   };

//   const totalReviewsLength =
//     approvedProducts &&
//     approvedProducts.reduce((acc, product) => acc + product.reviews.length, 0);

//   const totalRatings =
//     approvedProducts &&
//     approvedProducts.reduce(
//       (acc, product) =>
//         acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
//       0
//     );

//   const avg = totalRatings / totalReviewsLength || 0;

//   const averageRating = avg.toFixed(1);

//   const getAvatarSrc = (avatar) => {
//     if (avatar && avatar.startsWith("data:image")) {
//       return avatar;
//     } else if (avatar) {
//       return `${backend_url}${avatar}`;
//     }
//     return "";
//   };

//   return (
//     <div className="w-[1100px] mx-auto bg-white border-x border-b rounded-b-lg">
//       {isLoading ? (
//         <CardContent className="p-6 space-y-4">
//           <Skeleton className="h-24 w-24 rounded-full mx-auto" />
//           <Skeleton className="h-4 w-3/4 mx-auto" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-full" />
//         </CardContent>
//       ) : (
//         <div>
//           <CardContent className="flex items-center p-4 h-[160px]">
//             <div className="flex items-center w-full">
//               <div>
//                 <div className="flex flex-col items-center pl-8">
//                   <div className="flex items-center justify-between w-full">
//                     <Avatar className="size-[75px]">
//                       <AvatarImage
//                         src={
//                           getAvatarSrc(data.avatar) ||
//                           `${backend_url}${data.avatar}`
//                         }
//                         alt={data.name}
//                         className="rounded-full object-cover"
//                       />
//                       <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
//                     </Avatar>

//                     <div className="text-[20px] font-[500] h-[72px] ml-4 mr-8 flex items-center text-ellipsis flex-nowrap overflow-hidden">
//                       {data.name}
//                     </div>
//                     {isOwner === false && data.name !== "eCommUnity" && (
//                       <div className="mx-auto">
//                         <Button
//                           variant="outline"
//                           className="border"
//                           onClick={handleMessageSubmit}
//                         >
//                           <MessageSquare
//                             size={16}
//                             className="mr-2 text-gray-800"
//                           />
//                           Chat
//                         </Button>
//                       </div>
//                     )}
//                   </div>
//                   {data.description ? (
//                     <p className="text-sm text-gray-500 h-[40px] text-center w-full flex items-center justify-center">
//                       {data.description}
//                     </p>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-center w-full">
//               <div className="flex items-center">
//                 <div className="flex items-start flex-1 flex-wrap w-full">
//                   <div className="flex items-center basis-[50%] my-3 w-[300px]">
//                     <MapPin size={16} />
//                     <h5 className="mx-2">Địa chỉ:</h5>
//                     <p className="text-[#27b3e2]">
//                       {data.name === "eCommUnity" ? "Việt Nam" : data.city}
//                     </p>
//                   </div>

//                   <div className="flex items-center basis-[50%] my-3 w-[300px]">
//                     <Store size={16} />
//                     <h5 className="mx-2">Sản phẩm:</h5>
//                     <p className=" text-[#27b3e2]">
//                       {approvedProducts && approvedProducts?.length}
//                     </p>
//                   </div>

//                   <div className="flex items-center basis-[50%] my-3 w-[300px]">
//                     <Star size={16} />
//                     <h5 className="mx-2">Đánh giá:</h5>
//                     {averageRating > 0 ? (
//                       <p className=" text-[#27b3e2]">{averageRating}/5</p>
//                     ) : (
//                       <p className=" text-[#27b3e2]">Chưa có đánh giá</p>
//                     )}
//                   </div>

//                   <div className="flex items-center basis-[50%] my-3 w-[300px]">
//                     <UserCheck size={16} />
//                     <h5 className="mx-2">Tham gia:</h5>
//                     <p className=" text-[#27b3e2]">
//                       {data?.createdAt?.slice(0, 10)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>

//           {isOwner && (
//             <CardFooter className="flex items-center justify-end">
//               <Link to="/settings" className="w-1/12 mr-2">
//                 <Button className="w-full">Cài đặt</Button>
//               </Link>
//               <Button
//                 className="w-1/12"
//                 variant="destructive"
//                 onClick={logoutHandler}
//               >
//                 Đăng xuất
//               </Button>
//             </CardFooter>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShopInfo;

import axios from "axios";
import { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedProductsShop } from "../../redux/actions/product";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { MapPin, MessageSquare, Star, Store, UserCheck } from "lucide-react";
import { toast } from "react-toastify";
import { logoutSeller } from "../../redux/actions/seller";
import { setCurrentConversation, toggleChatPopup } from "../../redux/actions/chatActions";

const ShopInfo = ({ isOwner }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { approvedProducts } = useSelector((state) => state.product);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getApprovedProductsShop(id));
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  // const logoutHandler = () => {
  //   toast.success("Đăng xuất thành công");
  //   dispatch(logoutSeller());
  //   navigate("/shop-login");
  // };

  const logoutHandler = async () => {
    try {
      toast.success("Đăng xuất thành công");
      await dispatch(logoutSeller());
      navigate("/shop-login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      if (!data || !data._id) {
        toast.error("Không thể lấy thông tin shop. Vui lòng thử lại sau.");
        return;
      }

      const userId = user._id;
      const sellerId = data._id;

      try {
        // Check if the conversation exists based on both user IDs
        const checkResponse = await axios.get(
          `${server}/conversation/check-conversation`,
          {
            params: { userId, sellerId },
          }
        );

        let conversationId;
        let conversation;

        if (checkResponse.data.exists) {
          // If conversation exists, use its ID
          conversationId = checkResponse.data.conversation._id;
          conversation = checkResponse.data.conversation;
        } else {
          // If conversation doesn't exist, create a new one
          const createResponse = await axios.post(
            `${server}/conversation/create-new-conversation`,
            {
              userId,
              sellerId,
            }
          );
          conversationId = createResponse.data.conversation._id;
          conversation = createResponse.data.conversation;
        }

        // Dispatch actions to show chat popup and set current conversation
        dispatch(toggleChatPopup());
        dispatch(setCurrentConversation(conversation));
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Có lỗi xảy ra khi xử lý cuộc trò chuyện"
        );
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi tin nhắn");
    }
  };

  const totalReviewsLength =
    approvedProducts &&
    approvedProducts.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    approvedProducts &&
    approvedProducts.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(1);

  const getAvatarSrc = (avatar) => {
    if (avatar && avatar.startsWith("data:image")) {
      return avatar;
    } else if (avatar) {
      return `${backend_url}${avatar}`;
    }
    return "";
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto bg-white border-x border-b rounded-b-lg px-4">
      {isLoading ? (
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-24 w-24 rounded-full mx-auto" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      ) : (
        <div>
          <CardContent className="flex flex-col md:flex-row items-center p-4 min-h-[160px]">
            {/* Shop Info Section */}
            <div className="flex flex-col md:flex-row items-center w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex flex-col items-center md:pl-8">
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <Avatar className="size-[75px] mb-2 md:mb-0">
                    <AvatarImage
                      src={getAvatarSrc(data.avatar) || `${backend_url}${data.avatar}`}
                      alt={data.name}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>{data.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="text-[20px] font-[500] text-center md:text-left md:ml-4 md:mr-8 flex items-center text-ellipsis flex-nowrap overflow-hidden">
                    {data.name}
                  </div>
                </div>
                {data.description && (
                  <p className="text-sm text-gray-500 mt-2 text-center w-full">
                    {data.description}
                  </p>
                )}
              </div>
              
              {/* {isOwner === false && data.name !== "eCommUnity" && (
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Button
                    variant="outline"
                    className="border !bg-white !text-black"
                    onClick={handleMessageSubmit}
                  >
                    <MessageSquare size={16} className="mr-2 text-gray-800" />
                    Chat
                  </Button>
                </div>
              )} */}
            </div>

            {/* Shop Details Section */}
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin size={16} />
                  <h5 className="mx-2">Địa chỉ:</h5>
                  <p className="text-[#27b3e2]">
                    {data.name === "eCommUnity" ? "Việt Nam" : data.city}
                  </p>
                </div>

                <div className="flex items-center">
                  <Store size={16} />
                  <h5 className="mx-2">Sản phẩm:</h5>
                  <p className="text-[#27b3e2]">
                    {approvedProducts && approvedProducts?.length}
                  </p>
                </div>

                <div className="flex items-center">
                  <Star size={16} />
                  <h5 className="mx-2">Đánh giá:</h5>
                  {averageRating > 0 ? (
                    <p className="text-[#27b3e2]">{averageRating}/5</p>
                  ) : (
                    <p className="text-[#27b3e2]">Chưa có đánh giá</p>
                  )}
                </div>

                <div className="flex items-center">
                  <UserCheck size={16} />
                  <h5 className="mx-2">Tham gia:</h5>
                  <p className="text-[#27b3e2]">
                    {data?.createdAt?.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          {isOwner && (
            <CardFooter className="flex items-center justify-end p-4">
              <Link to="/settings" className="w-full md:w-auto mr-2">
                <Button className="w-full !bg-[#27b3e2] !text-white">Cài đặt</Button>
              </Link>
              <Button
                className="w-full md:w-auto !bg-red-600 !border-none !text-white"
                variant="outline"
                onClick={logoutHandler}

              >
                Đăng xuất
              </Button>
            </CardFooter>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopInfo;