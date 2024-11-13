import ActorResult from "./ActorResult";
import MovieResult from "./MovieResult";

const SearchResults = ({ filteredResults, setIsOpen }) => {
  return (
    <>
      <div className="absolute top-[44px] -left-1 w-[82%] bg-stone-900 z-20 shadow-2xl rounded-sm overflow-hidden">
        {filteredResults.map((result, index) => (
          <div key={index} className="p-2 hover:bg-neutral-700">
            {result.type === "movie" ? (
              <MovieResult setIsOpen={setIsOpen} data={result} />
            ) : (
              <ActorResult setIsOpen={setIsOpen} data={result} />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
