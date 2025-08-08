"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AdminOrder {
  id: number;
  customer: string;
  food: string;
  date: string;
  price: string;
  deliveryAddress: string;
  status: string;
}

interface AdminOrdersContextType {
  adminOrders: AdminOrder[];
  addAdminOrder: (order: Omit<AdminOrder, "id">) => void;
  updateOrderStatus: (id: number, status: string) => void;
}

const AdminOrdersContext = createContext<AdminOrdersContextType | undefined>(undefined);

export function AdminOrdersProvider({ children }: { children: ReactNode }) {
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([
    {
      id: 1,
      customer: "Test@gmail.com",
      food: "2 foods",
      date: "2024/12/20",
      price: "$26.97",
      deliveryAddress:
        "lo djke jfnjn fjncj fjeijc fe ecnijcfnei feinfeicn jodend odncnecn idneicne ncencoenc neonceocneoorijfls ndkndsken",
      status: "Pending",
    },
    {
      id: 2,
      customer: "User1@gmail.com",
      food: "3 foods",
      date: "2024/12/21",
      price: "$35.50",
      deliveryAddress: "Address 2",
      status: "Delivered",
    },
    {
      id: 3,
      customer: "User2@gmail.com",
      food: "1 food",
      date: "2024/12/22",
      price: "$15.00",
      deliveryAddress: "Address 3",
      status: "Canceled",
    },
    {
      id: 4,
      customer: "User3@gmail.com",
      food: "4 foods",
      date: "2024/12/23",
      price: "$45.00",
      deliveryAddress: "Address 4",
      status: "Pending",
    },
    {
      id: 5,
      customer: "User4@gmail.com",
      food: "2 foods",
      date: "2024/12/24",
      price: "$30.00",
      deliveryAddress: "Address 5",
      status: "Delivered",
    },
    {
      id: 6,
      customer: "User5@gmail.com",
      food: "1 food",
      date: "2024/12/25",
      price: "$12.99",
      deliveryAddress: "Address 6",
      status: "Pending",
    },
    {
      id: 7,
      customer: "User6@gmail.com",
      food: "3 foods",
      date: "2024/12/26",
      price: "$40.00",
      deliveryAddress: "Address 7",
      status: "Canceled",
    },
    {
      id: 8,
      customer: "User7@gmail.com",
      food: "5 foods",
      date: "2024/12/27",
      price: "$55.50",
      deliveryAddress: "Address 8",
      status: "Pending",
    },
    {
      id: 9,
      customer: "User8@gmail.com",
      food: "2 foods",
      date: "2024/12/28",
      price: "$25.00",
      deliveryAddress: "Address 9",
      status: "Delivered",
    },
    {
      id: 10,
      customer: "User9@gmail.com",
      food: "1 food",
      date: "2024/12/29",
      price: "$18.99",
      deliveryAddress: "Address 10",
      status: "Pending",
    },
  ]);

  const addAdminOrder = (order: Omit<AdminOrder, "id">) => {
    const newOrder: AdminOrder = {
      ...order,
      id: Math.max(...adminOrders.map(o => o.id), 0) + 1,
    };
    setAdminOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: number, status: string) => {
    setAdminOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <AdminOrdersContext.Provider value={{ adminOrders, addAdminOrder, updateOrderStatus }}>
      {children}
    </AdminOrdersContext.Provider>
  );
}

export function useAdminOrders() {
  const context = useContext(AdminOrdersContext);
  if (context === undefined) {
    throw new Error("useAdminOrders must be used within an AdminOrdersProvider");
  }
  return context;
} 