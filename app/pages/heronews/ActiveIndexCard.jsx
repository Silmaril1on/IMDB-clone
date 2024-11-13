import { slideShow } from "@/app/animations/framermotion";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import { motion, AnimatePresence } from "framer-motion";
import { IoPlayCircleOutline } from "react-icons/io5";
import Image from "next/image";

const ActiveIndexCard = ({
  active,
  direction,
  activeIndex,
  newsData,
  setDirection,
  setActiveIndex,
}) => {
  const slidePrev = () => {
    setDirection(-1);
    setActiveIndex(activeIndex === 0 ? newsData.length - 1 : activeIndex - 1);
  };
  const slideNext = () => {
    setDirection(1);
    setActiveIndex(activeIndex === newsData.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="w-[70%]">
      <section className="relative h-[550px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            variants={slideShow}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute h-[550px] w-full group"
            custom={direction}
            key={activeIndex}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-40%"></div>
            <Image
              className="object-cover w-full h-full rounded-2xl"
              src={active.newsBackground}
              width={800}
              height={800}
              alt={active.newsTitle}
            />
            <div className="flex w-full items-end absolute bottom-10 p-3">
              <div className="w-40 rounded-xl overflow-hidden">
                <Image
                  className="hover:brightness-90"
                  src={active.newsPoster}
                  width={400}
                  height={400}
                />
              </div>
              <article className="p-2 flex space-x-1">
                <IoPlayCircleOutline
                  size={80}
                  className="group-hover:text-amber-400"
                />
                <div className="flex flex-col space-y-3">
                  <h1 className="text-4xl capitalize">{active.newsTitle}</h1>
                  <span className="text-neutral-400 text-xl capitalize">
                    {active.newsDesc}
                  </span>
                </div>
              </article>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute w-full flex justify-between top-[35%]">
          <LeftButton onClick={slidePrev} />
          <RightButton onClick={slideNext} />
        </div>
      </section>
    </div>
  );
};

export default ActiveIndexCard;
