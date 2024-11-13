import Image from "next/image";

const Thumbnails = ({ newsData, setActiveIndex }) => {
  return (
    <div className="w-[30%] flex flex-col p-2 space-y-5">
      <h1 className="text-amber-400 text-xl font-bold">Up next</h1>
      {newsData.map((item, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)}
          className="p-1 w-full rounded-md bg-neutral-900 flex items-center cursor-pointer"
        >
          <Image
            className="rounded-md"
            src={item.newsPoster}
            width={100}
            height={100}
            alt={item.newsTitle}
          />
          <article className="flex flex-col capitalize pl-2">
            <h1>{item.newsTitle}</h1>
            <span className="text-neutral-400 text-[12px]">
              {item.newsDesc}
            </span>
          </article>
        </div>
      ))}
    </div>
  );
};

export default Thumbnails;
