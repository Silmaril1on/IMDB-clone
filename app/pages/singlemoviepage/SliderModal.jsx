"use client";
import { useSelector } from "react-redux";
import MovieImageSlider from "./moviehero/moviemedia/photogallery/MovieImageSlider";

const SliderModal = ({ data }) => {
  const { openPhotos } = useSelector((store) => store.movie);
  return <div>{openPhotos && <MovieImageSlider data={data} />}</div>;
};

export default SliderModal;
