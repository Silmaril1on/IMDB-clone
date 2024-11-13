const ActorHeader = ({ data }) => {
  return (
    <div className="w-[50%]">
      <h1 className="text-6xl capitalize text-neutral-200">{data.actorName}</h1>
      <div className="flex items-center space-x-3 text-neutral-300 mt-2">
        {data.actorWorks.map((item, index) => {
          return (
            <div key={index}>
              <span>{item}</span>
              {index !== data.actorWorks.length - 1 && (
                <span className="mx-1">•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActorHeader;
