/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersAdmin } from "../../redux/actions/order";
// import { useEffect, useState } from "react";
// import { Eye } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../ui/pagination";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import moment from "moment-timezone";
// import { Link } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Input } from "../ui/input";

// const AdminDashboardOrdersPage = () => {
//   const dispatch = useDispatch();
//   const { adminOrders } = useSelector((state) => state.order);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(getAllOrdersAdmin());
//   }, [dispatch]);

//   const getStatusInVietnamese = (status) => {
//     const statusMap = {
//       Processing: "Đang xử lý",
//       "Transferred to delivery partner": "Đã chuyển cho đối tác vận chuyển",
//       Shipping: "Đang giao hàng",
//       "On the way": "Đang trên đường giao",
//       Delivered: "Đã giao hàng",
//       Cancelled: "Đã hủy",
//       "Processing Refund": "Đang xử lý hoàn tiền",
//       "Refund Success": "Hoàn tiền thành công",
//     };
//     return statusMap[status] || status;
//   };

//   const filteredOrders = adminOrders?.filter((order) => {
//     const statusMatch = filterStatus === "all" || order.status === filterStatus;
//     const searchMatch = order.cart.some((item) =>
//       item.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     return statusMatch && searchMatch;
//   });

//   const totalPages = Math.ceil((filteredOrders?.length || 0) / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentOrders = filteredOrders?.slice(startIndex, endIndex) || [];

