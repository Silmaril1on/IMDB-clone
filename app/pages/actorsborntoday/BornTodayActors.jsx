"use client";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import SectionHeader from "@/app/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const BornTodayActors = () => {
  const { actors } = useSelector((store) => store.movie);
  const itemsPerPage = 6;
  const cardWidth = 208;
  const cardMargin = 10;
  const [currentIndex, setCurrentIndex] = useState(0);

  const today = new Date();
  const todayMonthDay = today.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const actorsBornToday = actors.filter((actor) => {
    const actorBirthMonthDay = actor.birthDate.split(",")[0].trim();
    return actorBirthMonthDay === todayMonthDay;
  });

  const calculateAge = (birthDate) => {
    const birthYear = parseInt(birthDate.split(",")[1].trim());
    const currentYear = today.getFullYear();
    const birthMonthDay = new Date(
      `${today.getFullYear()} ${birthDate.split(",")[0]}`
    );
    const hasHadBirthdayThisYear = today >= birthMonthDay;
    return currentYear - birthYear - (hasHadBirthdayThisYear ? 0 : 1);
  };

  const slideNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, actorsBornToday.length - itemsPerPage)
    );
  };

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  return (
    <section>
      <div className="inline-flex flex-col mb-5">
        <SectionHeader>Born today</SectionHeader>
        <span className="pl-8 text-neutral-400 text-sm">
          People born on {todayMonthDay}
        </span>
      </div>
      <div
        className="overflow-hidden relative flex items-center group"
        style={{ width: `${(cardWidth + 2 * cardMargin) * itemsPerPage}px` }}
      >
        <div
          style={{
            transform: `translateX(-${
              currentIndex * (cardWidth + 2 * cardMargin)
            }px)`,
            width: `${(cardWidth + 2 * cardMargin) * actorsBornToday.length}px`,
          }}
          className="pl-8 flex items-center"
        >
          {actorsBornToday.map((item) => {
            const actorAge = calculateAge(item.birthDate);
            return (
              <Link key={item.id} href={`/actors/${item.actorName}`}>
                <div
                  style={{
                    width: `${cardWidth}px`,
                    margin: `0 ${cardMargin}px`,
                  }}
                  className="flex flex-col items-center space-y-2 hover:brightness-75"
                >
                  <div className="w-52 h-52 overflow-hidden rounded-full">
                    <Image
                      className="w-auto h-auto"
                      width={500}
                      height={500}
                      src={item.actorAvatar}
                      alt={item.actorName}
                    />
                  </div>
                  <article className="flex items-center flex-col">
                    <h1>{item.actorName}</h1>
                    <span className="text-neutral-400">{actorAge}</span>
                  </article>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="absolute opacity-0 group-hover:opacity-100 mb-20 w-full flex justify-between *:absolute *:z-10">
          <LeftButton className="left-8" onClick={slidePrev} />
          <RightButton className="right-8" onClick={slideNext} />
        </div>
      </div>
    </section>
  );
};

export default BornTodayActors;
