import React from "react";
import ActorPoster from "./ActorPoster";
import ActorTrailer from "./ActorTrailer";
import ActorMediaCollection from "./ActorMediaCollection";

const ActorMedia = ({ data }) => {
  return (
    <div className="flex space-x-3">
      <ActorPoster data={data} />
      <ActorTrailer data={data} />
      <ActorMediaCollection data={data} />
    </div>
  );
};

export default ActorMedia;
