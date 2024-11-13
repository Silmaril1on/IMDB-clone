"use client";

import LoginModal from "@/app/components/LoginModal";
import { useSelector } from "react-redux";

const ModalReview = () => {
  const { warning } = useSelector((store) => store.movie);
  return (
    <div className="absolute right-5 botom-5">{warning && <LoginModal />}</div>
  );
};

export default ModalReview;
