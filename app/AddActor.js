"use client";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "./firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddActor = () => {
  const [actorName, setActorName] = useState("");
  const [actorBio, setActorBio] = useState("");
  const [actorAvatar, setActorAvatar] = useState(null);
  const [actorWorks, setActorWorks] = useState([{ work: "" }]);
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthName, setBirthName] = useState("");
  const [actorVideo, setActorVideo] = useState(
    "https://firebasestorage.googleapis.com/v0/b/movies-comics-8fa4c.appspot.com/o/universal-video.mp4?alt=media&token=07998fcf-a504-474f-b318-08a519969e07"
  );

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const uploadFile = async (file) => {
    if (!file) return null;
    const fileRef = ref(storage, `actor_posters/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleWorksChange = (e, index) => {
    const updatedWorks = [...actorWorks];
    updatedWorks[index].work = e.target.value;
    setActorWorks(updatedWorks);
  };

  const addWorksField = () => {
    setActorWorks([...actorWorks, { work: "" }]);
  };

  const addActor = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadFile(actorAvatar);
      await addDoc(collection(db, "actors"), {
        actorName: actorName,
        actorBio: actorBio,
        actorAvatar: imageUrl,
        birthPlace: birthPlace,
        birthDate: formatDate(birthDate),
        actorNickName: nickName,
        actorBirthName: birthName,
        actorVideo: actorVideo,
        actorWorks: actorWorks.map((g) => g.work), // Convert genres object to array
      });

      alert("Movie added successfully!");
      setActorName("");
      setActorBio("");
      setActorVideo("");
      setActorAvatar(null);
      setBirthPlace("");
      setBirthName(""), setNickName("");
      setBirthDate("");
      setActorWorks([{ work: "" }]);
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  return (
    <form
      className="flex flex-col space-y-2 w-full items-center mt-10"
      onSubmit={addActor}
    >
      <div className="flex flex-row space-x-2 justify-center *:bg-neutral-800 *:placeholder:text-amber-500">
        <input
          type="text"
          placeholder="actor name"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
        <input
          type="text"
          placeholder="actor Bio"
          value={actorBio}
          onChange={(e) => setActorBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="actor birthplace"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        />
        <input
          type="text"
          placeholder="actor nickname"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
        <input
          type="text"
          placeholder="actor birthname"
          value={birthName}
          onChange={(e) => setBirthName(e.target.value)}
        />
        <input
          type="text"
          placeholder="actor video"
          value={actorVideo}
          onChange={(e) => setActorVideo(e.target.value)}
        />
        <label>Birth Date</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-row *:bg-neutral-800 *:placeholder:text-amber-500 space-x-2">
        {actorWorks.map((wor, index) => (
          <div key={index} className="flex items-center space-x-2 ">
            <input
              type="text"
              placeholder={`actor work ${index + 1}`}
              value={wor.work}
              onChange={(e) => handleWorksChange(e, index)}
              className="bg-neutral-800 placeholder:text-amber-500"
            />
            {index === actorWorks.length - 1 && (
              <button
                type="button"
                onClick={addWorksField}
                className="bg-green-500 text-white px-2"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row *:placeholder:text-amber-500 space-x-2 *:bg-neutral-800">
        <label htmlFor="poster">Upload actor Poster</label>
        <input
          type="file"
          id="poster"
          accept="image/*"
          onChange={(e) => setActorAvatar(e.target.files[0])}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-44">
        Submit actor
      </button>
    </form>
  );
};

export default AddActor;
