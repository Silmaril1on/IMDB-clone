import { getWarning, handleReviewPanel } from "@/app/features/moviesSlice";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ReviewsBar = ({ reviewData, onFilterChange }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-5 w-full">
        <h1> {reviewData.length} reviews</h1>
      </div>
      <div className="w-full flex flex-col space-y-2 items-end">
        <button
          onClick={() => {
            if (!user) {
              dispatch(getWarning());
              return;
            } else {
              dispatch(handleReviewPanel());
            }
          }}
          className="blue-hover bg-transparent font-bold px-5 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Review</span>
        </button>
        <div className="w-full flex justify-end items-center space-x-2">
          <span className="text-black font-bold">Ratings</span>
          <SelectInput onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
};

const SelectInput = ({ onFilterChange }) => {
  const [selectedRating, setSelectedRating] = useState("");

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedRating(value);
    onFilterChange(value); // Notify parent component of the selected filter
  };
  return (
    <div>
      <select
        id="ratingFilter"
        value={selectedRating}
        onChange={handleSelectChange}
        className="hover:bg-blue-200 duration-300 cursor-pointer bg-transparent rounded-lg p-2"
      >
        <option value="">Show All</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {`Star ${i + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReviewsBar;
