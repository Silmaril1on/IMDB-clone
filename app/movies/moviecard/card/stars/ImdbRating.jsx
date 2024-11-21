import { FaStar } from "react-icons/fa";

const ImdbRating = ({ item }) => {
  return (
    <div className="flex items-center space-x-2 w-16">
      <FaStar className="text-amber-400" />
      <span className="text-neutral-200">{item.imdb ? item.imdb : 0}</span>
    </div>
  );
};

export default ImdbRating;
