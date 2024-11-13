import ImdbStar from "@/app/components/ImdbStar";
import SpoilerButton from "./SpoilerButton";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const UserReview = ({ reviewData, handleLikeDislike }) => {
  return (
    <div>
      {reviewData.map((item) => {
        return (
          <div key={item.id} className="flex flex-col space-y-3 my-7">
            <article className="border border-neutral-400/50 p-4 rounded-xl shadow-md relative">
              <div className="absolute w-4 h-4 -bottom-2 left-6 bg-neutral-100 border-b border-r border-neutral-500/50 rotate-45" />
              <div className="text-sm text-gray-600 flex items-center space-x-1">
                <ImdbStar className="text-amber-400" size={15} />
                {item.movieRating ? (
                  <span>{item.movieRating}/10</span>
                ) : (
                  <span>NO RATING</span>
                )}
              </div>
              <h1 className="font-bold my-2 capitalize text-xl text-black">
                {item.movieHeadline}
              </h1>
              {item.spoiler ? (
                <SpoilerButton item={item} />
              ) : (
                <p>{item.movieReview}</p>
              )}
              <LikesSection item={item} handleLikeDislike={handleLikeDislike} />
            </article>
            <article className="flex items-center space-x-2 pl-2">
              <h1 className="link-style">{item.author}</h1>
              <span className="mx-1">•</span>
              <span className="text-black">{item.createdAt}</span>
            </article>
          </div>
        );
      })}
    </div>
  );
};

const LikesSection = ({ handleLikeDislike, item }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex items-center space-x-3 *:flex *:items-center *:space-x-1 mt-3 text-black/90">
      <div>
        <div
          className="cursor-pointer"
          onClick={() => handleLikeDislike(item.id, "like")}
        >
          {item.likes.includes(user?.uid) ? (
            <AiFillLike size={25} className="text-stone-600" />
          ) : (
            <AiOutlineLike size={25} />
          )}
        </div>
        <h1>Helpful</h1>
        <span className="mx-1">•</span>
        <span>{item.likes.length || 0}</span>
      </div>
      <div>
        <div
          className="cursor-pointer"
          onClick={() => {
            handleLikeDislike(item.id, "dislike");
          }}
        >
          {item.dislikes.includes(user?.uid) ? (
            <AiFillDislike size={25} className="text-stone-600" />
          ) : (
            <AiOutlineDislike size={25} />
          )}
        </div>
        <span>{item.dislikes.length || 0}</span>
      </div>
    </div>
  );
};

export default UserReview;
