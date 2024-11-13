import Image from "next/image";
import Link from "next/link";

const SignInComponent = () => {
  return (
    <Link
      href="/registration/signin"
      className="flex flex-row items-center space-x-4 border border-neutral-300 rounded-md px-10 py-1"
    >
      <Image
        src="/assets/imdb-logo.jpg"
        className="w-6"
        width={30}
        height={30}
        alt="imdb"
      />
      <h1 className="font-bold">Sign in with IMDb</h1>
    </Link>
  );
};

export default SignInComponent;
