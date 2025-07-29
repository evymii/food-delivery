"use client";

import { ShoppingCart } from "lucide-react";
import { BadgeNotif } from "./notfcart"; // Assuming this component displays the badge
import { Button } from "./ui/button"; // Ensure this button component is correctly imported
import { useCart } from "@/context/cartcontext";

interface NavCartButtonProps {
  cartCount: number; // Accept cartCount as a prop
}

export const NavCartButton = ({ cartCount }: NavCartButtonProps) => {
  return (
    <Button variant="outline" className="relative w-fit border rounded-full">
      <ShoppingCart color="#ff0000" strokeWidth={1.25} />
      {cartCount > 0 && (
        <div className="absolute -top-2 -right-2">
          <BadgeNotif number={cartCount} />
        </div>
      )}
    </Button>
  );
};
