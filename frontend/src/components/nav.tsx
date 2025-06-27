import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";

const Nav = () => {
  return (
    <div className=" flex bg-[#18181B] w-screen h-30  ">
      <div className=" flex flex-row justify-between w-screen h-20 my-10 mx-5">
        <img
          src="/images/weblogo.png"
          alt="navigation logo"
          className=" flex w-35 h-10 "
        />
        <div className=" flex w-max gap-5 flex-row">
          <div className=" flex">
            <Button className=" w-78 h-10  rounded-3xl justify-center items-center  hover:shadow-white hover:bg-white bg-white relative" />
            <div className=" absolute items-center  flex-row flex h-fit w-fit my-2 mx-4 gap-2  ">
              <MapPin size={20} color="#f50000" strokeWidth={1.5} />
              <p className=" text-red-500">Delivery address:</p>
              <p className=" text-gray-500">Add loaction</p>
              <ChevronRight size={20} color="#18181B" strokeWidth={1.5} />
            </div>
          </div>
          <div className=" flex">
            <Button className=" w-10 h-10 flex rounded-3xl  hover:shadow-white hover:bg-white bg-white relative" />
            <div className=" absolute flex w-5 h-5 my-2 mx-2.5">
              <ShoppingCart size={20} color="#000000" strokeWidth={1.5} />
            </div>
          </div>
          <div className=" flex">
            <Button className=" w-10 h-10  hover:shadow-white hover:bg-red-500 rounded-3xl bg-red-500 relative flex" />
            <div className=" absolute flex w-5 h-5 my-2 mx-2.5">
              <User size={20} color="#ffffff" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
