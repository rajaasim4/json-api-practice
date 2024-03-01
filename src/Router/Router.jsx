import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import Addproduct from "../Pages/AddProduct/Addproduct";
import Navbar from "../Components/Navbar/Navbar";
import DeleteProduct from "../Pages/DeleteProduct/DeleteProduct";
import Paginated from "../Pages/Paginated/Paginated";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";

const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddProduct" element={<Addproduct />} />
        <Route path="/DeleteProduct" element={<DeleteProduct />} />
        <Route path="/UpdateProduct/:productid" element={<UpdateProduct />} />
        <Route path="/Paginated" element={<Paginated />} />
        <Route
          path="/singleproduct/:singleproduct"
          element={<SingleProduct />}
        />
      </Routes>
    </>
  );
};

export default Router;
