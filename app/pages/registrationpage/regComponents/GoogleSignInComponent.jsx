import { FcGoogle } from "react-icons/fc";

const GoogleSignInComponent = () => {
  return (
    <div className="flex flex-row items-center space-x-4 border border-neutral-300 rounded-md px-10 py-1">
      <FcGoogle size={25} />
      <h1 className="font-bold">Sign in with Google</h1>
    </div>
  );
};

export default GoogleSignInComponent;
