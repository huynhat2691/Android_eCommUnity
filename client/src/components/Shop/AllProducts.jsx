import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsShop,
  shopDeleteProduct,
} from "../../redux/actions/product";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit, Eye, ImageIcon, Loader2, Trash } from "lucide-react";
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
import { backend_url } from "../../server";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (_id) => {
    dispatch(shopDeleteProduct(_id))
      .then(() => {
        toast.success("Xóa sản phẩm thành công");
        if (currentProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      })
      .catch((error) => {
        toast.error("Xóa sản phẩm thất bại: " + error.message);
      });
  };

  const handleViewProduct = (item) => {
    if (item.status === "approved") {
      navigate(`/product/${item._id}`);
    }
  };

  const handleUpdateProduct = (product) => {
    const productToEdit = {
      ...product,
      images: product.images.map((img) => ({
        url: `${backend_url}/${img}`,
        file: null,
      })),
    };
    navigate(`/dashboard/add-product`, {
      state: { product: productToEdit },
    });
  };

  const handlePreviewProduct = (product) => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  };

  const renderPreviewContent = () => {
    if (!previewProduct) return null;

    const images = previewProduct.images.map((image) => ({
      original: `${backend_url}${image}`,
      thumbnail: `${backend_url}${image}`,
    }));

    const getMinMaxPrice = () => {
      if (previewProduct.hasClassifications) {
        const prices = previewProduct.classifications.map(
          (c) => c.discountPrice
        );
        return `${Math.min(...prices).toLocaleString()}₫ - ${Math.max(
          ...prices
        ).toLocaleString()}₫`;
      }
      return `${previewProduct.discountPrice.toLocaleString()}₫`;
    };

    const getClassificationGroups = () => {
      if (!previewProduct.hasClassifications) return null;
      return (
        <div className="space-y-2">
          <h4 className="font-bold text-[16px]">Phân loại:</h4>
          <p>
            {previewProduct.group1.name}:{" "}
            {previewProduct.group1.values.join(", ")}
          </p>
          {previewProduct.group2.name && (
            <p>
              {previewProduct.group2.name}:{" "}
              {previewProduct.group2.values.join(", ")}
            </p>
          )}
        </div>
      );
    };

    const getAvatarSrc = (avatar) => {
      if (avatar && avatar.startsWith("data:image")) {
        return avatar;
      } else if (avatar) {
        return `${backend_url}${avatar}`;
      }
      return "";
    };

    const getStockInfo = () => {
      if (previewProduct.hasClassifications) {
        return previewProduct.classifications.map((c, index) => (
          <div key={index} className="flex items-center ">
            <p className="min-w-[80px]">
              {`${c.group1}${c.group2 ? ` - ${c.group2}` : ""}:`}
            </p>
            <p>{`${c.stock}`}</p>
          </div>
        ));
      }
      return <p>{previewProduct.stock}</p>;
    };

    return (
      <div >
        <div>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={true}
            lazyLoad={true}
            thumbnailPosition="bottom"
            useBrowserFullscreen={false}
            slideOnThumbnailOver={true}
          />
        </div>

        <div className="space-y-4 mt-32 overflow-auto h-[250px]">
          <div className="flex items-center space-x-2">
            <p className="text-[16px] font-bold mr-2">Shop:</p>
            <Avatar>
              <AvatarImage
                src={getAvatarSrc(previewProduct.shop.avatar)}
                alt={previewProduct.shop.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <AvatarFallback>
                {previewProduct.shop.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{previewProduct.shop.name}</p>
          </div>
          <div className="flex items-center">
            {previewProduct.isUsed && (
              <div className="mr-1">
                <p className=" text-xs border-[red] border font-semibold text-[red] mt-[2px] px-[2px]">
                  Hàng cũ
                </p>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex items-center">
            <p className="text-[16px] font-bold mr-2 ">
              Tên sản phẩm:
            </p>
            <p className="max-w-[250px]">{previewProduct.name}</p>
          </div>
          <Separator />
          <div className="flex items-center">
            <p className="text-[16px] font-bold mr-2">Giá:</p>
            <p>{getMinMaxPrice()}</p>
          </div>
          {previewProduct.hasClassifications && (
            <>
              <Separator />
              <div>{getClassificationGroups()}</div>
            </>
          )}
          <Separator />
          <div className="">
            <h4 className="font-bold mr-2">Số lượng:</h4>
            {getStockInfo()}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Card className="w-full mx-auto !border-none !rounded-none !bg-white !text-black">
        <CardHeader>
          <CardTitle>Quản lý sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Không có sản phẩm nào.</p>
        </CardContent>
      </Card>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Hàm để xác định lớp CSS cho trạng thái
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "approved":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full mx-auto !border-none !rounded-none flex flex-col h-full !bg-white !text-black">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quản lý sản phẩm</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm !bg-white !text-black"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Mã sản phẩm</TableHead>
              <TableHead className="w-[200px] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                Tên sản phẩm
              </TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Giá gốc</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Giảm giá</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Giá khuyến mãi</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Phân loại</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Số lượng</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Đã bán</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Trạng thái</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                Xem/Xem trước sản phẩm
              </TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Cập nhật</TableHead>
              <TableHead className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">Xoá sản phẩm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold" title={item.name}>
                  {item.name}
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  {item.hasClassifications
                    ? `${item.classifications[0].price.toLocaleString()}`
                    : `${item.price.toLocaleString()}`}
                  <sup>₫</sup>
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  {item.hasClassifications
                    ? `${item.classifications[0].percentageDiscount}%`
                    : `${item.percentageDiscount}%`}
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  {item.hasClassifications
                    ? `${item.classifications[0].discountPrice.toLocaleString()}`
                    : `${item.discountPrice.toLocaleString()}`}
                  <sup>₫</sup>
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  {item.hasClassifications ? (
                    <span className="text-green-500">Có</span>
                  ) : (
                    <span className="text-red-500">Không</span>
                  )}
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  {item.hasClassifications
                    ? item.classifications.reduce(
                        (total, classification) => total + classification.stock,
                        0
                      )
                    : item.stock}
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">{item.sold_out}</TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  <span
                    className={`px-2 py-1 rounded-full ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status === "pending" && "Chờ duyệt"}
                    {item.status === "approved" && "Đã duyệt"}
                    {item.status === "rejected" && "Từ chối"}
                  </span>
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewProduct(item)}
                    disabled={item.status !== "approved"}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreviewProduct(item)}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateProduct(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center text-ellipsis overflow-hidden whitespace-nowrap text-xs font-semibold">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                  className="!bg-white !text-black"
                >
                  {index + 1}
                </PaginationLink>
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

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <DialogContent className=" !bg-white !text-black h-screen">
          <DialogHeader>
            <DialogTitle>Xem trước sản phẩm</DialogTitle>
          </DialogHeader>
          {renderPreviewContent()}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AllProducts;
