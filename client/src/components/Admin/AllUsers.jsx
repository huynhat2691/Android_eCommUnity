// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsersAdmin } from "../../redux/actions/user";
// import { Trash2 } from "lucide-react";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
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
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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

// const AllUsers = () => {
//   const { users } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(getAllUsersAdmin());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(`${server}/user/delete-user/${id}`, {
//         withCredentials: true,
//       });
//       toast.success(res.data.message);
//       dispatch(getAllUsersAdmin());
//     } catch (err) {
//       toast.error(err.response.data.message);
//     }
//     setOpen(false);
//   };

//   if (!users || users.length === 0) {
//     return (
//       <Card className="w-full mx-auto m-4">
//         <CardHeader>
//           <CardTitle>Quản lý người dùng</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Không có người dùng nào.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   const filteredUsers = users?.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentUsers = filteredUsers?.slice(startIndex, endIndex);

//   return (
//     <Card className="w-full mx-auto m-4 flex flex-col h-[calc(100vh-6rem)]">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <CardTitle>Quản lý người dùng</CardTitle>
//           <div className="flex w-full max-w-sm items-center space-x-2">
//             <Input
//               type="text"
//               placeholder="Tìm kiếm theo tên người dùng..."
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
//               <TableHead>User ID</TableHead>
//               <TableHead className="text-center">Tên</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead className="text-center">Vai trò</TableHead>
//               <TableHead className="text-center">Ngày tham gia</TableHead>
//               <TableHead className="text-center">Xoá người dùng</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentUsers?.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell>{item._id}</TableCell>
//                 <TableCell className="text-center">{item.name}</TableCell>
//                 <TableCell>{item.email}</TableCell>
//                 <TableCell className="text-center">{item.role}</TableCell>
//                 <TableCell className="text-center">
//                   {moment(item.createdAt)
//                     .tz("Asia/Ho_Chi_Minh")
//                     .format("DD-MM-YYYY")}
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
//             <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
//             <DialogDescription>Bạn muốn xoá người dùng này?</DialogDescription>
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

// export default AllUsers;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/actions/user";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import moment from "moment-timezone";
import { Input } from "../ui/input";

const AllUsers = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = window.innerWidth <= 768 ? 3 : 8; // Điều chỉnh số items trên mỗi trang

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${server}/user/delete-user/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      dispatch(getAllUsersAdmin());
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setOpen(false);
  };

  if (!users || users.length === 0) {
    return (
      <Card className="w-full mx-auto !border-none !rounded-none !bg-white !text-black">
        <CardHeader>
          <CardTitle>Quản lý người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Không có người dùng nào.</p>
        </CardContent>
      </Card>
    );
  }

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers?.slice(startIndex, endIndex);

  // Hàm tạo pagination items với dấu ...
  const getPaginationItems = () => {
    const items = [];
    const maxVisiblePages = window.innerWidth <= 768 ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 2) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          items.push(i);
        }
        items.push('...');
        items.push(totalPages);
      } else if (currentPage >= totalPages - (maxVisiblePages - 3)) {
        items.push(1);
        items.push('...');
        for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push('...');
        items.push(currentPage - 1);
        items.push(currentPage);
        items.push(currentPage + 1);
        items.push('...');
        items.push(totalPages);
      }
    }
    return items;
  };

  return (
    <Card className="w-full mx-auto !border-none !rounded-none flex flex-col h-full !bg-white !text-black">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <CardTitle>Quản lý người dùng</CardTitle>
          <div className="flex w-full sm:max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm !bg-white !text-black"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table >
            <TableHeader >
              <TableRow >
                <TableHead>User ID</TableHead>
                <TableHead className="text-center">Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Vai trò</TableHead>
                <TableHead className="text-center">Ngày tham gia</TableHead>
                <TableHead className="text-center">Xoá người dùng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody >
              {currentUsers?.map((item) => (
                <TableRow key={item._id} >
                  <TableCell>{item._id}</TableCell>
                  <TableCell className="text-center">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-center">{item.role}</TableCell>
                  <TableCell className="text-center">
                    {moment(item.createdAt)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setUserId(item._id);
                        setOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {currentUsers?.map((item) => (
            <Card key={item._id} className="p-4 !bg-white !text-black">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Tên:</span>
                  <span>{item.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Email:</span>
                  <span className="text-sm">{item.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Vai trò:</span>
                  <span>{item.role}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">Ngày tham gia:</span>
                  <span>
                    {moment(item.createdAt)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY")}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setUserId(item._id);
                      setOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
            {getPaginationItems().map((item, index) => (
              <PaginationItem key={index}>
                {item === '...' ? (
                  <span className="px-4">...</span>
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(item)}
                    isActive={currentPage === item}
                    className="!bg-white !text-black"
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
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
            <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
            <DialogDescription>Bạn muốn xoá người dùng này?</DialogDescription>
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

export default AllUsers;