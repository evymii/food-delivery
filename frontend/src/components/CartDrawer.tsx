"use client";

import * as React from "react";
import {
  CircleMinus,
  CirclePlus,
  CircleX,
  AlertTriangle,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useCart } from "@/context/cartcontext";
import { useAdminOrders } from "@/context/adminOrdersContext";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  children: React.ReactNode;
}

type CartStep = "cart" | "address" | "success" | "empty";

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { addAdminOrder } = useAdminOrders();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<CartStep>("cart");
  const [deliveryAddress, setDeliveryAddress] = React.useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [itemToRemove, setItemToRemove] = React.useState<string | null>(null);
  const [showLoginAlert, setShowLoginAlert] = React.useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const deliveryFee = 5.0;
  const finalTotal = totalAmount + deliveryFee;

  const handleCheckout = () => {
    // Check if user is logged in (you can implement your own auth check)
    const isLoggedIn = localStorage.getItem("meow-test");
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }
    setCurrentStep("address");
  };

  const handleConfirmOrder = () => {
    // Create food description from cart items
    const foodDescription = cartItems.length === 1 
      ? `${cartItems[0].quantity} ${cartItems[0].name}`
      : `${cartItems.length} foods`;
    
    // Get current date in the required format
    const currentDate = new Date().toLocaleDateString('en-CA'); // YYYY/MM/DD format
    
    // Add order to admin orders list
    addAdminOrder({
      customer: localStorage.getItem("meow-test") || "Guest User",
      food: foodDescription,
      date: currentDate,
      price: `$${finalTotal.toFixed(2)}`,
      deliveryAddress: `${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zipCode}`,
      status: "Pending"
    });
    
    console.log("Order confirmed and added to admin orders:", {
      items: cartItems,
      address: deliveryAddress,
      total: finalTotal,
    });
    setCurrentStep("success");
    clearCart();
  };

  const handleRemoveItem = (id: string) => {
    setItemToRemove(id);
    setShowRemoveDialog(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove);
      setItemToRemove(null);
    }
    setShowRemoveDialog(false);
  };

  const handleGoToMenu = () => {
    setCurrentStep("cart");
    router.push("/home");
  };

  const handleLoginRedirect = () => {
    setShowLoginAlert(false);
    router.push("/log-in");
  };

  const renderCartContent = () => {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={32} className="text-red-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-gray-600 text-center mb-4">
            Hungry? Add some delicious dishes to your cart!
          </p>
          <Button
            onClick={handleGoToMenu}
            className="bg-red-500 hover:bg-red-600"
          >
            Go to menu
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-3 p-3 bg-white rounded-lg border"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex flex-col justify-between flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-red-500 text-sm">
                  {item.name}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 h-auto"
                >
                  <CircleX size={16} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 p-0"
                  >
                    <CircleMinus size={16} />
                  </Button>
                  <span className="w-6 text-center font-semibold text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <CirclePlus size={16} />
                  </Button>
                </div>
                <span className="font-semibold text-sm">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAddressForm = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Input address</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Street"
          value={deliveryAddress.street}
          onChange={(e) =>
            setDeliveryAddress((prev) => ({ ...prev, street: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="City"
          value={deliveryAddress.city}
          onChange={(e) =>
            setDeliveryAddress((prev) => ({ ...prev, city: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="State"
          value={deliveryAddress.state}
          onChange={(e) =>
            setDeliveryAddress((prev) => ({ ...prev, state: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={deliveryAddress.zipCode}
          onChange={(e) =>
            setDeliveryAddress((prev) => ({ ...prev, zipCode: e.target.value }))
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <h3 className="text-xl font-semibold mb-4">
        Your order has been successfully placed!
      </h3>
      {/* Placeholder for the person with chef hat balloon illustration */}
      <div className="relative w-24 h-24 mb-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          {/* This represents the chef hat balloon */}
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
      <Button
        onClick={handleGoToMenu}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        Back to home
      </Button>
    </div>
  );

  const renderCartSummary = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Items:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Drawer direction="top">
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent className="w-[400px] max-h-[80vh] bg-white">
          <div className="flex flex-col h-full p-4">
            <DrawerHeader className="flex flex-row items-center justify-between p-0 pb-4">
              <DrawerDescription className="text-2xl font-bold text-gray-900">
                Order detail
              </DrawerDescription>
              <DrawerClose asChild>
                <Button variant="outline" className="w-fit rounded-full">
                  X
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="cart" className="w-full h-full flex flex-col">
                <TabsList className="w-full">
                  <TabsTrigger value="cart" className="w-1/2">
                    Cart
                  </TabsTrigger>
                  <TabsTrigger value="order" className="w-1/2">
                    Order
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="cart"
                  className="mt-4 flex-1 overflow-y-auto"
                >
                  {currentStep === "cart" && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-3">My cart</h3>
                        {renderCartContent()}
                      </div>

                      {cartItems.length > 0 && (
                        <>
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">
                              Delivery location
                            </h4>
                            <textarea
                              rows={3}
                              className="border border-gray-200 w-full resize-none rounded-lg p-3 text-gray-900 outline-none focus:ring-2 focus:ring-red-500"
                              placeholder="Please complete your address"
                            />
                          </div>

                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Payment info</h4>
                            {renderCartSummary()}
                          </div>

                          <Button
                            onClick={handleCheckout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white"
                          >
                            Checkout
                          </Button>
                        </>
                      )}
                    </>
                  )}

                  {currentStep === "address" && (
                    <>
                      {renderAddressForm()}
                      <div className="mt-6">
                        <Button
                          onClick={handleConfirmOrder}
                          className="w-full bg-red-500 hover:bg-red-600"
                          disabled={
                            !deliveryAddress.street ||
                            !deliveryAddress.city ||
                            !deliveryAddress.state ||
                            !deliveryAddress.zipCode
                          }
                        >
                          Confirm Order
                        </Button>
                      </div>
                    </>
                  )}

                  {currentStep === "success" && renderSuccessMessage()}
                </TabsContent>

                <TabsContent
                  value="order"
                  className="mt-4 flex-1 overflow-y-auto"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-3">
                      Order history
                    </h3>
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <ShoppingCart size={32} className="text-red-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        No Orders Yet!
                      </h3>
                      <p className="text-gray-600 text-center mb-4">
                        You haven&apos;t placed any order yet. Start ordering
                        our delicious food now!
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Login Alert Dialog */}
      <Dialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              Authentication Required
            </DialogTitle>
            <DialogDescription>
              You need to log in first to complete your order.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginAlert(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleLoginRedirect}
              className="bg-red-500 hover:bg-red-600"
            >
              Log In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Item Confirmation Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this item from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveItem}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
