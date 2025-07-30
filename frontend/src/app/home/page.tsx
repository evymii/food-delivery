"use client";

import { useState, useEffect } from "react";
import Categories from "@/components/categories";
import Nav from "@/components/nav";
import SpecialFOD from "@/components/specialFOD";
import Footer from "@/components/footer";
import { PageLoader } from "@/components/LoadingSpinner";
import { useCart } from "@/context/cartcontext";

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
    poster_path: "/images/pizza.jpg",
    price: 12.99,
    ingredients: "Classic pizza with tomato sauce and mozzarella",
  },
  {
    id: 2,
    foodName: "Caesar Salad",
    poster_path: "/images/salad.jpg",
    price: 8.99,
    ingredients: "Fresh romaine lettuce with Caesar dressing",
  },
  {
    id: 3,
    foodName: "Chicken Wings",
    poster_path: "/images/wings.jpg",
    price: 15.99,
    ingredients: "Crispy chicken wings with buffalo sauce",
  },
  {
    id: 4,
    foodName: "Pasta Carbonara",
    poster_path: "/images/pasta.jpg",
    price: 18.99,
    ingredients: "Creamy pasta with bacon and parmesan",
  },
];

export default function Home() {
  const [foodItems, setFoodItems] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cartCount } = useCart();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setTimeout(() => {
          setFoodItems(mockFoodData);
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
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-[#323232]">
      <Nav cartCount={cartCount} />
      <div className="flex max-w-[2000px] w-screen overflow-x-hidden flex-col">
        <SpecialFOD />
        <Categories cards={foodItems} />
      </div>
      <Footer />
    </div>
  );
}
