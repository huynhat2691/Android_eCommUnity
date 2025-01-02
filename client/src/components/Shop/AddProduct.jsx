/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import {
  addProduct,
  getAllProductsShop,
  resetAddProductSuccess,
  updateProduct,
} from "../../redux/actions/product";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronRight, ImagePlus, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { backend_url } from "../../server";
import { Checkbox } from "../ui/checkbox";

const AddProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryPath, setCategoryPath] = useState([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClassification, setShowClassification] = useState(false);
  const [showGroup2, setShowGroup2] = useState(false);
  const [group1, setGroup1] = useState({ name: "", values: [""] });
  const [group2, setGroup2] = useState({ name: "", values: [""] });
  const [classifications, setClassifications] = useState([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [percentageDiscount, setPercentageDiscount] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isUsed, setIsUsed] = useState(false);

  const location = useLocation();
  const productToUpdate = location.state?.product;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(
        "Thêm sản phẩm thành công, sản phẩm sẽ được duyệt trong vòng 24 giờ"
      );
      dispatch(getAllProductsShop());
      navigate("/dashboard/products");
      dispatch(resetAddProductSuccess());
    }
  }, [error, success, navigate, dispatch]);

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview && image.preview.startsWith("blob:")) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  useEffect(() => {
    const group1Values = group1.values.filter((v) => v !== "");
    const group2Values = group2.values.filter((v) => v !== "");

    if (group1Values.length > 0) {
      const newClassifications = group1Values.flatMap((value1) =>
        group2Values.length > 0
          ? group2Values.map((value2) => ({
              group1: value1,
              group2: value2,
              price: "",
              percentageDiscount: "",
              discountPrice: "",
              stock: "",
              sku: "",
            }))
          : [
              {
                group1: value1,
                group2: "",
                price: "",
                percentageDiscount: "",
                discountPrice: "",
                stock: "",
                sku: "",
              },
            ]
      );
      setClassifications(newClassifications);
    }
  }, [group1.values, group2.values]);

  useEffect(() => {
    if (price && percentageDiscount) {
      const discountedPrice = price * (1 - percentageDiscount / 100);
      setDiscountPrice(discountedPrice.toFixed(0));
    } else {
      setDiscountPrice("");
    }
  }, [price, percentageDiscount]);

  const updateClassification = (index, field, value) => {
    setClassifications((prevClassifications) => {
      const updatedClassifications = [...prevClassifications];
      updatedClassifications[index][field] = value;

      // Tính toán giá sau giảm
      if (field === "price" || field === "percentageDiscount") {
        const price = parseFloat(updatedClassifications[index].price) || 0;
        const percentageDiscount =
          parseFloat(updatedClassifications[index].percentageDiscount) || 0;
        const discountPrice = price * (1 - percentageDiscount / 100);
        updatedClassifications[index].discountPrice = discountPrice.toFixed(0);
      }

      return updatedClassifications;
    });
  };

  useEffect(() => {
    if (productToUpdate) {
      setName(productToUpdate.name || "");
      setDescription(productToUpdate.description || "");

      // Xử lý category
      if (productToUpdate.category) {
        const categoryId = parseInt(productToUpdate.category);
        const category = categoriesData.find((cat) => cat.id === categoryId);

        if (category) {
          let categoryPath = [{ id: category.id, title: category.title }];
          let categoryString = category.title;

          // Xử lý subcategory
          if (productToUpdate.subcategory) {
            const subcategoryId = parseInt(productToUpdate.subcategory);
            const subcategory = category.subcategories?.find(
              (sub) => sub.id === subcategoryId
            );

            if (subcategory) {
              categoryPath.push({
                id: subcategory.id,
                title: subcategory.title,
              });
              categoryString += ` > ${subcategory.title}`;

              // Xử lý subclassification
              if (productToUpdate.subclassification) {
                const subclassificationId = parseInt(
                  productToUpdate.subclassification
                );
                const subclassification = subcategory.subclassifications?.find(
                  (sub) => sub.id === subclassificationId
                );

                if (subclassification) {
                  categoryPath.push({
                    id: subclassification.id,
                    title: subclassification.title,
                  });
                  categoryString += ` > ${subclassification.title}`;
                }
              }
            }
          }

          setCategoryPath(categoryPath);
          setCategory(categoryString);
        }
      }

      setShowClassification(productToUpdate.hasClassifications || false);
      setImages(
        (productToUpdate.images || []).map((img) => ({
          preview: img.url || `${backend_url}/${img}`,
          file: img.file || null,
        }))
      );

      if (productToUpdate.hasClassifications) {
        setGroup1(productToUpdate.group1 || { name: "", values: [""] });
        setGroup2(productToUpdate.group2 || { name: "", values: [""] });
        setShowGroup2(!!productToUpdate.group2);
        setClassifications(productToUpdate.classifications || []);
      } else {
        setPrice(productToUpdate.price || "");
        setStock(productToUpdate.stock || "");
        setPercentageDiscount(productToUpdate.percentageDiscount || "");
        setDiscountPrice(productToUpdate.discountPrice || "");
      }
    }
  }, [productToUpdate]);

  useEffect(() => {
    if (!showClassification) {
      setPrice(productToUpdate?.price || "");
      setStock(productToUpdate?.stock || "");
      setPercentageDiscount(productToUpdate?.percentageDiscount || "");
      setDiscountPrice(productToUpdate?.discountPrice || "");
    } else {
      setClassifications(productToUpdate?.classifications || []);
    }
  }, [showClassification, productToUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();

    images.forEach((image, index) => {
      if (image.file) {
        newForm.append("images", image.file);
      } else if (image.preview) {
        // Đối với hình ảnh hiện có, chỉ gửi đường dẫn
        newForm.append(
          "existingImages",
          image.preview.replace(`${backend_url}/`, "")
        );
      }
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("shopId", seller._id);
    newForm.append("isUsed", isUsed);

    if (categoryPath.length > 0) {
      newForm.append("category", categoryPath[0].id);
      if (categoryPath.length > 1) {
        newForm.append("subcategory", categoryPath[1].id);
        if (categoryPath.length > 2) {
          newForm.append("subclassification", categoryPath[2].id);
        }
      }
    }

    if (showClassification) {
      newForm.append("hasClassifications", "true");
      newForm.append("group1", JSON.stringify(group1));
      if (group2.name) {
        newForm.append("group2", JSON.stringify(group2));
      }
      const updatedClassifications = classifications.map((classification) => ({
        ...classification,
        percentageDiscount: classification.percentageDiscount || "0",
        discountPrice: classification.discountPrice || classification.price,
      }));
      newForm.append("classifications", JSON.stringify(updatedClassifications));
    } else {
      newForm.append("hasClassifications", "false");
      newForm.append("price", price || "");
      newForm.append("stock", stock || "");
      newForm.append("percentageDiscount", percentageDiscount || "0");
      newForm.append("discountPrice", discountPrice || price || "0");
    }

    if (productToUpdate) {
      dispatch(updateProduct(productToUpdate._id, newForm));
    } else {
      dispatch(addProduct(newForm));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file: file,
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      if (newImages[index].file) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleCategorySelect = (item, level) => {
    const newPath = categoryPath.slice(0, level);
    newPath.push(item);
    setCategoryPath(newPath);
  };

  const handleCategoryConfirm = () => {
    setCategory(categoryPath.map((item) => item.title).join(" > "));
    setCategoryDialogOpen(false);
  };

  const filteredCategories = categoriesData.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleClassification = () => {
    setShowClassification(!showClassification);
  };

  const handleValueChange = (groupNumber, index, value) => {
    const targetGroup = groupNumber === 1 ? group1 : group2;
    const setTargetGroup = groupNumber === 1 ? setGroup1 : setGroup2;

    const newValues = [...targetGroup.values];
    newValues[index] = value;
    if (index === newValues.length - 1 && value !== "") {
      newValues.push("");
    }
    setTargetGroup((prev) => ({ ...prev, values: newValues }));
  };

  const handleAddGroup2 = () => {
    setShowGroup2(true);
    setGroup2({ name: "", values: [""] });
  };

  const handleRemoveGroup2 = () => {
    setShowGroup2(false);
    setGroup2({ name: "", values: [""] });

    // Cập nhật classifications để bao gồm giá trị cho nhóm 2
    setClassifications((prevClassifications) =>
      prevClassifications.map((classification) => ({
        ...classification,
        group2: "", // Thêm giá trị mặc định cho group2
      }))
    );
  };

  return (
    <ScrollArea className="h-full"> 
      <Card className="w-full !border-none !rounded-none !bg-white !text-black">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Thêm sản phẩm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <Label>
                Hình ảnh sản phẩm <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <div className="flex flex-wrap gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt=""
                        className="size-[80px] object-cover rounded-lg border"
                      />
                      <Button
                        onClick={() => removeImage(index)}
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-50 size-[20px]"
                      >
                        <AiOutlineClose size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                <div
                  {...getRootProps()}
                  className="border-2 mx-4 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-50 flex flex-col justify-center items-center size-[80px]"
                >
                  <input {...getInputProps()} />
                  <AiOutlineCloudUpload
                    className="text-gray-400 mb-2"
                    size={30}
                  />
                  {isDragActive ? (
                    <p className="text-gray-600">Thả hình ảnh vào đây</p>
                  ) : (
                    <div className="flex flex-col justify-center items-center size-[78px]">
                      <ImagePlus size={25} className="text-gray-600" />
                      <p className="text-gray-600 text-[14px]">Thêm hình ảnh</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="name">
                Tên sản phẩm <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                required
                maxlength="120"
                className="!bg-white !text-black"
              />
            </div>

            <div className="space-y-4 ">
              <Label htmlFor="category">
                Ngành hàng <span className="text-red-500">*</span>
              </Label>
              <Dialog
                open={categoryDialogOpen}
                onOpenChange={setCategoryDialogOpen}
              >
                <DialogTrigger asChild>
                  <Input
                    type="text"
                    id="category"
                    value={category}
                    placeholder="Chọn danh mục cho sản phẩm"
                    readOnly
                    className="cursor-pointer text-start !bg-white !text-black"
                    required
                    
                  />
                </DialogTrigger>
                <DialogContent className="max-w-[960px] h-full !bg-white !text-black">
                  <DialogHeader>
                    <DialogTitle>Chọn ngành hàng</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 !bg-white !text-black">
                    <Input
                      placeholder="Vui lòng nhập tối thiểu 1 ký tự."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="!bg-white !text-black"
                    />
                    <div className="grid grid-cols-3 gap-1 border rounded-md p-2 !bg-white !text-black">
                      <div className="leading-8 border-r ">
                        <ScrollArea className="h-[400px] !bg-white !text-black">
                          <ul className="space-y-1">
                            {filteredCategories.map((category) => (
                              <li
                                key={category.id}
                                onClick={() =>
                                  handleCategorySelect(category, 0)
                                }
                                className={`cursor-pointer flex items-center justify-between ${
                                  categoryPath[0]?.id === category.id
                                    ? "font-bold text-[#27b3e2]"
                                    : ""
                                }  hover:bg-[#f6f6f6] hover:rounded-sm   `}
                              >
                                <span className="max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap ">
                                  {category.title}
                                </span>
                                {category.subcategories && (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                      {categoryPath[0] && (
                        <div className="leading-8 border-r">
                          <ScrollArea className="h-[400px]">
                            <Label htmlFor="subcategory" className="sr-only">
                              Danh mục con
                            </Label>
                            <ul className="space-y-1">
                              {categoryPath[0].subcategories?.map(
                                (subcategory) => (
                                  <li
                                    key={subcategory.id}
                                    id="subcategory"
                                    onClick={() =>
                                      handleCategorySelect(subcategory, 1)
                                    }
                                    className={`cursor-pointer flex items-center justify-between ${
                                      categoryPath[1]?.id === subcategory.id
                                        ? "font-bold text-[#27b3e2]"
                                        : ""
                                    } hover:bg-[#f6f6f6] hover:rounded-sm `}
                                  >
                                    <span className="max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap">
                                      {subcategory.title}
                                    </span>
                                    {subcategory.subclassifications && (
                                      <ChevronRight className="h-4 w-4" />
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </ScrollArea>
                        </div>
                      )}
                      {categoryPath[1] &&
                        categoryPath[1].subclassifications && (
                          <div className="leading-8">
                            <ScrollArea className="h-[400px]">
                              <Label
                                htmlFor="subclassification"
                                className="sr-only"
                              >
                                Phân loại con
                              </Label>
                              <ul className="space-y-1">
                                {categoryPath[1].subclassifications.map(
                                  (subclassification) => (
                                    <li
                                      key={subclassification.id}
                                      id="subclassification"
                                      onClick={() =>
                                        handleCategorySelect(
                                          subclassification,
                                          2
                                        )
                                      }
                                      className={`cursor-pointer ${
                                        categoryPath[2]?.id ===
                                        subclassification.id
                                          ? "font-bold text-[#27b3e2]"
                                          : ""
                                      } hover:bg-[#f6f6f6] hover:rounded-sm  max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap`}
                                    >
                                      {subclassification.title}
                                    </li>
                                  )
                                )}
                              </ul>
                            </ScrollArea>
                          </div>
                        )}
                    </div>
                    <div className="flex items-start">
                      <p>
                        {categoryPath.length > 0 && (
                          <span className="font-[500]">Đã chọn:</span>
                        )}
                      </p>
                      <Breadcrumb className="grid grid-cols-1 gap-4">
                        {categoryPath.map((item, index) => (
                          <BreadcrumbList
                            key={item.id}
                            className="pl-2 flex items-center"
                          >
                            <BreadcrumbItem className="!text-[16px]">
                              <BreadcrumbLink>{item.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < categoryPath.length - 1 && (
                              <BreadcrumbSeparator />
                            )}
                          </BreadcrumbList>
                        ))}
                      </Breadcrumb>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCategoryDialogOpen(false)}
                      className="!bg-white !text-black "
                    >
                      Hủy
                    </Button>
                    <Button onClick={handleCategoryConfirm} className="!bg-[#27b3e2] !text-white mb-2">Xác nhận</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              <Label htmlFor="description">
                Mô tả sản phẩm <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả sản phẩm"
                required
                className="!bg-white !text-black"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-4">
                {!showClassification && (
                  <Button type="button" onClick={toggleClassification} className="!bg-[#27b3e2] !text-white">
                    Thêm nhóm phân loại
                  </Button>
                )}

                {!showClassification && (
                  <>
                    <Input
                      id="price"
                      placeholder="Giá"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="!bg-white !text-black"
                    />
                    <Input
                      id="percentageDiscount"
                      placeholder="% Giảm giá"
                      value={percentageDiscount}
                      onChange={(e) => setPercentageDiscount(e.target.value)}
                      className="!bg-white !text-black"
                    />
                    <Input
                      id="discountPrice"
                      placeholder="Giá sau giảm"
                      value={discountPrice}
                      readOnly
                      className="!bg-white !text-black"
                    />
                    <Input
                      id="stock"
                      placeholder="Kho hàng"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                      className="!bg-white !text-black"
                    />
                  </>
                )}
              </div>

              {showClassification && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="group1Name">Nhóm phân loại 1</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleClassification}
                        aria-label="Xóa nhóm phân loại 1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="group1Name"
                        placeholder="Tên nhóm phân loại (màu sắc, kích cỡ...)"
                        value={group1.name}
                        onChange={(e) =>
                          setGroup1({ ...group1, name: e.target.value })
                        }
                        required
                        className="!bg-white !text-black"
                      />
                    </div>
                    <div className="space-y-2">
                      {group1.values.map((value, index) => (
                        <Input
                          key={index}
                          id={`group1Value${index}`}
                          placeholder="Phân loại mới"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(1, index, e.target.value)
                          }
                          required
                          className="!bg-white !text-black"
                        />
                      ))}
                    </div>
                  </div>

                  {!showGroup2 && (
                    <Button type="button" onClick={handleAddGroup2} className="!bg-[#27b3e2] !text-white">
                      Thêm nhóm phân loại 2
                    </Button>
                  )}

                  {showGroup2 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="group2Name">Nhóm phân loại 2</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveGroup2}
                          aria-label="Xóa nhóm phân loại 2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Input
                          id="group2Name"
                          placeholder="Tên nhóm phân loại (phiên bản...)"
                          value={group2.name}
                          onChange={(e) =>
                            setGroup2({ ...group2, name: e.target.value })
                          }
                          required
                          className="!bg-white !text-black"
                        />
                      </div>
                      <div className="space-y-2">
                        {group2.values.map((value, index) => (
                          <Input
                            key={index}
                            id={`group2Value${index}`}
                            placeholder="Phân loại mới"
                            value={value}
                            onChange={(e) =>
                              handleValueChange(2, index, e.target.value)
                            }
                            required
                            className="!bg-white !text-black"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="classificationTable">
                      Danh sách phân loại hàng
                    </Label>

                    {/* Desktop view */}
                    <div className="hidden md:block">
                      <table id="classificationTable" className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {group1.name || "Nhóm phân loại 1"}
                            </th>
                            {showGroup2 && (
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {group2.name || "Nhóm phân loại 2"}
                              </th>
                            )}
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Giá
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              % Giảm giá
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Giá sau giảm
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Kho hàng
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SKU phân loại
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {classifications.map((classification, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                {classification.group1}
                              </td>
                              {showGroup2 && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {classification.group2}
                                </td>
                              )}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Input
                                  id={`price${index}`}
                                  value={classification.price}
                                  onChange={(e) =>
                                    updateClassification(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  className="w-full"
                                  required
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Input
                                  id={`percentageDiscount${index}`}
                                  value={classification.percentageDiscount}
                                  onChange={(e) =>
                                    updateClassification(
                                      index,
                                      "percentageDiscount",
                                      e.target.value
                                    )
                                  }
                                  className="w-full"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Input
                                  id={`discountPrice${index}`}
                                  value={classification.discountPrice}
                                  readOnly
                                  className="w-full bg-gray-100"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Input
                                  id={`stock${index}`}
                                  value={classification.stock}
                                  onChange={(e) =>
                                    updateClassification(
                                      index,
                                      "stock",
                                      e.target.value
                                    )
                                  }
                                  className="w-full"
                                  required
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Input
                                  id={`sku${index}`}
                                  value={classification.sku}
                                  onChange={(e) =>
                                    updateClassification(
                                      index,
                                      "sku",
                                      e.target.value
                                    )
                                  }
                                  className="w-full"
                                  required
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile view */}
                    <div className="block md:hidden">
                      {classifications.map((classification, index) => (
                        <div
                          key={index}
                          className="mb-6 bg-white p-4 rounded-lg shadow"
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                {group1.name || "Nhóm phân loại 1"}
                              </label>
                              <div className="mt-1">
                                {classification.group1}
                              </div>
                            </div>

                            {showGroup2 && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  {group2.name || "Nhóm phân loại 2"}
                                </label>
                                <div className="mt-1">
                                  {classification.group2}
                                </div>
                              </div>
                            )}

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Giá
                              </label>
                              <Input
                                id={`price-mobile-${index}`}
                                value={classification.price}
                                onChange={(e) =>
                                  updateClassification(
                                    index,
                                    "price",
                                    e.target.value
                                  )
                                }
                                className="mt-1 !bg-white !text-black"
                                required
                                
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                % Giảm giá
                              </label>
                              <Input
                                id={`percentageDiscount-mobile-${index}`}
                                value={classification.percentageDiscount}
                                onChange={(e) =>
                                  updateClassification(
                                    index,
                                    "percentageDiscount",
                                    e.target.value
                                  )
                                }
                                className="mt-1 !bg-white !text-black"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Giá sau giảm
                              </label>
                              <Input
                                id={`discountPrice-mobile-${index}`}
                                value={classification.discountPrice}
                                readOnly
                                className="mt-1 !bg-gray-100 !text-black"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Kho hàng
                              </label>
                              <Input
                                id={`stock-mobile-${index}`}
                                value={classification.stock}
                                onChange={(e) =>
                                  updateClassification(
                                    index,
                                    "stock",
                                    e.target.value
                                  )
                                }
                                className="mt-1 !bg-white !text-black"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                SKU phân loại
                              </label>
                              <Input
                                id={`sku-mobile-${index}`}
                                value={classification.sku}
                                onChange={(e) =>
                                  updateClassification(
                                    index,
                                    "sku",
                                    e.target.value
                                  )
                                }
                                className="mt-1 !bg-white !text-black"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isUsed"
                checked={isUsed}
                onCheckedChange={(checked) => setIsUsed(checked)}
              />
              <label
                htmlFor="isUsed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[red]"
              >
                Sản phẩm đã qua sử dụng?
              </label>
            </div>

            <div className="flex items-center justify-center">
              <Link to="/dashboard/products" className="mr-4 w-full">
                <Button variant="outline" className="w-full !bg-white !text-black">
                  Huỷ
                </Button>
              </Link>
              <Button type="submit" className="w-full !bg-[#27b3e2] !text-white">
                Lưu & Hiển thị
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default AddProduct;
