"use client";

import { useState, useEffect } from "react";
import Categories from "@/components/categories";
import Nav from "@/components/nav";
import SpecialFOD from "@/components/specialFOD";
import Footer from "@/components/footer";

export type Card = {
  id: number;
  foodName?: string;
  poster_path: string;
  price?: number;
  ingredients?: string;
};

// const mockFoodData: Card[] = [
//   {
//     id: 1,
//     foodName: "Margherita Pizza",
//     poster_path: "./apt1.png",
//     price: 12.99,
//     ingredients: "Classic pizza with tomato sauce and mozzarella",
//   },
//   {
//     id: 2,
//     foodName: "Caesar Salad",
//     poster_path: "./apt2.png",
//     price: 8.99,
//     ingredients: "Fresh romaine lettuce with Caesar dressing",
//   },
// ];

export default function Home() {
  const [foodItems, setFoodItems] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setTimeout(() => {
          // setFoodItems(mockFoodData);
          setIsLoading(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchFood();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-[#323232]">
      <Nav />
      <div className="flex max-w-[2000px] w-screen overflow-x-hidden flex-col">
        <SpecialFOD />
        {/* <Categories cards={foodItems} /> */}
      </div>
      <Footer />
    </div>
  );
}
