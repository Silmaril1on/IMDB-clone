import AmazonSignInComponent from "./regComponents/AmazonSignInComponent";
import AppleSignInComponent from "./regComponents/AppleSignInComponent";
import GoogleSignInComponent from "./regComponents/GoogleSignInComponent";
import SignInComponent from "./regComponents/SignInComponent";
import SignUpComponent from "./regComponents/SignUpComponent";

const LoginContent = () => {
  return (
    <div className="w-[40%] flex flex-col items-center">
      <h1 className="font-bold text-2xl">Sign In</h1>
      <div className="py-4 space-y-3">
        <SignInComponent />
        <AmazonSignInComponent />
        <AppleSignInComponent />
        <GoogleSignInComponent />
      </div>
      <div>or</div>
      <SignUpComponent />
      <h1 className="text-[11px] px-14 text-center mt-4">
        By signing in, you agree to IMDb's Conditions of Use and Privacy Policy.
      </h1>
    </div>
  );
};

export default LoginContent;
