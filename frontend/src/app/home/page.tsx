"use client";
import { useState } from "react";
import { useEffect } from "react";

import Categories from "@/components/categories";
import Nav from "@/components/nav";
import SpecialFOD from "@/components/specialFOD";
export type Card = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  price: Number;
  description: String;
};

export default function Home() {
  const [appetizers, setAppetizers] = useState<Card[]>([]);
  const [salads, setSalads] = useState<Card[]>([]);
  const [lunchFavs, setLunchFavs] = useState<Card[]>([]);
  const [FishandSeafds, setFishandSeafds] = useState<Card[]>([]);
  const [brunch, setBrunch] = useState<Card[]>([]);
  const [sideDishes, setSideDishes] = useState<Card[]>([]);
  const [desserts, setDesserts] = useState<Card[]>([]);
  const [beverages, setBeverages] = useState<Card[]>([]);

  const [categories, setCategories] = useState<Card[]>([]);
  const [user, setUser] = useState<Card[]>([]);
  const [order, setOrder] = useState<Card[]>([]);
  const [food, setFood] = useState<Card[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const TMDB_TOKEN =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

  const fetchDatas = async (endpoint: string) => {
    try {
      const response = await fetch(
        `https://food-delivery-7sdi.onrender.com/${endpoint}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      setError(`Failed to load ${endpoint} `);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [category, order, user, food] = await Promise.all([
          fetchDatas("food-category"),
          fetchDatas("food-order"),
          fetchDatas("user"),
          fetchDatas("food"),
        ]);

        setCategories(category);
        setOrder(order);
        setUser(user);
        setFood(food);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load food delivery data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col items-center w-screen h-max bg-[#323232]">
      <Nav />
      <div className=" flex max-w-[2000px] w-screen overflow-x-hidden flex-col h-max ">
        <SpecialFOD />
        <Categories />
      </div>
    </div>
  );
}
