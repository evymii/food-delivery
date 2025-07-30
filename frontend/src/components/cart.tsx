"use client";

import * as React from "react";
import { CircleMinus, CirclePlus, ShoppingCart, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  BadgeNotif,
  EmptyCard,
  OrderHistory,
  OrderPlacedCard,
} from "@/components/notfcart";
import { useCart } from "@/context/cartcontext";
import { CldImage } from "next-cloudinary";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const AddToCart = ({
  id,
  foodName,
  image,
  price,
}: {
  id: string;
  image: string;
  foodName: string;
  price: number;
}) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const cartItem = cartItems.find((item) => item.id === id);
  const [foodCount, setFoodCount] = useState(1);

  const handleMinusClick = () => {
    if (foodCount > 1) setFoodCount((prevNumber) => prevNumber - 1);
  };

  const handleDeleteClick = () => {
    setFoodCount(0);
    removeFromCart(id);
  };

  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-fit border rounded-full">
          <ShoppingCart color="#ff0000" strokeWidth={1.25} />
          {foodCount > 0 && <BadgeNotif number={foodCount} />}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-[400px] flex p-2 inset-1 bg-black/90 gap-1">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerDescription className="text-2xl font-bold">
            Order Detail
          </DrawerDescription>
          <DrawerClose asChild>
            <Button variant="outline" className="w-fit rounded-full">
              X
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex w-full max-w-sm flex-col">
          <Tabs defaultValue="cart" className="w-full h-full">
            <TabsList className="w-full">
              <TabsTrigger value="cart" className="w-1/2">
                Cart
              </TabsTrigger>
              <TabsTrigger value="order" className="w-1/2">
                Order
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cart">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">My Cart</CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-1 p-2">
                  {cartItem && (
                    <div className="flex justify-between gap-2">
                      <CldImage
                        src={image}
                        alt="food"
                        width="100"
                        height="100"
                        crop="fill"
                        className="rounded-md"
                      />
                      <div className="flex flex-col justify-between space-y-0">
                        <div className="flex justify-between">
                          <p className="text-red-500">{foodName}</p>
                          <CircleX
                            size={20}
                            color="#ff0000"
                            strokeWidth={1}
                            onClick={handleDeleteClick}
                          />
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="flex gap-2.5 text-xl font-bold">
                            <CircleMinus
                              size={28}
                              color="#000000"
                              strokeWidth={0.5}
                              onClick={handleMinusClick}
                            />
                            <span>{cartItem.quantity}</span>
                            <CirclePlus
                              size={28}
                              color="#000000"
                              strokeWidth={0.5}
                              onClick={() =>
                                updateQuantity(id, cartItem.quantity + 1)
                              }
                            />
                          </div>
                          <div className="gap-2">
                            <span className="text-xl font-bold">
                              {new Intl.NumberFormat("mn-MN", {
                                style: "currency",
                                currency: "MNT",
                              }).format(cartItem.quantity * price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Separator className="my-1" />
                  {foodCount > 0 && (
                    <div className="gap-1">
                      <p className="text-2xl">Delivery Location</p>
                      <textarea
                        rows={3}
                        className="border border-gray-200 w-full resize-none rounded-lg pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5"
                        placeholder="Please share your complete address"
                      />
                    </div>
                  )}
                  {foodCount === 0 && <EmptyCard />}
                </div>
                <DrawerFooter>
                  <p>Payment Info</p>
                  <div className="flex justify-between">
                    <p>Items</p>
                    <span className="text-xl font-bold">
                      {new Intl.NumberFormat("mn-MN", {
                        style: "currency",
                        currency: "MNT",
                      }).format(foodCount * price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p>Total</p>
                    <span className="text-xl font-bold">
                      {new Intl.NumberFormat("mn-MN", {
                        style: "currency",
                        currency: "MNT",
                      }).format(foodCount * price)}
                    </span>
                  </div>
                  <DrawerClose asChild>
                    <OrderPlacedCard cartCount={foodCount} />
                  </DrawerClose>
                </DrawerFooter>
              </Card>
            </TabsContent>
            <TabsContent value="order">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <OrderHistory price={25000} status={"PENDING"} orderId="" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
