const ImdbProLogo = ({ className }) => {
  return (
    <div className={`h-5 flex items-center cursor-pointer ${className}`}>
      <h1 className={`font-bold ${className}`}>IMDb</h1>
      <h1 className="text-blue-400 font-bold">Pro</h1>
    </div>
  );
};

export default ImdbProLogo;
