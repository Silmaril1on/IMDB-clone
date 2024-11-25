import Image from "next/image";

const RecentlyViewList = ({
  recently,
  currentIndex,
  cardWidth,
  cardMargin,
}) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
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
        return (
          <div
            style={{
              width: `${cardWidth}px`,
              margin: `0 ${cardMargin}px`,
            }}
            key={item.id}
            className="rounded-xl hover:brightness-110 bg-neutral-800 overflow-hidden h-[320px]"
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
            <h1 className="p-2">{truncateString(item.title, 20)}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default RecentlyViewList;
