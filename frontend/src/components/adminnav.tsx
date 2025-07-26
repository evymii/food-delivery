import { LayoutDashboard, Truck } from "lucide-react";
import { Button } from "./ui/button";

const AdminNav = () => {
  return (
    <div className=" flex flex-col p-5 w-60 items-center h-screen border border-gray-400">
      <div>
        <img
          src="./images/LogoContainer.png"
          alt=" nav logo"
          className=" flex w-40 h-10"
        />
      </div>
      <Button className=" flex flex-row gap-3 w-35  bg-white p-3 rounded-4xl mt-5 ">
        <LayoutDashboard color="black" />
        <p className=" text-black">Food Menu</p>
      </Button>
      <Button className=" px-5 flex flex-row gap-3 w-35 py-3 mt-5 rounded-4xl ">
        <Truck />
        <p>Orders</p>
      </Button>
    </div>
  );
};

export default AdminNav;
