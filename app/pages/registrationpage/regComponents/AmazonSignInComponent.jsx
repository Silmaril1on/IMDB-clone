import { AiFillAmazonCircle } from "react-icons/ai";

const AmazonSignInComponent = () => {
  return (
    <div className="flex flex-row items-center space-x-4 border border-neutral-300 rounded-md px-10 py-1">
      <AiFillAmazonCircle size={25} />
      <h1 className="font-bold">Sign in with Amazon</h1>
    </div>
  );
};

export default AmazonSignInComponent;
