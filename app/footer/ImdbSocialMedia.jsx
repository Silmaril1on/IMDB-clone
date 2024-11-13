import {
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaFacebookSquare,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialData = [
  {
    icon: <FaTiktok />,
    link: "/",
  },
  {
    icon: <FaInstagram />,
    link: "/",
  },
  {
    icon: <FaXTwitter />,
    link: "/",
  },
  {
    icon: <FaYoutube />,
    link: "/",
  },
  {
    icon: <FaFacebookSquare />,
    link: "/",
  },
];

const ImdbSocialMedia = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-lg">Follow IMDb on social</h1>
      <div className="flex space-x-4 px-6">
        {socialData.map((item) => {
          return (
            <div className="w-12 h-12 rounded-full hover:bg-neutral-600/60 cursor-pointer center *:w-6 *:h-6">
              {item.icon}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImdbSocialMedia;
