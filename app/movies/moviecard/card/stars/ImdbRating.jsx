import LoadingSpin from "@/app/components/LoadingSpin";
import { FaStar } from "react-icons/fa";

const ImdbRating = ({ movieTitle, imdbRating }) => {
  return (
    <div className="center space-x-2 w-16">
      <FaStar className="text-amber-400" />
      <span className="text-neutral-200">
        {imdbRating !== null ? imdbRating[movieTitle] : <LoadingSpin />}
      </span>
    </div>
  );
};

export default ImdbRating;
