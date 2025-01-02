// import Header from "../components/Layout/Header";
// import Categories from "../components/Route/Categories/Categories";
// import BestDeals from "../components/Route/BestDeals/BestDeals";
// import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
// import Events from "../components/Route/Events/Events";
// import Footer from "../components/Layout/Footer";
// import Banner from "../components/Route/Hero/Banner";
// import NavBar from "../components/Layout/NavBar";
// import CategoriesList from "../components/Layout/CategoriesList";
// import PopupBanner from "../components/Route/Hero/BannerPopup";
// import ProductsInterested from "../components/Route/ProductsInterested/ProductsInterested";
// // import RecommendedProducts from "../components/Route/RecommendedProducts/RecommendedProducts";
// import MobileNav from "../components/Layout/MobileNav.jsx";

// const HomePage = () => {
//   return (
//     <div>
//       <PopupBanner />
//       <Header />
//       <div className="flex lg:w-[1300px] mx-auto justify-between">
//         <div className="hidden lg:block">
//           <Categories />
//         </div>
//         <div className="lg:w-[1050px] my-0 lg:my-4">
//           <Banner className="" />
//           <NavBar />
//           <BestDeals />
//           <ProductsInterested />
//           {/* <RecommendedProducts /> */}
//           <Events />
//           <FeaturedProduct />
//         </div>
//       </div>
//       <CategoriesList />
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;

import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Route/Events/Events";
import Footer from "../components/Layout/Footer";
import Banner from "../components/Route/Hero/Banner";
import NavBar from "../components/Layout/NavBar";
import CategoriesList from "../components/Layout/CategoriesList";
import PopupBanner from "../components/Route/Hero/BannerPopup";
import ProductsInterested from "../components/Route/ProductsInterested/ProductsInterested";
import MobileNav from "../components/Layout/MobileNav";

const HomePage = () => {
  return (
    <div className="pb-16 lg:pb-0 bg-white">
      {" "}
      {/* Thêm padding-bottom để tránh nội dung bị che khuất bởi thanh navigation */}
      <PopupBanner />
      <Header />
      <div className="flex lg:w-[1300px] mx-auto justify-between">
        <div className="hidden lg:block">
          <Categories />
        </div>
        <div className="lg:w-[1050px] my-0 lg:my-4">
          <Banner className="" />
          <NavBar />
          <BestDeals />
          <ProductsInterested />
          <Events />
          <FeaturedProduct />
        </div>
      </div>
      <CategoriesList />
      <Footer />
      <MobileNav />
    </div>
  );
};

export default HomePage;
