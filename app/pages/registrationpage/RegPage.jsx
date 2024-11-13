import LoginContent from "./LoginContent";
import SideContent from "./SideContent";

const RegPage = () => {
  return (
    <section className="bg-stone-300 h-screen px-5 flex justify-center text-black">
      <div className="w-[70%] bg-neutral-100 flex flex-row pt-8">
        <LoginContent />
        <SideContent />
      </div>
    </section>
  );
};

export default RegPage;
