import ImdbProLogo from "@/app/components/ImdbProLogo";

const CrewInfo = ({ data }) => {
  const directors = data.movieDirectors;
  const writers = data.movieWriters;
  const stars = data.movieActors;
  return (
    <section className="*:py-3 *:border-neutral-500 *:border-t">
      <MovieDirectors data={directors} />
      <MovieWriters data={writers} />
      <MovieStars data={stars} />
      <div className="flex items-center space-x-5">
        <ImdbProLogo />
        <h1 className="link-style font-bold">See production info at IMDbPro</h1>
      </div>
    </section>
  );
};

const MovieDirectors = ({ data }) => {
  return (
    <div className="flex items-center">
      <h1 className="font-bold text-neutral-200 w-20">Directors</h1>
      <div className="flex">
        {data.map((item, index) => {
          const directors = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div key={index} className="flex items-center space-x-3 ml-2">
              <h1 className="link-style">{directors}</h1>
              {index < data.length - 1 && <span className="mx-1">•</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MovieWriters = ({ data }) => {
  return (
    <div className="flex items-center">
      <h1 className="font-bold text-neutral-200 w-20">Writers</h1>
      <div className="flex">
        {data.map((item, index) => {
          const writers = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <div key={index} className="flex items-center space-x-3 ml-2">
              <h1 className="link-style capitalize">{writers}</h1>
              {index < data.length - 1 && <span className="mx-1">•</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MovieStars = ({ data }) => {
  return (
    <div className="flex items-center ">
      <h1 className="font-bold text-neutral-200 w-20">Stars</h1>
      <div className="flex">
        {data.slice(0, 3).map((item, index) => {
          return (
            <div key={index} className="flex items-center space-x-3 ml-2">
              <h1 className="link-style capitalize">{item.actorName}</h1>
              {index < data.slice(0, 3).length - 1 && (
                <span className="mx-1">•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CrewInfo;
