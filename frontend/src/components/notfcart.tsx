"use client"; // Ensure this is the first line

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const BadgeNotif = ({ number }: { number: number }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          {number}
        </Badge>
      </div>
    </div>
  );
};

export const EmptyCard = () => {
  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <img
        src="./logos/home-logo.png"
        alt="logo"
        className="w-[30px] h-[30px]"
      />
      <p className="text-2xl font-bold">Your cart is empty</p>
      <p className="text-xs w-8/10 text-center">
        Hungry? 🍔 Add some delicious dishes to your cart and satisfy your
        cravings!
      </p>
    </div>
  );
};

interface OrderPlacedCardProps {
  cartCount: number; // Accept cartCount as a prop
}

export const OrderPlacedCard = ({ cartCount }: OrderPlacedCardProps) => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 text-white rounded-[24px]"
        >
          Checkout {cartCount > 0 && `(${cartCount})`} {/* Display cartCount */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Your order has been successfully placed!</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <img src="./illustration.png" alt="successfully" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/")}
            >
              Back to home
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const OrderHistory = ({
  price,
  status,
  orderId,
}: {
  price: number;
  status: string;
  orderId: string;
}) => {
  return (
    <div className="w-full m-2.5">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 font-bold">
          <p>
            {new Intl.NumberFormat("mn-MN", {
              style: "currency",
              currency: "MNT",
            }).format(price)}
          </p>{" "}
          {/* Format price */}
          <p>({orderId})</p>
        </div>
        <button className="border rounded-md">{status}</button>
      </div>
    </div>
  );
};
