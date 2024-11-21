"use client";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import SectionHeader from "@/app/components/SectionHeader";
import RecentlyViewList from "./RecentlyViewList";
import { getRecentlyData } from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecentlyView = () => {
  const { user } = useSelector((store) => store.user);
  const { recently } = useSelector((store) => store.movie);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);
  const dispatch = useDispatch();
  const itemsPerPage = 6;
  const cardWidth = 200;
  const cardMargin = 10;

  const slideNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, recently.length - itemsPerPage)
    );
  };

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  useEffect(() => {
    if (!user || hasFetched) return;
    const fetchRecentlyViewed = async () => {
      try {
        const userDocRef = doc(db, "recently viewed", user.email);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          dispatch(getRecentlyData(data.recentlyViewed || []));
        } else {
          console.log("No recently viewed items for this user.");
        }
      } catch (error) {
        console.error("Error fetching recently viewed items:", error);
      } finally {
        setHasFetched(true);
      }
    };
    fetchRecentlyViewed();
  }, [user, hasFetched, dispatch]);

  return (
    <div className="flex flex-col  items-center">
      <div className="w-full my-4">
        <SectionHeader>Recently Viewed</SectionHeader>
      </div>
      <section
        className="overflow-hidden relative flex items-center group"
        style={{ width: `${(cardWidth + 2 * cardMargin) * itemsPerPage}px` }}
      >
        <RecentlyViewList
          recently={recently}
          currentIndex={currentIndex}
          cardWidth={cardWidth}
          cardMargin={cardMargin}
        />
        <div className="absolute opacity-0 group-hover:opacity-100 mb-20 w-full flex justify-between *:absolute *:z-10">
          <LeftButton className="left-[10px]" onClick={slidePrev} />
          <RightButton className="right-[10px]" onClick={slideNext} />
        </div>
      </section>
    </div>
  );
};

export default RecentlyView;
