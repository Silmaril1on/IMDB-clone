import { IoMdClose } from "react-icons/io";

const CloseButton = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <IoMdClose size={30} className={className} />
    </div>
  );
};

export default CloseButton;
