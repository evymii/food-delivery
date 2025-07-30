"use client";

import * as React from "react";
import { CircleMinus, CirclePlus, CircleX } from "lucide-react";
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
import {
  EmptyCard,
  OrderHistory,
  OrderPlacedCard,
} from "@/components/notfcart";
import { useCart } from "@/context/cartcontext";
import { CldImage } from "next-cloudinary";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();
  const [deliveryAddress, setDeliveryAddress] = React.useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="w-[400px] max-h-[80vh] flex p-4 inset-1 bg-white gap-2">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerDescription className="text-2xl font-bold text-gray-900">
            My Cart ({cartCount} items)
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
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between gap-2">
                        <CldImage
                          src={item.image}
                          alt={item.name}
                          width="100"
                          height="100"
                          crop="fill"
                          className="rounded-md"
                        />
                        <div className="flex flex-col justify-between space-y-0">
                          <div className="flex justify-between">
                            <p className="text-red-500">{item.name}</p>
                            <CircleX
                              size={20}
                              color="#ff0000"
                              strokeWidth={1}
                              onClick={() => removeFromCart(item.id)}
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex gap-2.5 text-xl font-bold">
                              <CircleMinus
                                size={28}
                                color="#000000"
                                strokeWidth={0.5}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="cursor-pointer"
                              />
                              <span>{item.quantity}</span>
                              <CirclePlus
                                size={28}
                                color="#000000"
                                strokeWidth={0.5}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="cursor-pointer"
                              />
                            </div>
                            <div className="gap-2">
                              <span className="text-xl font-bold">
                                {new Intl.NumberFormat("mn-MN", {
                                  style: "currency",
                                  currency: "MNT",
                                }).format(item.quantity * item.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyCard />
                  )}
                  <Separator className="my-1" />
                  {cartItems.length > 0 && (
                    <div className="gap-1">
                      <p className="text-2xl">Delivery Location</p>
                      <textarea
                        rows={3}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="border border-gray-200 w-full resize-none rounded-lg pt-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-black/5"
                        placeholder="Please share your complete address"
                      />
                    </div>
                  )}
                </div>
                <DrawerFooter>
                  {cartItems.length > 0 && (
                    <>
                      <p>Payment Info</p>
                      <div className="flex justify-between">
                        <p>Items</p>
                        <span className="text-xl font-bold">
                          {new Intl.NumberFormat("mn-MN", {
                            style: "currency",
                            currency: "MNT",
                          }).format(totalAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <p>Total</p>
                        <span className="text-xl font-bold">
                          {new Intl.NumberFormat("mn-MN", {
                            style: "currency",
                            currency: "MNT",
                          }).format(totalAmount)}
                        </span>
                      </div>
                      <DrawerClose asChild>
                        <OrderPlacedCard cartCount={cartCount} />
                      </DrawerClose>
                    </>
                  )}
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
