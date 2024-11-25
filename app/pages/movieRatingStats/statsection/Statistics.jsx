import React from "react";
import StatHeader from "./StatHeader";
import MovieRatingsSection from "../../singlemoviepage/moviehero/movieheadline/MovieRatingsSection";
import StatisticsTable from "./StatisticsTable";
import WatchlistSide from "../../watchlistpage/watchlistSide/WatchlistSide";

const Statistics = ({ data }) => {
  return (
    <div className="px-[7%] border bg-neutral-100 text-black flex items-center">
      <div className="w-[65%]">
        <StatHeader />
        <MovieRatingsSection
          className="text-black justify-start"
          data={data}
          textColor="text-black"
        />
        <StatisticsTable data={{ id: data.id }} />
      </div>
      <WatchlistSide />
    </div>
  );
};

export default Statistics;
