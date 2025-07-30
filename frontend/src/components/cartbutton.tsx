"use client";

import { ShoppingCart } from "lucide-react";
import { BadgeNotif } from "./notfcart";
import { Button } from "./ui/button";
import { CartDrawer } from "./CartDrawer";

interface NavCartButtonProps {
  cartCount: number;
}

export const NavCartButton = ({ cartCount }: NavCartButtonProps) => {
  return (
    <CartDrawer>
      <Button
        variant="outline"
        className="relative w-12 h-12 border-2 border-red-500 rounded-full hover:bg-red-50 transition-colors"
      >
        <ShoppingCart color="#ff0000" strokeWidth={1.5} size={20} />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2">
            <BadgeNotif number={cartCount} />
          </div>
        )}
      </Button>
    </CartDrawer>
  );
};