//   return (
//     <Card className="w-full mx-auto !border-none !rounded-none flex flex-col h-[calc(100vh-6rem)]">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle>Quản lý đơn hàng</CardTitle>
//           <div className="flex w-full max-w-sm items-center space-x-2">
//             <Input
//               placeholder="Tìm kiếm đơn hàng theo tên sản phẩm..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-grow">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[250px]">Mã đơn hàng</TableHead>
//               <TableHead className="max-w-[200px] truncate">
//                 Tên sản phẩm
//               </TableHead>
//               <TableHead className="w-[200px]">Tên Shop</TableHead>
//               <TableHead>
//                 <div className="flex items-center space-x-2">
//                   <span>Trạng thái</span>
//                   <Select onValueChange={(value) => setFilterStatus(value)}>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Lọc trạng thái" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">Tất cả đơn hàng</SelectItem>
//                       <SelectItem value="Processing">Đang xử lý</SelectItem>
//                       <SelectItem value="Shipping">Đang giao hàng</SelectItem>
//                       <SelectItem value="Delivered">Đã giao hàng</SelectItem>
//                       <SelectItem value="Refund Success">
//                         Hoàn tiền thành công
//                       </SelectItem>
//                       <SelectItem value="Cancelled">Đã huỷ</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </TableHead>
//               <TableHead className="text-center">Số lượng</TableHead>
//               <TableHead className="text-center">Tổng cộng</TableHead>
//               <TableHead className="text-center">Ngày đặt hàng</TableHead>
//               <TableHead className="text-center">Chi tiết</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentOrders.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   Không có đơn hàng nào.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               currentOrders.map((item) => (
//                 <TableRow key={item._id}>
//                   <TableCell>{item._id}</TableCell>
//                   <TableCell className="max-w-[200px] truncate">
//                     {item.cart.map((cartItem, index) => (
//                       <div key={index}>
//                         {cartItem.name}
//                         {index < item.cart.length - 1 && <br />}
//                       </div>
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     {item.cart.map((cartItem, index) => (
//                       <div key={index}>
//                         {cartItem.shop.name}
//                         {index < item.cart.length - 1 && <br />}
//                       </div>
//                     ))}
//                   </TableCell>
//                   <TableCell>
//                     <span
//                       className={
//                         item.status === "Delivered" ||
//                         item.status === "Refund Success" ||
//                         item.status === "Cancelled"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }
//                     >
//                       {getStatusInVietnamese(item.status)}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-center">
//                     {item.cart.reduce((acc, item) => acc + item.quantity, 0)}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     {item.totalPrice + "₫"}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     {moment(item.createdAt)
//                       .tz("Asia/Ho_Chi_Minh")
//                       .format("DD-MM-YYYY")}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <Link to={`/admin/order/${item._id}`}>
//                       <Button variant="ghost" size="sm">
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//       {totalPages > 0 && (
//         <div className="mt-auto p-4 border-t">
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                 />
//               </PaginationItem>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <PaginationItem key={index}>
//                   <PaginationLink
//                     onClick={() => setCurrentPage(index + 1)}
//                     isActive={currentPage === index + 1}
//                   >
//                     {index + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}
//               <PaginationItem>
//                 <PaginationNext
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default AdminDashboardOrdersPage;

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../redux/actions/order";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const AdminDashboardOrdersPage = () => {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2;

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);

  const getStatusInVietnamese = (status) => {
    const statusMap = {
      Processing: "Đang xử lý",
      "Transferred to delivery partner": "Đã chuyển cho đối tác vận chuyển",
      Shipping: "Đang giao hàng",
      "On the way": "Đang trên đường giao",
      Delivered: "Đã giao hàng",
      Cancelled: "Đã hủy",
      "Processing Refund": "Đang xử lý hoàn tiền",
      "Refund Success": "Hoàn tiền thành công",
    };
    return statusMap[status] || status;
  };

  const filteredOrders = adminOrders?.filter((order) => {
    const statusMatch = filterStatus === "all" || order.status === filterStatus;
    const searchMatch = order.cart.some((item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil((filteredOrders?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders?.slice(startIndex, endIndex) || [];

  // Mobile Order Card Component
  const MobileOrderCard = ({ order }) => (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm font-semibold">Mã đơn hàng:</p>
          <p className="text-sm w-[150px] truncate">{order._id}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Trạng thái:</p>
          <p
            className={
              order.status === "Delivered" ||
              order.status === "Refund Success" ||
              order.status === "Cancelled"
                ? "text-green-600 text-sm"
                : "text-red-600 text-sm"
            }
          >
            {getStatusInVietnamese(order.status)}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-semibold">Tên sản phẩm:</p>
          {order.cart.map((item, index) => (
            <p key={index} className="text-sm">
              {item.name}
            </p>
          ))}
        </div>
        <div className="col-span-2">
          <p className="text-sm font-semibold">Tên Shop:</p>
          {order.cart.map((item, index) => (
            <p key={index} className="text-sm">
              {item.shop.name}
            </p>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold">Số lượng:</p>
          <p className="text-sm">
            {order.cart.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Tổng cộng:</p>
          <p className="text-sm">{order.totalPrice}₫</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Ngày đặt hàng:</p>
          <p className="text-sm">
            {moment(order.createdAt)
              .tz("Asia/Ho_Chi_Minh")
              .format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="flex items-end justify-end">
          <Link to={`/admin/order/${order._id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full mx-auto !border-none !rounded-none flex flex-col h-full !bg-white !text-black">
      <CardHeader className="!p-3 !px-6">
        <div className="flex flex-col space-y-4 ">
          <CardTitle>Quản lý đơn hàng</CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 !bg-white !text-black"
            />
            <Select onValueChange={(value) => setFilterStatus(value)}>
              <SelectTrigger className="w-full sm:w-[200px] !bg-white !text-black">
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả đơn hàng</SelectItem>
                <SelectItem value="Processing">Đang xử lý</SelectItem>
                <SelectItem value="Shipping">Đang giao hàng</SelectItem>
                <SelectItem value="Delivered">Đã giao hàng</SelectItem>
                <SelectItem value="Refund Success">
                  Hoàn tiền thành công
                </SelectItem>
                <SelectItem value="Cancelled">Đã huỷ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow ">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Mã đơn hàng</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>Tên Shop</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-center">Tổng cộng</TableHead>
                <TableHead className="text-center">Ngày đặt hàng</TableHead>
                <TableHead className="text-center">Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Không có đơn hàng nào.
                  </TableCell>
                </TableRow>
              ) : (
                currentOrders.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>
                      {item.cart.map((cartItem, index) => (
                        <div key={index}>
                          {cartItem.name}
                          {index < item.cart.length - 1 && <br />}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.cart.map((cartItem, index) => (
                        <div key={index}>
                          {cartItem.shop.name}
                          {index < item.cart.length - 1 && <br />}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          item.status === "Delivered" ||
                          item.status === "Refund Success" ||
                          item.status === "Cancelled"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {getStatusInVietnamese(item.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.totalPrice}₫
                    </TableCell>
                    <TableCell className="text-center">
                      {moment(item.createdAt)
                        .tz("Asia/Ho_Chi_Minh")
                        .format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/admin/order/${item._id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {currentOrders.length === 0 ? (
            <div className="text-center py-4">Không có đơn hàng nào.</div>
          ) : (
            currentOrders.map((order) => (
              <MobileOrderCard key={order._id} order={order} />
            ))
          )}
        </div>
      </CardContent>

      {totalPages > 0 && (
        <div className="mt-auto py-4 border-t">
          <Pagination>
            <PaginationContent className="flex-wrap justify-center gap-2 ">
              <PaginationItem>
                <PaginationPrevious
                
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              {/* Logic hiển thị số trang */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                // Luôn hiển thị trang đầu
                if (pageNumber === 1)
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="!bg-white !text-black"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );

                // Luôn hiển thị trang cuối
                if (pageNumber === totalPages)
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="!bg-white !text-black"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );

                // Hiển thị trang hiện tại và trang xung quanh
                if (
                  pageNumber === currentPage ||
                  pageNumber === currentPage - 1 ||
                  pageNumber === currentPage + 1
                )
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="!bg-white !text-black"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );

                // Hiển thị dấu ...
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                )
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                  );

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
};

export default AdminDashboardOrdersPage;
