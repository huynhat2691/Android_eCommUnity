/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Separator } from "../components/ui/separator";
import { Filter } from "lucide-react";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const { allProducts } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [rating, setRating] = useState(-1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showNoClassifications, setShowNoClassifications] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Lọc và tạo danh sách các thành phố duy nhất
    const uniqueCities = [
      ...new Set(allProducts?.map((product) => product.shop.city)),
    ];
    setCities(uniqueCities);
  }, [allProducts]);

  useEffect(() => {
    const filtered =
      allProducts &&
      allProducts.filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const shopNameMatch = product.shop.name
          .toLowerCase()
          .includes(query.toLowerCase());
        const categoryMatch = product.category
          .toLowerCase()
          .includes(query.toLowerCase());
        const subcategoryMatch = product.subcategory
          .toLowerCase()
          .includes(query.toLowerCase());
        const subclassificationMatch = product.subclassification
          ?.toLowerCase()
          .includes(query.toLowerCase());

        const lowestPrice =
          product.classifications.length > 0
            ? Math.min(
                ...product.classifications.map((c) => parseInt(c.price, 10))
              )
            : parseInt(product.price, 10);

        const priceMatch =
          lowestPrice >= priceRange[0] && lowestPrice <= priceRange[1];

        const ratingMatch = rating === -1 || product.ratings >= rating;

        const classificationMatch = showNoClassifications
          ? !product.hasClassifications
          : true;

        const cityMatch =
          selectedCities.length === 0 ||
          selectedCities.includes(product.shop.city);

        return (
          (nameMatch ||
            shopNameMatch ||
            categoryMatch ||
            subcategoryMatch ||
            subclassificationMatch) &&
          priceMatch &&
          ratingMatch &&
          classificationMatch &&
          cityMatch
        );
      });

    // Sắp xếp sản phẩm
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "bestSelling":
        filtered.sort((a, b) => b.sold_out - a.sold_out);
        break;
      case "priceLowToHigh":
        filtered.sort((a, b) => {
          const aPrice =
            a.classifications.length > 0
              ? Math.min(...a.classifications.map((c) => parseInt(c.price, 10)))
              : parseInt(a.price, 10);
          const bPrice =
            b.classifications.length > 0
              ? Math.min(...b.classifications.map((c) => parseInt(c.price, 10)))
              : parseInt(b.price, 10);
          return aPrice - bPrice;
        });
        break;
      case "priceHighToLow":
        filtered.sort((a, b) => {
          const aPrice =
            a.classifications.length > 0
              ? Math.max(...a.classifications.map((c) => parseInt(c.price, 10)))
              : parseInt(a.price, 10);
          const bPrice =
            b.classifications.length > 0
              ? Math.max(...b.classifications.map((c) => parseInt(c.price, 10)))
              : parseInt(b.price, 10);
          return bPrice - aPrice;
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [
    query,
    allProducts,
    priceRange,
    rating,
    sortBy,
    showNoClassifications,
    selectedCities,
  ]);

  const handlePriceFilter = () => {
    const min = minPrice === "" ? 0 : parseInt(minPrice, 10);
    const max = maxPrice === "" ? 1000000000 : parseInt(maxPrice, 10);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    } else {
      alert("Vui lòng nhập khoảng giá hợp lệ.");
    }
  };

  const setPriceRangePreset = (min, max) => {
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
    setPriceRange([min, max]);
  };

  const handleCityToggle = (city) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const FilterContent = () => (
    <>
      <div className="flex items-center m-2 mx-4">
        <Filter size={20} />
        <h3 className="text-lg font-semibold ml-4">Bộ Lọc Tìm Kiếm</h3>
      </div>
      <Separator />
      {/* Filter nơi bán */}
      <div className="mb-4">
        <Label className="block font-semibold my-4">Nơi bán</Label>
        <div className="max-h-60 overflow-y-auto">
          {cities.map((city) => (
            <div key={city} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCityToggle(city)}
                className="mr-2"
              />
              <Label htmlFor={city}>{city}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filter khoảng giá */}
      <div className="mb-4">
        <Label className="block font-semibold my-4">Khoảng giá</Label>
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Giá từ"
            className="w-1/2 p-2 border rounded mr-2"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Đến giá"
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <Button
          onClick={handlePriceFilter}
          className="w-full p-2 !bg-[#27b3e2] !text-white rounded"
        >
          Áp dụng
        </Button>
      </div>

      {/* Các nút khoảng giá */}
      <div className="mb-4 flex flex-wrap">
        <Button
          variant="outline"
          onClick={() => setPriceRangePreset(0, 100000)}
          className="m-1 p-2 border rounded !bg-[#27b3e2] !text-white !border-none"
        >
          Dưới 100k
        </Button>
        <Button
          variant="outline"
          onClick={() => setPriceRangePreset(100000, 500000)}
          className="m-1 p-2 border rounded !bg-[#27b3e2] !text-white !border-none"
        >
          100k - 500k
        </Button>
        <Button
          variant="outline"
          onClick={() => setPriceRangePreset(500000, 1000000)}
          className="m-1 p-2 border rounded !bg-[#27b3e2] !text-white !border-none"
        >
          500k - 1tr
        </Button>
        <Button
          variant="outline"
          onClick={() => setPriceRangePreset(1000000, 1000000000)}
          className="m-1 p-2 border rounded !bg-[#27b3e2] !text-white !border-none"
        >
          Trên 1tr
        </Button>
      </div>

      <Separator />

      {/* Filter đánh giá */}
      <div className="mb-4">
        <Label className="block font-semibold my-4">Đánh giá</Label>
        <div className="flex flex-col">
          {[5, 4, 3, 2, 1].map((star) => (
            <Button
              variant="outlined"
              key={star}
              onClick={() => setRating(star)}
              className={`my-1 items-center p-2 ${
                rating === star ? "bg-[#27b3e2] text-white" : ""
              }`}
            >
              <div className="flex items-center justify-between w-[120px]">
                <div>
                  {[...Array(star)].map((_, index) => (
                    <span key={index} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2">trở lên</span>
              </div>
            </Button>
          ))}
          <Button
            variant="outlined"
            onClick={() => setRating(-1)}
            className={`p-2 ${rating === -1 ? "bg-[#27b3e2] text-white" : ""}`}
          >
            Tất cả đánh giá
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <Header />
      <div className="max-w-[1300px] mx-auto px-4 ">
        <Breadcrumb className="flex items-center font-[500] overflow-x-auto">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-black">
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="!text-black">
                Kết quả tìm kiếm cho "{" "}
                <span className="text-[red] text-[18px]">{query}</span> "
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row bg-white border mt-4">
        {/* Filter cho Desktop */}
        <div className="hidden md:block w-1/5 p-4 ">
          <FilterContent />
        </div>

        {/* Filter cho Mobile */}

        {/* Kết quả tìm kiếm */}
        <div className="w-full md:w-4/5 p-4">
          {/* Nút sắp xếp */}
          <div className="flex sm:flex-row justify-between items-center mb-4 gap-4 ">
            <div className="md:hidden w-full ">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center !bg-[#27b3e2] !text-white !border-none !p-2"
                  >
                    <Filter className="mr-2" size={20} />
                    Lọc
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] !bg-white !text-black"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto">
                      <FilterContent />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSortBy("newest")}
                  className={`p-2 border rounded ${
                    sortBy === "newest"
                      ? "!bg-[#27b3e2] !text-white !border-none"
                      : "!bg-white !text-black"
                  }`}
                >
                  Mới nhất
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSortBy("bestSelling")}
                  className={`p-2 border rounded ${
                    sortBy === "bestSelling"
                      ? "!bg-[#27b3e2] !text-white !border-none"
                      : "!bg-white !text-black"
                  }`}
                >
                  Bán chạy
                </Button>
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 h-[40px] border rounded-md w-full sm:w-auto !bg-[#27b3e2] !text-white !border-none"

            >
              <option value="">Giá</option>
              <option value="priceLowToHigh">Giá từ thấp đến cao</option>
              <option value="priceHighToLow">Giá từ cao đến thấp</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  data={product}
                  isProductPage={true}
                />
              ))
            ) : (
              <p className="col-span-full flex items-center justify-center">
                Không tìm thấy sản phẩm nào phù hợp.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
