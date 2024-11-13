import { db, storage } from "@/app/firebase/firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { popUpStyle } from "@/app/animations/framermotion";
import CloseButton from "@/app/components/CloseButton";
import Image from "next/image";
import LoadingSpin from "@/app/components/LoadingSpin";

const UploadMovieImage = ({ data, openModal }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadPhoto = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const pht = ref(storage, `movie-images/${data.movieTitle}-${Date.now()}`);
      await uploadBytes(pht, file);
      const downloadURL = await getDownloadURL(pht);
      const movieRef = doc(db, "movies", data.id);
      await updateDoc(movieRef, {
        moviePhotos: arrayUnion(downloadURL),
      });
      setUploading(false);
      setFile(null);
      alert("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-neutral-900 w-[90%] absolute bottom-0 py-2 px-5 flex h-24 border-neutral-600 border-t">
      <motion.div
        variants={popUpStyle}
        initial="hidden"
        animate="visible"
        className="absolute bg-black -top-5 right-9 border border-neutral-600 rounded-full p-1"
        onClick={openModal}
      >
        <CloseButton />
      </motion.div>
      <div className="flex w-full justify-between px-[10%]">
        <div className="flex flex-col">
          <article className="flex text-amber-400 space-x-1">
            <h1 className="capitalize font-bold">{data.movieTitle}</h1>
            <span>({data.movieYear})</span>
          </article>
          <div className="flex ">
            {data.movieDirectors.map((item, index) => {
              return (
                <div key={index}>
                  <span className="link-style capitalize">{item}</span>
                  {index < data.movieDirectors.length - 1 && (
                    <span className="mx-1">•</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm text-amber-400">
            Upload your favorite image from the movie
          </p>
          <div className="mt-2 flex items-center space-x-3">
            <label htmlFor="file-input" className="cursor-pointer">
              <Image
                className="w-16"
                src={file ? URL.createObjectURL(file) : "/assets/image.png"}
                alt="user_avatar"
                width={100}
                height={100}
                onClick={handleImageClick}
              />
            </label>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
            <button
              onClick={uploadPhoto}
              className="reg-button text-sm py-1 px-4 text-black rounded-3xl"
              disabled={uploading || !file}
            >
              {uploading ? (
                <div className="flex items-center">
                  <LoadingSpin />
                  <span>Uploading...</span>
                </div>
              ) : (
                "Upload Photo"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMovieImage;
