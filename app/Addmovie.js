"use client";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "./firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieBio, setMovieBio] = useState("");
  const [movieType, setMovieType] = useState("");
  const [episodes, setEpisodes] = useState("");
  const [movieR, setMovieR] = useState("");
  const [prime, setPrime] = useState(false);
  const [movieTrailer, setMovieTrailer] = useState(
    "https://firebasestorage.googleapis.com/v0/b/movies-comics-8fa4c.appspot.com/o/universal-video.mp4?alt=media&token=07998fcf-a504-474f-b318-08a519969e07"
  );
  const [movieLength, setMovieLength] = useState("");
  const [moviePoster, setMoviePoster] = useState(null); // State for Movie Poster
  const [movieImage, setMovieImage] = useState(null);
  const [movieDirectors, setMovieDirectors] = useState([{ director: "" }]);
  const [movieWriters, setMovieWriters] = useState([{ writer: "" }]);
  const [movieGenre, setMovieGenre] = useState([{ genre: "" }]);
  const [movieActors, setMovieActors] = useState([
    { actorName: "", characterName: "", actorEpisodes: "" },
  ]);

  const uploadFile = async (file) => {
    if (!file) return null;
    const fileRef = ref(storage, `movie_posters/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleDirectorChange = (e, index) => {
    const updatedDirectors = [...movieDirectors];
    updatedDirectors[index].director = e.target.value;
    setMovieDirectors(updatedDirectors);
  };

  const addDirectorField = () => {
    setMovieDirectors([...movieDirectors, { director: "" }]);
  };

  const handleWritersChange = (e, index) => {
    const updatedWriters = [...movieWriters];
    updatedWriters[index].writer = e.target.value;
    setMovieWriters(updatedWriters);
  };

  const addWritersField = () => {
    setMovieWriters([...movieWriters, { writer: "" }]);
  };

  const handleGenreChange = (e, index) => {
    const updatedGenre = [...movieGenre];
    updatedGenre[index].genre = e.target.value;
    setMovieGenre(updatedGenre);
  };

  const addGenreField = () => {
    setMovieGenre([...movieGenre, { genre: "" }]);
  };

  const handleActorChange = (e, index, field) => {
    const updatedActors = [...movieActors];
    updatedActors[index][field] = e.target.value;
    setMovieActors(updatedActors);
  };

  const addActorField = () => {
    setMovieActors([
      ...movieActors,
      { actorName: "", characterName: "", actorEpisodes: "" },
    ]);
  };

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      const posterUrl = await uploadFile(moviePoster);
      const imageUrl = await uploadFile(movieImage);
      const preparedActors = movieActors.map((actor) => {
        const { actorName, characterName, actorEpisodes } = actor;
        return actorEpisodes
          ? { actorName, characterName, actorEpisodes }
          : { actorName, characterName };
      });
      const movieData = {
        movieTitle,
        movieLength,
        movieYear,
        isPrime: prime,
        movieBio,
        movieTrailer,
        moviePoster: posterUrl,
        movieImage: imageUrl,
        movieDirectors: movieDirectors.map((d) => d.director),
        movieWriters: movieWriters.map((d) => d.writer),
        movieGenre: movieGenre.map((g) => g.genre),
        movieActors: preparedActors,
        movieR,
      };
      if (movieType) {
        movieData.movieType = movieType;
      }
      if (episodes) {
        movieData.movieEpisodes = parseInt(episodes);
      }

      await addDoc(collection(db, "movies"), movieData);
      alert("Movie added successfully!");
      setMovieTitle("");
      setMovieYear("");
      setMovieBio("");
      setMovieR("");
      setMovieTrailer(
        "https://firebasestorage.googleapis.com/v0/b/movies-comics-8fa4c.appspot.com/o/universal-video.mp4?alt=media&token=07998fcf-a504-474f-b318-08a519969e07"
      );
      setMovieType("");
      setPrime(false);
      setMovieLength(""), setMoviePoster(null);
      setMovieImage(null);
      setMovieDirectors([{ director: "" }]);
      setMovieWriters([{ writer: "" }]);
      setMovieGenre([{ genre: "" }]);
      setMovieActors([{ actorName: "", characterName: "", actorEpisodes: "" }]);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  return (
    <form
      className="flex flex-col space-y-2 w-full items-center"
      onSubmit={addMovie}
    >
      <div className="flex flex-row space-x-2 justify-center *:bg-neutral-800 *:placeholder:text-amber-500">
        <input
          type="text"
          placeholder="Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Year"
          value={movieYear}
          onChange={(e) => setMovieYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Bio"
          value={movieBio}
          onChange={(e) => setMovieBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie r"
          value={movieR}
          onChange={(e) => setMovieR(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie trailer"
          value={movieTrailer}
          onChange={(e) => setMovieTrailer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie type"
          value={movieType}
          onChange={(e) => setMovieType(e.target.value)}
        />
        <input
          type="text"
          placeholder="episode numbers"
          value={episodes}
          onChange={(e) => setEpisodes(e.target.value)}
        />
        <div className="flex items-center space-x-1">
          <input
            id="prime"
            type="checkbox"
            checked={prime}
            onChange={() => setPrime(!prime)}
            className="mr-1"
          />
          <span>{prime ? "Yes" : "No"}</span>
        </div>
      </div>
      <div className="flex flex-row *:bg-neutral-800 *:placeholder:text-amber-500 space-x-2">
        {movieGenre.map((gen, index) => (
          <div key={index} className="flex items-center space-x-2 ">
            <input
              type="text"
              placeholder={`Genre ${index + 1}`}
              value={gen.genre}
              onChange={(e) => handleGenreChange(e, index)}
              className="bg-neutral-800 placeholder:text-amber-500"
            />
            {index === movieGenre.length - 1 && (
              <button
                type="button"
                onClick={addGenreField}
                className="bg-green-500 text-white px-2"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row *:bg-neutral-800 *:placeholder:text-amber-500 space-x-2">
        {movieDirectors.map((dir, index) => (
          <div key={index} className="flex items-center space-x-2 ">
            <input
              type="text"
              placeholder={`Director ${index + 1}`}
              value={dir.director}
              onChange={(e) => handleDirectorChange(e, index)}
              className="bg-neutral-800 placeholder:text-amber-500"
            />
            {index === movieDirectors.length - 1 && (
              <button
                type="button"
                onClick={addDirectorField}
                className="bg-green-500 text-white px-2"
              >
                +
              </button>
            )}
          </div>
        ))}
        <input
          type="text"
          placeholder="movie length"
          value={movieLength}
          onChange={(e) => setMovieLength(e.target.value)}
        />
        {movieWriters.map((wri, index) => (
          <div key={index} className="flex items-center space-x-2 ">
            <input
              type="text"
              placeholder={`writers ${index + 1}`}
              value={wri.writer}
              onChange={(e) => handleWritersChange(e, index)}
              className="bg-neutral-800 placeholder:text-amber-500"
            />
            {index === movieWriters.length - 1 && (
              <button
                type="button"
                onClick={addWritersField}
                className="bg-green-500 text-white px-2"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 *:m-1">
        {movieActors.map((actor, index) => (
          <div
            key={index}
            className="flex space-x-2 items-center *:placeholder:text-amber-500 *:bg-neutral-800"
          >
            <input
              type="text"
              placeholder={`Actor ${index + 1} Name`}
              value={actor.actorName}
              onChange={(e) => handleActorChange(e, index, "actorName")}
            />
            <input
              type="text"
              placeholder={`Actor ${index + 1} Character`}
              value={actor.characterName}
              onChange={(e) => handleActorChange(e, index, "characterName")}
            />
            <input
              type="text"
              placeholder={`Actor ${index + 1} episodes`}
              value={actor.actorEpisodes}
              onChange={(e) => handleActorChange(e, index, "actorEpisodes")}
            />
            {index === movieActors.length - 1 && (
              <button
                type="button"
                onClick={addActorField}
                className="bg-green-500 text-white px-2"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row *:placeholder:text-amber-500 space-x-2 *:bg-neutral-800">
        <label htmlFor="poster">Upload Movie Poster</label>
        <input
          type="file"
          id="poster"
          accept="image/*"
          onChange={(e) => setMoviePoster(e.target.files[0])}
        />
        <label htmlFor="image">Upload Movie Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setMovieImage(e.target.files[0])}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-44">
        Submit Movie
      </button>
    </form>
  );
};

export default AddMovie;
