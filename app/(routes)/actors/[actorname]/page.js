import { db } from "@/app/firebase/firebaseConfig";
import ActorPage from "@/app/pages/singleactorpage/ActorPage";
import { collection, getDocs } from "firebase/firestore";

const fetchActors = async () => {
  const mactorCollection = collection(db, "actors");
  const actorSnapshot = await getDocs(mactorCollection);
  const actors = actorSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return actors;
};

export const generateMetadata = async ({ params }) => {
  const actors = await fetchActors();
  const actorName = decodeURIComponent(params.actorname);
  const singleActor = actors?.find((item) => item?.actorName === actorName);
  const capitalizeTitle = (title) => {
    return title
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return {
    title: `${capitalizeTitle(singleActor?.actorName)} - IMDb`,
  };
};

const page = async ({ params }) => {
  const actorname = decodeURIComponent(params.actorname);
  const actorsData = await fetchActors();

  const singleActorData = actorsData.find(
    (item) => item.actorName === actorname
  );

  return (
    <div>
      <ActorPage data={singleActorData} />
    </div>
  );
};

export default page;
