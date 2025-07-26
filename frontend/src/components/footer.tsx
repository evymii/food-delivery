import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Sliding } from "./sliding";

const Footer = () => {
  const Item = [{ content: "Fresh Fast Delivered" }];
  return (
    <div className=" flex bg-[#18181B] w-screen h-160 flex-col gap-40 mx-40 ">
      <div className=" mt-10">
        <Sliding items={Item} />
      </div>

      <div className=" flex flex-row justify-around gap-120 w-screen h-20   ">
        <img
          src="/images/footerLogo.png"
          alt="navigation logo"
          className=" flex w-25 h-25 "
        />
        <div className=" flex w-max gap-20 flex-row">
          <div className=" flex text-white flex-col gap-3">
            <h3 className="text-gray-500">NOMNOM</h3>
            <p>Home</p>
            <p>Contact Us</p>
            <p>Delivery Zone</p>
          </div>
          <div className=" flex text-white h-30 w-50 gap-3 flex-wrap">
            <h3 className="text-gray-500">MENU</h3>
            <div className="grid text-white h-30 w-60 gap-3  grid-cols-2">
              <p>Appetizers</p>
              <p>Salads</p>
              <p>Pizzas</p>
              <p>Main dishes</p>
              <p>Desserts</p>
              <p>Side dish </p>
              <p>Brunch</p>
              <p>Desserts</p>
              <p>Beverages</p>
              <p>Fish & Sea foods</p>
            </div>
          </div>
          <div className=" flex text-white flex-col gap-3">
            <h3 className="text-gray-500">FOLLOW US</h3>
            <div className=" flex-row gap-4 flex mx-3">
              {" "}
              <button>
                <Instagram />
              </button>
              <button>
                <Facebook />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-gray-400 flex flex-row gap-10 justify-start mx-30 px-60 border-t-2 border-gray-400 pt-10">
        <p>Copy right 2024</p>
        <p>© Nomnom LLC</p>
        <p>Privacy policy</p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};

export default Footer;
