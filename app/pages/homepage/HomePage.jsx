import MovieCardComponent from "@/app/movies/moviecard/MovieComponent";
import BornTodayActors from "../actorsborntoday/BornTodayActors";
import RecentlyView from "../recentlyview/RecentlyView";
import News from "../heronews/News";

const HomePage = () => {
  return (
    <main className="px-[5%]">
      <News />
      <MovieCardComponent
        category="superhero"
        subTitle="TV shows and Movies just for you"
        title="Top Picks"
      />
      <MovieCardComponent
        category="tv show"
        subTitle="Explore various TV Shows"
        title="TV Shows"
      />
      <BornTodayActors />
      <MovieCardComponent
        category="prime"
        subTitle="This month's Prime selection"
        title="Watch on Prime"
      />
      <RecentlyView />
    </main>
  );
};

export default HomePage;
