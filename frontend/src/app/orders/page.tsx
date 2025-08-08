"use client";

import React from "react";
import Nav from "@/components/nav";
import { useCart } from "@/context/cartcontext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    items: [
      { name: "Sunshine Burgers", quantity: 2, price: 12.99 },
      { name: "Sunshine Chicken", quantity: 1, price: 15.99 },
    ],
    total: 41.97,
    status: "PREPARING",
    orderDate: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-15T11:30:00Z",
    address: "123 Main St, City, State 12345",
  },
  {
    id: "ORD-002",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    total: 13.99,
    status: "DELIVERED",
    orderDate: "2024-01-14T18:00:00Z",
    deliveredDate: "2024-01-14T19:15:00Z",
    address: "456 Oak Ave, City, State 12345",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="text-yellow-500" size={20} />;
    case "PREPARING":
      return <Clock className="text-blue-500" size={20} />;
    case "READY":
      return <CheckCircle className="text-green-500" size={20} />;
    case "DELIVERED":
      return <Truck className="text-green-500" size={20} />;
    default:
      return <Clock className="text-gray-500" size={20} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PREPARING":
      return "bg-blue-100 text-blue-800";
    case "READY":
      return "bg-green-100 text-green-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrdersPage() {
  const { cartCount } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav cartCount={cartCount} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id} className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.orderDate).toLocaleDateString()} at{" "}
                      {new Date(order.orderDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{order.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Delivery Address:</h4>
                      <p className="text-sm text-gray-600">{order.address}</p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Status-specific information */}
                  {order.status === "PREPARING" && order.estimatedDelivery && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleTimeString()}
                      </p>
                    </div>
                  )}

                  {order.status === "DELIVERED" && order.deliveredDate && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">
                        Delivered on: {new Date(order.deliveredDate).toLocaleDateString()} at{" "}
                        {new Date(order.deliveredDate).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {mockOrders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-4">
                  Start ordering delicious food to see your order history here!
                </p>
                <Button onClick={() => router.push("/home")} className="bg-red-500 hover:bg-red-600">
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 