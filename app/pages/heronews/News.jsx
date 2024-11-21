"use client";
import { useState } from "react";
import newsDb from "@/app/db/newsDb";
import ActiveIndexCard from "./ActiveIndexCard";
import Thumbnails from "./Thumbnails";

const News = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [newsData, setNewsData] = useState(newsDb);
  const itemsPerPage = 3;
  const thumbs = Array(itemsPerPage)
    .fill(null)
    .map((_, i) => newsDb[(activeIndex + 1 + i) % newsDb.length]);

  return (
    <section className="flex items-center space-x-2 px-8 mt-10">
      <ActiveIndexCard
        active={newsData[activeIndex]}
        activeIndex={activeIndex}
        direction={direction}
        setDirection={setDirection}
        newsData={newsData}
        setActiveIndex={setActiveIndex}
      />
      <Thumbnails
        newsData={thumbs}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
};

export default News;
