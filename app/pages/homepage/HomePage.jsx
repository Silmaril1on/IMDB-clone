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
        title="Superhero Movies"
        isShow={false}
      />
      <MovieCardComponent category="action" title="Top Pick" isShow={false} />

      <BornTodayActors />
      <MovieCardComponent category="tv show" title="TV Shows" isShow={true} />
      <MovieCardComponent category="prime" title="Watch on Prime now" />
      <RecentlyView />
    </main>
  );
};

export default HomePage;
