// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { server } from "../../server";
// import { getAllSellersAdmin } from "../../redux/actions/seller";
// import { Eye, Trash2 } from "lucide-react";
// import { Button } from "../ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../ui/pagination";
// import moment from "moment-timezone";
// import { Input } from "../ui/input";

// const AllSellers = () => {
//   const { sellers } = useSelector((state) => state.seller);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(getAllSellersAdmin());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(`${server}/shop/delete-seller/${id}`, {
//         withCredentials: true,
//       });
//       toast.success(res.data.message);
//       dispatch(getAllSellersAdmin());
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//     setOpen(false);
//   };

//   if (!sellers || sellers.length === 0) {
//     return (
//       <Card className="w-full mx-auto m-4">
//         <CardHeader>
//           <CardTitle>Quản lý shop</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Không có shop nào.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   const filteredSellers = sellers?.filter((seller) =>
//     seller.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredSellers?.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentSellers = filteredSellers?.slice(startIndex, endIndex);

//   return (
//     <Card className="w-full mx-auto m-4 flex flex-col h-[calc(100vh-6rem)]">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <CardTitle>Quản lý Shop</CardTitle>
//           <div className="flex w-full max-w-sm items-center space-x-2">
//             <Input
//               type="text"
//               placeholder="Tìm kiếm theo tên shop"
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
//               <TableHead>Shop ID</TableHead>
//               <TableHead>Tên shop</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Địa chỉ</TableHead>
//               <TableHead className="text-center">Ngày tham gia</TableHead>
//               <TableHead className="text-center">Xem shop</TableHead>
//               <TableHead className="text-center">Xoá Shop</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentSellers?.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item._id}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.email}</TableCell>
//                 <TableCell>
//                   {item.ward}, {item.district}, {item.city}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {moment(item.createdAt)
//                     .tz("Asia/Ho_Chi_Minh")
//                     .format("DD-MM-YYYY")}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Link to={`/shop/preview/${item._id}`}>
//                     <Button variant="ghost" size="sm">
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setUserId(item._id);
//                       setOpen(true);
//                     }}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//       <div className="mt-auto p-4 border-t">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               />
//             </PaginationItem>
//             {totalPages > 0 &&
//               Array.from({ length: totalPages }, (_, index) => (
//                 <PaginationItem key={index}>
//                   <PaginationLink
//                     onClick={() => setCurrentPage(index + 1)}
//                     isActive={currentPage === index + 1}
//                   >
//                     {index + 1}
//                   </PaginationLink>
//                 </PaginationItem>
//               ))}
//             <PaginationItem>
//               <PaginationNext
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Xác nhận xoá shop</DialogTitle>
//             <DialogDescription>
//               Bạn có chắc chắn muốn xoá shop này không?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setOpen(false)}>
//               Huỷ bỏ
//             </Button>
//             <Button onClick={() => handleDelete(userId)}>Xác nhận</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default AllSellers;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { getAllSellersAdmin } from "../../redux/actions/seller";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../ui/pagination";
import moment from "moment-timezone";
import { Input } from "../ui/input";

const AllSellers = () => {
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2; // Giảm số lượng item trên mỗi trang

  useEffect(() => {
    dispatch(getAllSellersAdmin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/shop/delete-seller/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllSellersAdmin());
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setOpen(false);
  };

  if (!sellers || sellers.length === 0) {
    return (
      <Card className="w-full mx-auto m-4 !bg-white !text-black">
        <CardHeader>
          <CardTitle>Quản lý shop</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Không có shop nào.</p>
        </CardContent>
      </Card>
    );
  }

  const filteredSellers = sellers?.filter((seller) =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSellers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSellers = filteredSellers?.slice(startIndex, endIndex);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="!bg-white !text-black"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Show current page and surrounding pages
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Card className="w-full mx-auto !border-none !rounded-none flex flex-col !bg-white !text-black">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <CardTitle>Quản lý Shop</CardTitle>
          <div className="w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên shop"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm !bg-white !text-black"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSellers?.map((item) => (
            <Card key={item._id} className="w-full !bg-white !text-black">
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground">ID: {item._id}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span>{item.email}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Địa chỉ:</span>
                  <span>
                    {item.ward}, {item.district}, {item.city}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">
                    Ngày tham gia:
                  </span>
                  <span>
                    {moment(item.createdAt)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY")}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Link to={`/shop/preview/${item._id}`}>
                  <Button variant="outline" size="sm" className="!bg-[#27b3e2] !text-white !border-none">
                    <Eye className="h-4 w-4 mr-2" />
                    Xem shop
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setUserId(item._id);
                    setOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xoá
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
      <div className="mt-auto p-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {renderPaginationItems()}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xoá shop</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xoá shop này không?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Huỷ bỏ
            </Button>
            <Button onClick={() => handleDelete(userId)}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AllSellers;