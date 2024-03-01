import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
const SingleProduct = () => {
  const fetchProducts = async (id) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
      if (data && data.brand && data.title) {
        return data;
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (error) {
      throw new Error("Error fetching product data");
    }
  };
  const id = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleproducts", id.singleproduct],
    queryFn: () => fetchProducts(id.singleproduct),
  });
  return (
    <>
      {isLoading ? (
        <h2 className="text-3xl">Loading...</h2>
      ) : isError ? (
        "Error fetching data"
      ) : !data || data.length === 0 ? (
        "No data"
      ) : (
        <div className="flex justify-center items-center w-full min-h-screen  flex-col  gap-y-5">
          <h2 className="text-xl">Single Product</h2>
          <div className="max-w-sm  overflow-hidden shadow-lg rounded-xl w-[300px]">
            <div className="">
              <img
                className="w-full h-[300px] object-contain"
                src={data.thumbnail}
                alt="Product Image"
              />
              {}
            </div>
            <div className="px-6 py-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold ">{data.brand}</h3>
              <div className="font-bold text-xl mb-2">{data.title}</div>
              <h3 className="text-lg font-semibold line-through">
                ${data.discountPercentage}
              </h3>
              <h3 className="text-xl font-semibold">${data.price}</h3>
              <div className="flex items-center gap-x-3">
                <span className="text-yellow-400">
                  <FaStar />
                </span>
                <h3 className="text-sm font-semibold">{data.rating}</h3>
              </div>
              <h3 className="text-sm font-semibold my-2">Stock:{data.stock}</h3>
              <p className="text-gray-700 text-base">{data.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
