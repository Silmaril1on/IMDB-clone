import CloseButton from "@/app/components/CloseButton";
import PageLogo from "@/app/components/PageLogo";
import { handleMenuSettings } from "@/app/features/moviesSlice";
import { useDispatch } from "react-redux";

const SettingsHead = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-[10%] py-5">
      <div className="w-20">
        <PageLogo />
      </div>
      <div
        className="bg-amber-400 rounded-full p-2 *:text-black"
        onClick={() => dispatch(handleMenuSettings())}
      >
        <CloseButton />
      </div>
    </div>
  );
};

export default SettingsHead;
