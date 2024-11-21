import { MdLocalMovies } from "react-icons/md";
import { CgScreen } from "react-icons/cg";
import { HiMiniStar } from "react-icons/hi2";
import { BsFillFileEarmarkPlayFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";

const menuDb = [
  {
    id: 0,
    name: "movies",
    icon: <MdLocalMovies />,
    subName: [
      "release calendar",
      "top 250 movies",
      "most popular movies",
      "browse movies by genre",
      "top box office",
      "showtimes & tickets",
      "movie news",
      "india movie spotlight",
    ],
  },
  {
    id: 1,
    name: "TV Shows",
    icon: <CgScreen />,
    subName: [
      "what's on TV & Streamings",
      "top 250 TV Shows",
      "most popular TV Shows",
      "Browse TV Shows by Genre",
      "TV News",
    ],
  },
  {
    id: 2,
    name: "awards & events",
    icon: <HiMiniStar />,
    subName: [
      "oscars",
      "STARmeter Awards",
      "wawards central",
      "festival central",
      "all events",
    ],
  },
  {
    id: 4,
    name: "watch",
    icon: <BsFillFileEarmarkPlayFill />,
    subName: [
      "what to watch",
      "latest trailers",
      "IMDb originals",
      "IMDb picks",
      "IMDb spotlight",
      "IMDb Podcasts",
    ],
  },
  {
    id: 5,
    name: "celebs",
    icon: <ImUsers />,
    subName: ["born today", "most popular celebs", "celebrity news"],
  },
];

export default menuDb;
