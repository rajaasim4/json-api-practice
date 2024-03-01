import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Cards = (props) => {
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
  } = props;
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm  overflow-hidden shadow-lg rounded-xl"
      onClick={() => navigate(`/singleproduct/${id}`)}
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
    </div>
  );
};

export default Cards;
