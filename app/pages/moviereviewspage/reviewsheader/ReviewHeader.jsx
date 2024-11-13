import Image from "next/image";
import HeaderLinks from "../../singlemoviepage/moviehero/movieheadline/HeaderLinks";
import Link from "next/link";

const ReviewHeader = ({ data }) => {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${data.moviePoster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grad absolute inset-0 z-0"></div>
      <div className="backdrop-blur-3xl px-[8%] flex flex-col h-full text-white py-5">
        <HeaderLinks data={data} />
        <div className="flex items-end">
          <div className="w-24">
            <Image
              width={400}
              height={400}
              src={data.moviePoster}
              alt={data.movieTitle}
            />
          </div>
          <article className="flex flex-col p-4">
            <Link
              href={`/${data.movieTitle}`}
              className="text-neutral-300 font-bold text-xl capitalize hover:underline"
            >
              {data.movieTitle}
            </Link>
            <h1 className="text-6xl">User reviews</h1>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
