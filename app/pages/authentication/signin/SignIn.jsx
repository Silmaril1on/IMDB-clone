import PageLogo from "@/app/components/PageLogo";
import LoginComponent from "./LoginComponent";
import AuthFooter from "../AuthFooter";

const SignIn = () => {
  return (
    <section className="bg-neutral-100 h-screen text-black absolute inset-0 flex items-center flex-col">
      <PageLogo className="w-32" />
      <LoginComponent />
      <div className="divider mt-4"></div>
      <AuthFooter />
    </section>
  );
};

export default SignIn;
