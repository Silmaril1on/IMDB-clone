const SideContent = () => {
  return (
    <div className="w-[55%] [&_h1]:font-bold px-5 relative before:absolute before:h-64 before:bg-neutral-300 before:w-[1px] before:left-0">
      <h1 className="text-2xl font-bold">Benefits of your free IMDb account</h1>
      <div className="flex flex-col *:flex *:flex-col space-y-2 mt-5">
        <div>
          <h1>Personalized Recommendations</h1>
          <p>
            Track everything you want to watch and receive e-mail when movies
            open in theaters.
          </p>
        </div>
        <div>
          <h1>Your Ratings</h1>
          <p>Rate and remember everything you've seen.</p>
        </div>
        <div>
          <h1>Contribute to IMDb</h1>
          <p>
            Add data that will be seen by millions of people and get cool
            badges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideContent;
