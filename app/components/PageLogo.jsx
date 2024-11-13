import Image from "next/image";
import Link from "next/link";

const PageLogo = ({ className }) => {
  return (
    <div className={className}>
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="page-logo"
          className="w-full"
          width={200}
          height={130}
          priority
        />
      </Link>
    </div>
  );
};

export default PageLogo;
