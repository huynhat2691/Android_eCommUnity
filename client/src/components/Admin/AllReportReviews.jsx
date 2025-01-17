// import { useEffect, useState } from "react";
// import axios from "axios";
// import { server } from "../../server";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
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
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../ui/pagination";
// import { toast } from "react-toastify";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { adminGetAllProducts } from "../../redux/actions/product";

// const AllReportReviews = () => {
//   const { adminAllProducts } = useSelector((state) => state.product);
//   const [reports, setReports] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const itemsPerPage = 8;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   useEffect(() => {
//     dispatch(adminGetAllProducts());
//   }, [dispatch]);

//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(
//         `${server}/reviewReport/admin/review-reports`
//       );
//       setReports(response.data);
//     } catch (error) {
//       console.error("Lỗi khi lấy danh sách báo cáo đánh giá:", error);
//       toast.error("Không thể tải danh sách báo cáo đánh giá");
//     }
//   };

//   const handleUpdateStatus = async (reportId, newStatus) => {
//     try {
//       await axios.put(`${server}/reviewReport/review-report/${reportId}`, {
//         status: newStatus,
//       });
//       fetchReports();
//       toast.success("Đã cập nhật trạng thái báo cáo");
//     } catch (error) {
//       console.error("Lỗi khi cập nhật trạng thái:", error);
//       toast.error("Không thể cập nhật trạng thái báo cáo");
//     }
//   };

//   const handleDeleteReport = async (reportId) => {
//     try {
//       await axios.delete(`${server}/reviewReport/review-report/${reportId}`);
//       // Cập nhật trạng thái của báo cáo trong state local
//       setReports(
//         reports.map((report) =>
//           report._id === reportId ? { ...report, status: "resolved" } : report
//         )
//       );
//       toast.success("Đã xóa đánh giá khỏi sản phẩm");
//     } catch (error) {
//       console.error("Lỗi khi xóa đánh giá:", error);
//       toast.error("Không thể xóa đánh giá");
//     }
//   };

//   if (!reports || reports.length === 0) {
//     return (
//       <Card className="w-full mx-auto m-4">
//         <CardHeader>
//           <CardTitle>Quản lý báo cáo đánh giá</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p>Không có báo cáo đánh giá nào.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   const filteredReports = reports.filter(
//     (report) =>
//       report.reviewId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.reason.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentReports = filteredReports.slice(startIndex, endIndex);

//   return (
//     <Card className="w-full mx-auto m-4 flex flex-col h-[calc(100vh-6rem)]">
//       <CardHeader>
//         <CardTitle>Quản lý báo cáo đánh giá</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-grow pt-4">
//         <div className="mb-4">
//           <Input
//             placeholder="Tìm kiếm theo ID đánh giá hoặc lý do"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>ID Đánh giá</TableHead>
//               <TableHead className="text-center">Người báo cáo</TableHead>
//               <TableHead className="text-center">Vai trò</TableHead>
//               <TableHead className="text-center">Lý do</TableHead>
//               <TableHead className="text-center">Mô tả</TableHead>
//               <TableHead className="text-center">Trạng thái</TableHead>
//               <TableHead className="text-center">Hành động</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentReports.map((report) => (
//               <TableRow key={report._id}>
//                 <TableCell>{report.reviewId}</TableCell>
//                 <TableCell className="text-center">
//                   {report.reporterId?.name || report.reporterId}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {report.reporterId?.role || "Khách hàng"}
//                 </TableCell>
//                 <TableCell className="text-center">{report.reason}</TableCell>
//                 <TableCell className="text-center">
//                   {adminAllProducts
//                     ?.find((product) => product._id === report.productId)
//                     ?.reviews.find((review) => review._id === report.reviewId)
//                     ?.comment || "Không có bình luận"}
//                 </TableCell>
//                 <TableCell className="text-center flex items-center justify-center">
//                   <Select
//                     defaultValue={report.status}
//                     onValueChange={(value) =>
//                       handleUpdateStatus(report._id, value)
//                     }
//                   >
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Chọn trạng thái" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pending">Chưa giải quyết</SelectItem>
//                       <SelectItem value="resolved">Đã giải quyết</SelectItem>
//                       <SelectItem value="rejected">Từ chối</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </TableCell>
//                 <TableCell className="text-center w-[180px]">
//                   {report.status === "resolved" ? (
//                     <span className="text-green-500">Đã xóa đánh giá</span>
//                   ) : (
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleDeleteReport(report._id)}
//                       className="w-full"
//                     >
//                       Xóa đánh giá
//                     </Button>
//                   )}
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
//             {Array.from({ length: totalPages }, (_, index) => (
//               <PaginationItem key={index}>
//                 <PaginationLink
//                   onClick={() => setCurrentPage(index + 1)}
//                   isActive={currentPage === index + 1}
//                 >
//                   {index + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
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
//     </Card>
//   );
// };

