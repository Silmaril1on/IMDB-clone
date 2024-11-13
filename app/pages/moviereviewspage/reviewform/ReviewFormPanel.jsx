"use client";
import { useSelector } from "react-redux";
import FormPanel from "./FormPanel";

const ReviewFormPanel = ({ data }) => {
  const { openReviewPanel } = useSelector((store) => store.movie);
  return <div>{openReviewPanel && <FormPanel data={data} />}</div>;
};

export default ReviewFormPanel;
