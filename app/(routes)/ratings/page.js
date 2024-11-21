import UserRatingsList from "@/app/pages/userratingslist/UserRatingsList";

export const metadata = {
  title: "IMDb: Your Ratings",
  description: "IMDB page for user ratings on specific movies",
};

const page = () => {
  return (
    <div>
      <UserRatingsList />
    </div>
  );
};

export default page;