// export default AllReportReviews;
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllProducts } from "../../redux/actions/product";

const AllReportReviews = () => {
  const { adminAllProducts } = useSelector((state) => state.product);
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, [dispatch]);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `${server}/reviewReport/admin/review-reports`
      );
      setReports(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách báo cáo đánh giá:", error);
      toast.error("Không thể tải danh sách báo cáo đánh giá");
    }
  };

  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      await axios.put(`${server}/reviewReport/review-report/${reportId}`, {
        status: newStatus,
      });
      fetchReports();
      toast.success("Đã cập nhật trạng thái báo cáo");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái báo cáo");
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await axios.delete(`${server}/reviewReport/review-report/${reportId}`);
      // Cập nhật trạng thái của báo cáo trong state local
      setReports(
        reports.map((report) =>
          report._id === reportId ? { ...report, status: "resolved" } : report
        )
      );
      toast.success("Đã xóa đánh giá khỏi sản phẩm");
    } catch (error) {
      console.error("Lỗi khi xóa đánh giá:", error);
      toast.error("Không thể xóa đánh giá");
    }
  };

  if (!reports || reports.length === 0) {
    return (
      <Card className="w-full mx-auto !border-none !rounded-none !bg-white !text-black">
        <CardHeader>
          <CardTitle>Quản lý báo cáo đánh giá</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Không có báo cáo đánh giá nào.</p>
        </CardContent>
      </Card>
    );
  }

  const filteredReports = reports.filter(
    (report) =>
      report.reviewId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  const renderPaginationItems = () => {
    let items = [];
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
      // Thêm trang đầu
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

      // Thêm dấu ... nếu cần
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }

      // Thêm các trang xung quanh trang hiện tại
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

      // Thêm dấu ... nếu cần
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationLink>...</PaginationLink>
          </PaginationItem>
        );
      }

      // Thêm trang cuối
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
    <Card className="w-full mx-auto  !border-none !rounded-none flex flex-col h-full !bg-white !text-black">
      <CardHeader>
        <CardTitle>Quản lý báo cáo đánh giá</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <Input
            placeholder="Tìm kiếm theo ID đánh giá hoặc lý do"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!bg-white !text-black"
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {currentReports.map((report) => (
            <Card key={report._id} className="p-4 !bg-white !text-black">
              <div className="space-y-2">
                <div className=" space-x-2">
                  <span className="font-semibold">ID Đánh giá:</span>
                  <span className="text-sm">{report.reviewId}</span>
                </div>
                <div className=" space-x-2">
                  <span className="font-semibold">Người báo cáo:</span>
                  <span className="text-sm">
                    {report.reporterId?.name || report.reporterId}
                  </span>
                </div>
                <div className=" space-x-2">
                  <span className="font-semibold">Vai trò:</span>
                  <span className="text-sm">
                    {report.reporterId?.role || "Khách hàng"}
                  </span>
                </div>
                <div className=" space-x-2">
                  <span className="font-semibold">Lý do:</span>
                  <span className="text-sm">{report.reason}</span>
                </div>
                <div className=" space-x-2">
                  <span className="font-semibold">Mô tả:</span>
                  <span className="text-sm">
                    {adminAllProducts
                      ?.find((product) => product._id === report.productId)
                      ?.reviews.find((review) => review._id === report.reviewId)
                      ?.comment || "Không có bình luận"}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="font-semibold">Trạng thái:</span>
                  <Select
                    defaultValue={report.status}
                    onValueChange={(value) =>
                      handleUpdateStatus(report._id, value)
                    }
                  >
                    <SelectTrigger className="w-full !bg-white !text-black">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chưa giải quyết</SelectItem>
                      <SelectItem value="resolved">Đã giải quyết</SelectItem>
                      <SelectItem value="rejected">Từ chối</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2 text-center">
                  {report.status === "resolved" ? (
                    <span className="text-green-500">Đã xóa đánh giá</span>
                  ) : (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteReport(report._id)}
                      className="w-full"
                    >
                      Xóa đánh giá
                    </Button>
                  )}
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
    </Card>
  );
};

export default AllReportReviews;
