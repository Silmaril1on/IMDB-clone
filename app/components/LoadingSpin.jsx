import Image from "next/image";

const LoadingSpin = () => {
  return (
    <div className="lds-ripple w-6 h-6 center">
      <Image src="/loader.gif" alt="load" width={20} height={20} />
    </div>
  );
};

export default LoadingSpin;
