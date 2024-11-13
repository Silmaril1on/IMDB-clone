import { db } from "@/app/firebase/firebaseConfig";
import MovieCastPage from "@/app/pages/singlemoviepage/moviecast/moviecastpage/MovieCastPage";
import { collection, getDocs } from "firebase/firestore";

const fetchMovies = async () => {
  const movieCollection = collection(db, "movies");
  const movieSnapshot = await getDocs(movieCollection);
  const movies = movieSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return movies;
};

const fetchActors = async () => {
  const mactorCollection = collection(db, "actors");
  const actorSnapshot = await getDocs(mactorCollection);
  const actors = actorSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return actors;
};

export const generateMetadata = async ({ params }) => {
  const movies = await fetchMovies();
  const movieName = decodeURIComponent(params.moviename);
  const singleMovie = movies?.find((item) => item?.movieTitle === movieName);
  const capitalizeTitle = (title) => {
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return {
    title: `${capitalizeTitle(singleMovie?.movieTitle)} - Full Cast`,
  };
};

const MovieFullCastPage = async ({ params }) => {
  const movies = await fetchMovies();
  const actors = await fetchActors();
  const movieName = decodeURIComponent(params.moviename);
  const singleMovie = movies?.find((item) => item?.movieTitle === movieName);

  return (
    <section className="px-[15%] bg-neutral-300">
      <MovieCastPage data={singleMovie} actors={actors} />
    </section>
  );
};

export default MovieFullCastPage;
