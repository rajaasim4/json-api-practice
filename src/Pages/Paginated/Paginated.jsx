import Cards from "../../Components/Cards/Cards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const Banner = () => {
  //Fetching the Data from the Query
  //Fetching the Data from the Query
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const handleMove = (moveCount) => {
    setSkip((skip) => {
      return Math.max(skip + moveCount, 0);
    });
  };

  const fetchProducts = async () => {
    const { data } = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const calculatedTotalPages = Math.ceil(data.total / limit);
    setTotalPages(calculatedTotalPages);
    return data.products;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", limit, skip],
    queryFn: fetchProducts,
    refetchInterval: 3000,
  });

  return (
    <>
      <div className="mx-auto w-11/12 mt-10 flex flex-wrap justify-evenly gap-x-3 gap-y-9 pb-10">
        {isLoading ? (
          <h2 className="text-3xl">Loading...</h2>
        ) : isError ? (
          "Error fetching data"
        ) : !data || data.length === 0 ? (
          "No data"
        ) : (
          data.map((item) => <Cards key={item.id} {...item} />)
        )}
      </div>
      <div className="flex justify-center items-center gap-x-3 pb-4 text-white">
        <button
          className="bg-orange-400 px-5 py-2 rounded-md mr-3"
          onClick={() => handleMove(-limit)}
        >
          Prev
        </button>
        <div className="text-black">
          Page {Math.floor(skip / limit) + 1} of {totalPages || 1}
        </div>
        <button
          className="bg-orange-400 px-5 py-2 rounded-md mr-3"
          onClick={() => handleMove(limit)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Banner;
