"use client";

import { useState, useEffect } from "react";
import Categories from "@/components/categories";
import Nav from "@/components/nav";
import SpecialFOD from "@/components/specialFOD";
import Footer from "@/components/footer";
import { PageLoader } from "@/components/LoadingSpinner";
import { useCart } from "@/context/cartcontext";
import { useFood } from "@/context/foodContext";

export type Card = {
  id: number;
  foodName?: string;
  poster_path: string;
  price?: number;
  ingredients?: string;
};

const mockFoodData: Card[] = [
  {
    id: 1,
    foodName: "Margherita Pizza",
    poster_path: "./images/sld1.png",
    price: 12.99,
    ingredients: "Classic pizza with tomato sauce and mozzarella",
  },
  {
    id: 2,
    foodName: "Caesar Salad",
    poster_path: "./images/sld2.png",
    price: 8.99,
    ingredients: "Fresh romaine lettuce with Caesar dressing",
  },
  {
    id: 3,
    foodName: "Chicken Wings",
    poster_path: "./images/sld3.png",
    price: 15.99,
    ingredients: "Crispy chicken wings with buffalo sauce",
  },
  {
    id: 4,
    foodName: "Pasta Carbonara",
    poster_path: "./images/apt1.png",
    price: 18.99,
    ingredients: "Creamy pasta with bacon and parmesan",
  },
];

export default function Home() {
  const { foodItems, loading } = useFood();
  const { cartCount } = useCart();

  // Transform food items to match Card type
  const transformedFoodItems: Card[] = foodItems.map(item => ({
    id: parseInt(item._id?.slice(-4) || '0', 16), // Use last 4 chars of _id as number
    foodName: item.foodName,
    poster_path: item.image || "/images/saladImage.png",
    price: item.price,
    ingredients: item.ingredients,
  }));

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-[#323232]">
      <Nav cartCount={cartCount} />
      <div className="flex max-w-[2000px] w-screen overflow-x-hidden flex-col">
        <SpecialFOD />
        <Categories cards={transformedFoodItems} />
      </div>
      <Footer />
    </div>
  );
}
