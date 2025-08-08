"use client";

import { Button } from "./ui/button";
import AdContentNav from "./admincontentnav";
import OrdersTable from "./ordersect";
import AdminFoodMenu from "./adminFoodMenu";
import { usePathname } from "next/navigation";

const AdminContent = () => {
  const pathname = usePathname();
  const isFoodMenu = pathname === "/admin/food-menu";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 bg-white border-r border-gray-200">
          <AdContentNav />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {isFoodMenu ? <AdminFoodMenu /> : <OrdersTable />}
              {/* Footer Spacing for both pages */}
              <div className="m-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
