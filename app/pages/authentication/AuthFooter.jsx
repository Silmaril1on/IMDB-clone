const AuthFooter = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-7">
      <div className="flex flex-row space-x-3 text-[12px] capitalize *:link-style">
        <h1>help </h1>
        <h1>conditions of use</h1>
        <h1>privacy notice</h1>
      </div>
      <h1 className="text-sm mt-4">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </h1>
    </div>
  );
};

export default AuthFooter;
