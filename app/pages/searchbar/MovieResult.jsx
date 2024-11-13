import Image from "next/image";
import Link from "next/link";

const MovieResult = ({ data, setIsOpen }) => {
  const { moviePoster, movieTitle, movieYear } = data;
  return (
    <Link href={`/${movieTitle}`}>
      <div
        onClick={() => setIsOpen(false)}
        className="flex items-center space-x-2"
      >
        <Image
          className="w-12 h-18 object-cover"
          src={moviePoster}
          alt={movieTitle}
          width={300}
          height={300}
        />
        <div>
          <h1 className="text-white">{movieTitle}</h1>
          <span className="text-neutral-300 text-sm">{movieYear}</span>
          <div className="flex iitems-center text-sm capitalize space-x-1 text-neutral-300">
            {data.movieActors.slice(0, 2).map((item, index) => {
              return (
                <h1 key={index}>
                  {item.actorName}
                  {index < data.movieActors.slice(0, 2).length - 1 && (
                    <span>,</span>
                  )}
                </h1>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieResult;
