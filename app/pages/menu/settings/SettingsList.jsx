import menuDb from "@/app/db/menusettingsDb";

const SettingsList = () => {
  return (
    <div className="grid grid-cols-2 gap-6 px-[20%] pb-8">
      {menuDb.map((item) => {
        return (
          <div key={item.id}>
            <article className="flex space-x-2 items-center">
              <span className="text-amber-400 text-2xl">{item.icon}</span>
              <h1 className="text-white font-bold capitalize text-2xl">
                {item.name}
              </h1>
            </article>
            <div className=" pl-9 pt-2">
              {item.subName.map((item, index) => {
                return (
                  <h1
                    key={index}
                    className="my-1 capitalize hover:underline cursor-pointer"
                  >
                    {item}
                  </h1>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SettingsList;
