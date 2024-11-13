import { FaApple } from "react-icons/fa";
const AppleSignInComponent = () => {
  return (
    <div className="flex flex-row items-center space-x-4 border border-neutral-300 rounded-md px-10 py-1">
      <FaApple size={25} />
      <h1 className="font-bold">Sign in with Apple</h1>
    </div>
  );
};

export default AppleSignInComponent;
