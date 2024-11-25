"use client";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const StatisticsTable = ({ data }) => {
  const movieId = data.id;
  const [ratingStats, setRatingStats] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const docRef = doc(db, "movie ratings", movieId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const ratings = docSnap.data().ratings || [];
          setTotalRatings(ratings.length);
          const stats = Array(10).fill(0);
          ratings.forEach((rating) => {
            if (rating.movieRating >= 1 && rating.movieRating <= 10) {
              stats[rating.movieRating - 1] += 1;
            }
          });
          const formattedStats = stats.map((count, index) => ({
            rating: index + 1,
            count,
            percentage:
              ratings.length > 0
                ? ((count / ratings.length) * 100).toFixed(1)
                : "0.0",
          }));
          setRatingStats(formattedStats);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };
    fetchRatings();
  }, [movieId]);

  return (
    <div className=" h-[700px] w-full pr-[10%]">
      <div className="my-7 flex flex-col space-y-5">
        <h1 className="relative gold-line-border pl-4 font-bold text-3xl">
          User ratings
        </h1>
        <div className="flex flex-col">
          <span className="text-[11px] uppercase font-semibold tracking-widest">
            filter by country
          </span>
          <span className="text-neutral-500 text-[11px]">
            Countries with the most ratings
          </span>
        </div>
      </div>
      {totalRatings > 0 ? (
        <div className="w-full flex flex-col space-y-1 p-1">
          {ratingStats.map((stat) => {
            const maxCount = Math.max(...ratingStats.map((s) => s.count));
            const dynamicWidth =
              stat.count > 0 ? (stat.count / maxCount) * 90 : 0;
            return (
              <div
                key={stat.rating}
                className="relative flex items-center text-black space-x-2"
              >
                <span className="font-bold w-6 text-center">{stat.rating}</span>
                <div className="flex-1 relative">
                  <div
                    style={{
                      width: `${dynamicWidth}%`,
                    }}
                    className={`bg-amber-400 rounded-md py-4 ${
                      dynamicWidth === 0 ? "bg-opacity-10" : ""
                    }`}
                  ></div>
                  <div
                    className="absolute top-0 px-2 text-neutral-400 font-bold h-full flex items-center space-x-1 text-sm"
                    style={{ left: `${dynamicWidth}%` }}
                  >
                    <span>{stat.percentage}%</span>
                    <span>({stat.count})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-300">No ratings available for this movie.</p>
      )}
    </div>
  );
};

export default StatisticsTable;
