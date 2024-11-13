import CloseButton from "@/app/components/CloseButton";
import { handleReviewPanel } from "@/app/features/moviesSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";
import FormHeadline from "./FormHeadline";
import Form from "./Form";

const FormPanel = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      variants={popUpStyle}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm h-screen  flex justify-end"
    >
      <div
        onClick={() => dispatch(handleReviewPanel())}
        className="absolute top-2 left-2"
      >
        <CloseButton />
      </div>
      <div className="bg-neutral-100 overflow-hidden p-2 text-neutral-600 w-[25%]">
        <FormHeadline data={data} />
        <Form data={data} />
      </div>
    </motion.div>
  );
};

export default FormPanel;
