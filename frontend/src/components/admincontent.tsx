import { Divide } from "lucide-react";
import { Button } from "./ui/button";
import AdContentNav from "./admincontentnav";
import OrdersTable from "./ordersect";

const AdminContent = () => {
  return (
    <div className=" w-screen h-screen overflow-hidden bg-gray-300">
      <div className=" justify-end flex ">
        <Button className=" w-10  h-10 rounded-full"></Button>
      </div>
      <div className="w-[80%] h-[80%] bg-gray-300 ml-7 mt-5">
        <AdContentNav></AdContentNav>
        <div className=" flex flex-col w-max h-screen bg-white">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
