"use client";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import SectionHeader from "@/app/components/SectionHeader";
import { getRecentlyData } from "@/app/features/moviesSlice";
import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RecentlyView = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { recently } = useSelector((store) => store.movie);
  const itemsPerPage = 6;
  const cardWidth = 200;
  const cardMargin = 10;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasFetched, setHasFetched] = useState(false); // Track fetch status

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
      }
    };
    fetchRecentlyViewed();
  }, [user, hasFetched]);

  return (
    <div className="flex flex-col  items-center">
      <div className="w-full my-4">
        <SectionHeader>Recently viewed</SectionHeader>
      </div>
      <section
        className="overflow-hidden relative flex items-center group"
        style={{ width: `${(cardWidth + 2 * cardMargin) * itemsPerPage}px` }}
      >
        {recently.length > 0 ? (
          <div
            className="flex transition-transform duration-500 ease-in-out relative z-[5]"
            style={{
              transform: `translateX(-${
                currentIndex * (cardWidth + 2 * cardMargin)
              }px)`,
              width: `${(cardWidth + 2 * cardMargin) * recently.length}px`,
            }}
          >
            {recently.map((item) => {
              console.log(item);

              return (
                <div
                  style={{
                    width: `${cardWidth}px`,
                    margin: `0 ${cardMargin}px`,
                  }}
                  key={item.id}
                  className="rounded-xl hover:brightness-110 bg-neutral-800 overflow-hidden h-[330px]"
                >
                  <div className="h-[280px]">
                    <Image
                      className="w-full h-full object-cover"
                      src={item.poster}
                      alt={item.title}
                      width={400}
                      height={400}
                      priority
                    />
                  </div>
                  <h1 className="p-2">{item.title}</h1>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>no docs</h1>
        )}
        <div className="absolute opacity-0 group-hover:opacity-100 mb-20 w-full flex justify-between *:absolute *:z-10">
          <LeftButton className="left-[10px]" onClick={slidePrev} />
          <RightButton className="right-[10px]" onClick={slideNext} />
        </div>
      </section>
    </div>
  );
};

export default RecentlyView;
