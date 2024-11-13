"use client";
import StarsPanel from "@/app/movies/moviecard/card/stars/StarPanel";
import { useSelector } from "react-redux";

const SingleMoviesPanel = ({ movie }) => {
  const { openStarPanel } = useSelector((store) => store.movie);
  return <div>{openStarPanel && <StarsPanel movie={movie} />}</div>;
};

export default SingleMoviesPanel;
