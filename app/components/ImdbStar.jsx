import { FaStar } from "react-icons/fa";

const ImdbStar = ({ size, className }) => {
  return (
    <div>
      <FaStar className={className} size={size} />
    </div>
  );
};

export default ImdbStar;
