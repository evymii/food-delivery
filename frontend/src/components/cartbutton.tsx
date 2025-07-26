// components/NavCartButton.tsx
"use client";
import { ShoppingCart } from "lucide-react";
import { BadgeNotif } from "./notfcart";
import { AddToCart } from "./cart";
import { useCart } from "@/context/cartcontext";
import { Button } from "./ui/button";

export const NavCartButton = () => {
  const { cartCount } = useCart();

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
