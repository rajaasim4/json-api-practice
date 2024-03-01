import Cards from "../../Components/Cards/Cards";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { FaDeleteLeft, FaStar } from "react-icons/fa6";
const DeleteProduct = () => {
  const queryClient = useQueryClient();
  const fetchProducts = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products`);

    return data.products;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchInterval: 3000,
  });

  const deleteProduct = async (id) => {
    console.log(id);
    let data = await axios.delete(`https://dummyjson.com/products/${id.id}`);
  };

  const deleteProductMutation = useMutation({
    mutationFn: (delId) => deleteProduct(delId),
  });

  const handleDelete = async (productId) => {
    deleteProductMutation.mutate({ id: productId });
  };

  return (
    <>
      {deleteProductMutation.isPending ? (
        "Deleting Data..."
      ) : (
        <>
          {deleteProductMutation.isError ? (
            <div>An error occurred: {deleteProductMutation.error.message}</div>
          ) : null}

          {deleteProductMutation.isSuccess ? (
            <div className="text-center text-xl mt-4">Data deleted!</div>
          ) : null}
        </>
      )}
      <div className="mx-auto w-11/12 mt-10 flex flex-wrap justify-evenly gap-x-3 gap-y-9 pb-10">
        {isLoading ? (
          <h2 className="text-3xl">Loading...</h2>
        ) : isError ? (
          "Error fetching data"
        ) : !data || data.length === 0 ? (
          "No data"
        ) : (
          data.map((item) => {
            const {
              brand,
              category,
              description,
              discountPercentage,
              id,
              images,
              price,
              rating,
              stock,
              thumbnail,
              title,
            } = item;
            return (
              <div
                className="max-w-sm  overflow-hidden shadow-lg rounded-xl relative"
                key={item.id}
              >
                <img
                  className="w-full h-[300px] object-contain"
                  src={thumbnail}
                  alt="Product Image"
                />
                <div className="px-6 py-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold ">{brand}</h3>
                  <div className="font-bold text-xl mb-2">{title}</div>
                  <h3 className="text-lg font-semibold line-through">
                    ${discountPercentage}
                  </h3>
                  <h3 className="text-xl font-semibold">${price}</h3>
                  <div className="flex items-center gap-x-3">
                    <span className="text-yellow-400">
                      <FaStar />
                    </span>
                    <h3 className="text-sm font-semibold">{rating}</h3>
                  </div>
                  <h3 className="text-sm font-semibold my-2">Stock:{stock}</h3>
                  <p className="text-gray-700 text-base">{description}</p>
                </div>
                <button
                  className="text-red-500 absolute bottom-5 right-5 text-xl"
                  onClick={() => handleDelete(id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default DeleteProduct;
