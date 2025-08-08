"use client";

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

export default function Home() {
  const { foodItems, loading } = useFood();
  const { cartCount } = useCart();

  // Transform food items to match Card type
  const transformedFoodItems: Card[] = foodItems.map((item) => ({
    id: parseInt(item._id?.slice(-4) || "0", 16), // Use last 4 chars of _id as number
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
