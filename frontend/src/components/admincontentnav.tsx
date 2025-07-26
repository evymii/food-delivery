import { CalendarDays } from "lucide-react";

const AdContentNav = () => {
  return (
    <div className=" flex flex-row w-300 justify-between h-20 bg-white items-center px-5">
      <div className=" flex flex-col w-max h-13 ">
        <p className=" text-black font-extrabold text-lg ">Orders</p>
        <div className=" flex flex-row gap-1 text-gray-400 ">
          <p>32</p>
          <p>items</p>
        </div>
      </div>
      <div className=" flex flex-row gap-4">
        <div className=" flex flex-row p-2 border border-gray-300 gap-3 rounded-full h-10 items-center">
          <CalendarDays />
          <button className=" flex flex-row gap-2 ">
            <p>7</p>
            <p>July</p>
            <p>2025</p>
          </button>
          <p>-</p>
          <button className=" flex flex-row gap-2 ">
            <p>8</p>
            <p>July</p>
            <p>2025</p>
          </button>
        </div>
        <div className=" w-50 h-10 bg-gray-300 rounded-full items-center flex justify-center">
          <button className=" flex ">
            <p className=" text-white ">Change Delivery State</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdContentNav;
