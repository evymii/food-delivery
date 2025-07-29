"use client";
import { useState } from "react";

interface Order {
  id: number;
  customer: string;
  food: string;
  date: string;
  price: string;
  deliveryAddress: string;
  status: string;
}

const initialOrders: Order[] = [
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
    price: "$10.00",
    deliveryAddress: "Address 10",
    status: "Pending",
  },
  {
    id: 11,
    customer: "User10@gmail.com",
    food: "4 foods",
    date: "2024/12/30",
    price: "$50.00",
    deliveryAddress: "Address 11",
    status: "Canceled",
  },
  {
    id: 12,
    customer: "User11@gmail.com",
    food: "3 foods",
    date: "2024/12/31",
    price: "$37.50",
    deliveryAddress: "Address 12",
    status: "Delivered",
  },
  {
    id: 13,
    customer: "User12@gmail.com",
    food: "2 foods",
    date: "2025/01/01",
    price: "$28.00",
    deliveryAddress: "Address 13",
    status: "Pending",
  },
  {
    id: 14,
    customer: "User13@gmail.com",
    food: "5 foods",
    date: "2025/01/02",
    price: "$60.00",
    deliveryAddress: "Address 14",
    status: "Delivered",
  },
  {
    id: 15,
    customer: "User14@gmail.com",
    food: "1 food",
    date: "2025/01/03",
    price: "$8.50",
    deliveryAddress: "Address 15",
    status: "Canceled",
  },
  {
    id: 16,
    customer: "User15@gmail.com",
    food: "3 foods",
    date: "2025/01/04",
    price: "$40.00",
    deliveryAddress: "Address 16",
    status: "Pending",
  },
  {
    id: 17,
    customer: "User16@gmail.com",
    food: "2 foods",
    date: "2025/01/05",
    price: "$25.00",
    deliveryAddress: "Address 17",
    status: "Delivered",
  },
  {
    id: 18,
    customer: "User17@gmail.com",
    food: "4 foods",
    date: "2025/01/06",
    price: "$48.00",
    deliveryAddress: "Address 18",
    status: "Pending",
  },
  {
    id: 19,
    customer: "User18@gmail.com",
    food: "5 foods",
    date: "2025/01/07",
    price: "$55.00",
    deliveryAddress: "Address 19",
    status: "Canceled",
  },
  {
    id: 20,
    customer: "User19@gmail.com",
    food: "2 foods",
    date: "2025/01/08",
    price: "$30.00",
    deliveryAddress: "Address 20",
    status: "Delivered",
  },
  {
    id: 21,
    customer: "User20@gmail.com",
    food: "3 foods",
    date: "2025/01/09",
    price: "$36.00",
    deliveryAddress: "Address 21",
    status: "Pending",
  },
  {
    id: 22,
    customer: "User21@gmail.com",
    food: "1 food",
    date: "2025/01/10",
    price: "$12.00",
    deliveryAddress: "Address 22",
    status: "Delivered",
  },
  {
    id: 23,
    customer: "User22@gmail.com",
    food: "4 foods",
    date: "2025/01/11",
    price: "$55.00",
    deliveryAddress: "Address 23",
    status: "Canceled",
  },
  {
    id: 24,
    customer: "User23@gmail.com",
    food: "3 foods",
    date: "2025/01/12",
    price: "$40.00",
    deliveryAddress: "Address 24",
    status: "Pending",
  },
  {
    id: 25,
    customer: "User24@gmail.com",
    food: "2 foods",
    date: "2025/01/13",
    price: "$20.00",
    deliveryAddress: "Address 25",
    status: "Delivered",
  },
];

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState<boolean[]>(
    new Array(initialOrders.length).fill(false)
  );

  const toggleSelectAll = () => {
    const allSelected = selectedOrders.every(Boolean);
    setSelectedOrders(new Array(orders.length).fill(!allSelected));
  };

  const toggleSelectOrder = (index: number) => {
    const newSelectedOrders = [...selectedOrders];
    newSelectedOrders[index] = !newSelectedOrders[index];
    setSelectedOrders(newSelectedOrders);
  };

  const updateFood = (index: number, value: string) => {
    const foodCount = parseInt(value) || 0; // Get the number of foods
    const newPrice = (foodCount * 13).toFixed(2); // Calculate price based on food count
    const newOrders = [...orders];
    newOrders[index].food = `${foodCount} food${foodCount > 1 ? "s" : ""}`; // Update food description
    newOrders[index].price = `$${newPrice}`; // Update price
    setOrders(newOrders);
  };

  const updateMail = (index: number, value: string) => {
    const newOrders = [...orders];
    newOrders[index].customer = value;
    setOrders(newOrders);
  };

  const updateAddress = (index: number, value: string) => {
    const newOrders = [...orders];
    newOrders[index].deliveryAddress = value;
    setOrders(newOrders);
  };

  const updateDate = (index: number, value: string) => {
    const newOrders = [...orders];
    newOrders[index].date = value;
    setOrders(newOrders);
  };

  const updateStatus = (index: number, value: string) => {
    const newOrders = [...orders];
    newOrders[index].status = value;
    setOrders(newOrders);
  };

  return (
    <div className="  w-300 overflow-y-scroll h-screen pb-35   ">
      <table className="min-w-full  h-screen border-collapse border border-gray-300 ">
        <thead className="bg-gray-200 items-start  w-300 h-15 p-[-6]   ">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedOrders.every(Boolean)}
                onChange={toggleSelectAll}
              />
            </th>
            <th>№</th>
            <th>Customer</th>
            <th>Food</th>
            <th>Date</th>
            <th>Price</th>
            <th>Delivery Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="  ">
          {orders.map((order, index) => (
            <tr key={order.id} className="hover:bg-gray-100 h-15 ">
              <td>
                <input
                  type="checkbox"
                  checked={selectedOrders[index]}
                  onChange={() => toggleSelectOrder(index)}
                />
              </td>
              <td>{order.id}</td>
              <td>
                <input
                  type="email"
                  value={order.customer}
                  onChange={(e) => updateMail(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={parseInt(order.food) || ""}
                  onChange={(e) => updateFood(index, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={order.date}
                  onChange={(e) => updateDate(index, e.target.value)}
                />
              </td>
              <td>{order.price}</td>
              <td>
                <input
                  type="text"
                  className=" flex flex-wrap w-max-25"
                  value={order.deliveryAddress}
                  onChange={(e) => updateAddress(index, e.target.value)}
                />
              </td>
              <td
                className={`border relative rounded-full  w-fit h-fit flex  ${
                  order.status === "Pending"
                    ? "border-red-400"
                    : order.status === "Delivered"
                    ? "border-green-400"
                    : order.status === "Canceled"
                    ? "border-gray-400"
                    : ""
                }`}
              >
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(index, e.target.value)}
                  className={`flex w-fit h-fit p-1 border-1 rounded-full relative  ${
                    order.status === "Pending"
                      ? "flex w-fit h-fit border-red-400 p-1 focus:border-2 rounded-full absolute"
                      : order.status === "Delivered"
                      ? "flex w-fit h-fit border-green-400 p-1 focus:border-2 rounded-full absolute"
                      : order.status === "Canceled"
                      ? "flex w-fit h-fit border-gray-400 p-1 focus:border-2 rounded-full absolute"
                      : ""
                  }`}
                >
                  <option value="Pending" className=" pt-5">
                    Pending
                  </option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
