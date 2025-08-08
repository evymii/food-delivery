"use client";
import { useState } from "react";
import { useAdminOrders } from "@/context/adminOrdersContext";

const OrdersTable: React.FC = () => {
  const { adminOrders, updateOrderStatus } = useAdminOrders();
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const itemsPerPage = 10;
  const totalPages = Math.ceil(adminOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = adminOrders.slice(startIndex, endIndex);

  const toggleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(currentOrders.map((order) => order.id)));
    }
  };

  const toggleSelectOrder = (orderId: number) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleStatusChange = (orderId: number, status: string) => {
    setSelectedOrderId(orderId);
    setNewStatus(status);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = () => {
    if (selectedOrderId && newStatus) {
      updateOrderStatus(selectedOrderId, newStatus);
      setShowStatusDialog(false);
      setSelectedOrderId(null);
      setNewStatus("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-800";
      case "Delivering":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Canceled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "Delivering":
        return "🚚";
      case "Delivered":
        return "✅";
      case "Canceled":
        return "❌";
      default:
        return "⏳";
    }
  };

  return (
    <div className="w-full h-full p-6 pb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <div className="text-sm text-gray-600">{adminOrders.length} items</div>
      </div>

      {/* Date Range and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-sm text-gray-600">13 June 2023 - 14 July 2023</div>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors">
          Change delivery state
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={
                    selectedOrders.size === currentOrders.length &&
                    currentOrders.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="text-left p-3 font-medium text-gray-700">ID</th>
              <th className="text-left p-3 font-medium text-gray-700">
                Customer
              </th>
              <th className="text-left p-3 font-medium text-gray-700">Food</th>
              <th className="text-left p-3 font-medium text-gray-700">Date</th>
              <th className="text-left p-3 font-medium text-gray-700">Total</th>
              <th className="hidden md:table-cell text-left p-3 font-medium text-gray-700">
                Delivery Address
              </th>
              <th className="text-left p-3 font-medium text-gray-700">
                Delivery state
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => toggleSelectOrder(order.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-3 text-sm">{order.id}</td>
                <td className="p-3 text-sm">{order.customer}</td>
                <td className="p-3 text-sm">{order.food}</td>
                <td className="p-3 text-sm">{order.date}</td>
                <td className="p-3 text-sm font-medium">{order.price}</td>
                <td className="hidden md:table-cell p-3 text-sm max-w-xs truncate">
                  {order.deliveryAddress}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleStatusChange(order.id, order.status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )} flex items-center gap-1`}
                  >
                    <span>{getStatusIcon(order.status)}</span>
                    {order.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Status Change Dialog */}
      {showStatusDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Change delivery state
            </h3>
            <div className="space-y-2 mb-6">
              {["Pending", "Delivering", "Delivered", "Canceled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`w-full p-3 rounded-lg text-left ${
                      newStatus === status
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
