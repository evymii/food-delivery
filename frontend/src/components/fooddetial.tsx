"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check as CheckIcon, CircleMinus, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cartcontext";

type Props = {
  children?: React.ReactNode;
  foodName?: string;
  price?: number;
  ingredients?: string;
  image?: string;
  onAddToCart?: () => void;
};

export const FoodDetails = ({
  children,
  foodName = "",
  price = 0,
  image = "",
  ingredients = "",
  onAddToCart,
}: Props) => {
  const { addToCart } = useCart();
  const [foodCount, setFoodCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `${foodName}-${Date.now()}`, // Create unique ID based on food name and timestamp
      name: foodName,
      price,
      image,
    });
    onAddToCart?.();
    setIsOpen(false);
    setFoodCount(1); // Reset count after adding to cart
  };

  const handleAddClick = () => {
    setFoodCount((prev) => prev + 1);
  };

  const handleMinusClick = () => {
    if (foodCount > 0) setFoodCount((prev) => prev - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">+</Button>}
      </DialogTrigger>
      <DialogContent className="w-[640px] flex items-center">
        <DialogHeader>
          <DialogTitle className="text-red-500">{foodName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {image && (
            <img
              src={image}
              alt={foodName}
              className="w-[300px] h-[240px] object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <p className="text-wrap text-xs">{ingredients}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="gap-2">
              <p className="text-wrap text-xs">Total price</p>
              <span>₮{(foodCount * (price || 0)).toFixed(2)}</span>
            </div>
            <div className="flex gap-1 items-center">
              <CircleMinus
                size={28}
                color="#000000"
                strokeWidth={0.75}
                onClick={handleMinusClick}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <span className="w-6 text-center">{foodCount}</span>
              <CirclePlus
                size={28}
                color="#000000"
                strokeWidth={0.75}
                onClick={handleAddClick}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={handleAddToCart} // Call the handler when clicked
              >
                Add to cart
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-full mt-[-270%] ml-[-70%] h-full
"
              align="start"
            >
              <DropdownMenuLabel className="w-full bg-black text-white flex gap-1 items-center border-none rounded-md">
                <CheckIcon size={16} /> Food added to cart!
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogContent>
    </Dialog>
  );
};
