import CrewInfo from "./CrewInfo";

const Categories = ({ data }) => {
  const genres = data.movieGenre;

  return (
    <div className="w-[60%] flex flex-col space-y-3">
      <div className="flex items-center space-x-3">
        {genres.map((item, index) => {
          const genre = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div
              className="border-neutral-400 rounded-2xl border px-4 py-1 cursor-pointer hover:bg-neutral-500/20"
              key={index}
            >
              <h1>{genre}</h1>
            </div>
          );
        })}
      </div>
      <p className="text-neutral-200">{data.movieBio}</p>
      <CrewInfo data={data} />
    </div>
  );
};

export default Categories;
