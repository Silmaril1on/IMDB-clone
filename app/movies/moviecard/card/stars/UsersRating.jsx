import { useDispatch, useSelector } from "react-redux";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getWarning, handleStarPanel } from "@/app/features/moviesSlice";
import { useEffect, useState } from "react";
import LoadingSpin from "@/app/components/LoadingSpin";
import { fetchUserRatings } from "@/app/utils";

const UsersRating = ({ setSelectedMovie, item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [userRating, setUserRating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserRating = async () => {
      setLoading(true);
      try {
        const ratingsData = await fetchUserRatings(item.movieTitle);
        const userSpecificRating = ratingsData.find(
          (rating) => rating.email === user?.email
        );
        setUserRating(userSpecificRating?.movieRating || null);
      } catch (error) {
        console.error("Error fetching user rating:", error);
      }
      setLoading(false);
    };
    if (user) getUserRating();
  }, [item.movieTitle, user]);

  return (
    <div
      className="px-3 space-x-1 center hover:bg-neutral-600 duration-300 cursor-pointer rounded-sm"
      onClick={(e) => {
        if (!user) {
          dispatch(getWarning());
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        setSelectedMovie(item);
        dispatch(handleStarPanel());
      }}
    >
      {loading ? (
        <LoadingSpin />
      ) : (
        <span className="">
          {userRating !== null ? (
            <span className="flex items-center">
              <FaStar className="text-blue-600 cursor-pointer mr-1" />
              {userRating}
            </span>
          ) : (
            <FaRegStar className="text-blue-600 cursor-pointer" />
          )}
        </span>
      )}
    </div>
  );
};

export default UsersRating;
