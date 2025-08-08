"use client";

import { LayoutDashboard, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isFoodMenu = pathname === "/admin/food-menu";
  const isOrders = pathname === "/admin/orders";

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <img
          src="/images/LogoContainer.png"
          alt="Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={isFoodMenu ? "default" : "ghost"}
          className={`w-full justify-start gap-3 h-12 ${
            isFoodMenu
              ? "bg-red-500 text-white hover:bg-red-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => router.push("/admin/food-menu")}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Food Menu</span>
        </Button>

        <Button
          variant={isOrders ? "default" : "ghost"}
          className={`w-full justify-start gap-3 h-12 ${
            isOrders
              ? "bg-red-500 text-white hover:bg-red-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => router.push("/admin/orders")}
        >
          <Truck size={20} />
          <span className="font-medium">Orders</span>
        </Button>
      </nav>

      {/* Mobile Menu Toggle (hidden on desktop) */}
      <div className="lg:hidden p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full">
          Menu
        </Button>
      </div>
    </div>
  );
};

export default AdminNav;
