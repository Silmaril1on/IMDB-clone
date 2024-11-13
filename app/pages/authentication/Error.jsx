import { CiCircleAlert } from "react-icons/ci";

const Error = ({ children }) => {
  return (
    <div className="border rounded-md p-2 border-red-700 flex flex-row items-center my-3">
      <CiCircleAlert size={40} className="text-red-700 mr-2" />
      <div className="flex flex-col">
        <h1 className="text-red-800/70 font-bold">There was a problem</h1>
        {children}
      </div>
    </div>
  );
};

export default Error;
