"use client";

import { Button } from "./ui/button";
import { NavCartButton } from "./cartbutton"; // Ensure this is still present
import { MapPin, User } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface NavProps {
  cartCount: number; // Accept cartCount as a prop
}

const Nav = ({ cartCount }: NavProps) => {
  return (
    <div className="flex bg-[#18181B] w-full h-20 px-4 py-2">
      <div className="flex flex-row justify-between items-center w-full max-w-7xl mx-auto">
        <img
          src="/images/weblogo.png"
          alt="navigation logo"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-4">
          <div className="flex relative">
            <Button className="w-64 h-10 rounded-full justify-center items-center hover:shadow-lg hover:bg-gray-50 bg-white relative">
              <div className="flex items-center gap-2">
                <MapPin size={18} color="#f50000" strokeWidth={1.5} />
                <p className="text-red-500 text-sm">Delivery address:</p>
                <p className="text-gray-500 text-sm">Add location</p>
                <ChevronRight size={18} color="#18181B" strokeWidth={1.5} />
              </div>
            </Button>
          </div>
          <NavCartButton cartCount={cartCount} />
          <div className="flex">
            <Button className="w-10 h-10 hover:shadow-lg hover:bg-red-600 rounded-full bg-red-500 relative flex items-center justify-center">
              <User size={18} color="#ffffff" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
