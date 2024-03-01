import Cards from "../../Components/Cards/Cards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Banner = () => {
  //Fetching the Data from the Query

  const fetchProducts = async () => {
    const { data } = await axios.get(`https://dummyjson.com/products?limit=40`);

    return data.products;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
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
    </>
  );
};

export default Banner;
