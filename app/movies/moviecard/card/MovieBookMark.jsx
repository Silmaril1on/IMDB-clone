import BookmarkAddIcon from "@/app/components/BookmarkAddIcon";
import BookmarkSavedIcon from "@/app/components/BookmarkSavedIcon";

const MovieBookMark = ({ isInWatchlist, item, addToWatchlist }) => {
  return (
    <div
      className="absolute top-0 z-[3]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToWatchlist(item);
        console.log("clicked");
      }}
    >
      {isInWatchlist ? <BookmarkSavedIcon /> : <BookmarkAddIcon />}
    </div>
  );
};

export default MovieBookMark;
