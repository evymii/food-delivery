"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { foodAPI, categoryAPI } from "@/lib/api";

export interface FoodItem {
  _id?: string;
  foodName: string;
  price: number;
  image?: string;
  ingredients?: string;
  category?: string;
}

export interface Category {
  _id?: string;
  categoryName: string;
}

interface FoodContextType {
  foodItems: FoodItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addFoodItem: (foodData: Omit<FoodItem, "_id">) => Promise<void>;
  addCategory: (categoryData: Omit<Category, "_id">) => Promise<void>;
  updateFoodItem: (id: string, foodData: Partial<FoodItem>) => Promise<void>;
  deleteFoodItem: (id: string) => Promise<void>;
  refreshFoodItems: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: ReactNode }) {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      const response = await foodAPI.getAll();
      if (response.success) {
        setFoodItems(response.data);
      } else {
        setError("Failed to fetch food items");
      }
    } catch (err) {
      setError("Error fetching food items");
      console.error("Error fetching food items:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      if (response.success) {
        setCategories(response.data);
      } else {
        setError("Failed to fetch categories");
      }
    } catch (err) {
      setError("Error fetching categories");
      console.error("Error fetching categories:", err);
    }
  };

  const addFoodItem = async (foodData: Omit<FoodItem, "_id">) => {
    try {
      const response = await foodAPI.create(foodData);
      if (response.success) {
        setFoodItems(prev => [...prev, response.data]);
      } else {
        throw new Error("Failed to create food item");
      }
    } catch (err) {
      setError("Error creating food item");
      throw err;
    }
  };

  const addCategory = async (categoryData: Omit<Category, "_id">) => {
    try {
      const response = await categoryAPI.create(categoryData);
      if (response.success) {
        setCategories(prev => [...prev, response.data]);
      } else {
        throw new Error("Failed to create category");
      }
    } catch (err) {
      setError("Error creating category");
      throw err;
    }
  };

  const updateFoodItem = async (id: string, foodData: Partial<FoodItem>) => {
    try {
      const response = await foodAPI.update(id, foodData);
      if (response.success) {
        setFoodItems(prev => 
          prev.map(item => 
            item._id === id ? { ...item, ...response.data } : item
          )
        );
      } else {
        throw new Error("Failed to update food item");
      }
    } catch (err) {
      setError("Error updating food item");
      throw err;
    }
  };

  const deleteFoodItem = async (id: string) => {
    try {
      const response = await foodAPI.delete(id);
      if (response.success) {
        setFoodItems(prev => prev.filter(item => item._id !== id));
      } else {
        throw new Error("Failed to delete food item");
      }
    } catch (err) {
      setError("Error deleting food item");
      throw err;
    }
  };

  const refreshFoodItems = async () => {
    await fetchFoodItems();
  };

  const refreshCategories = async () => {
    await fetchCategories();
  };

  useEffect(() => {
    fetchFoodItems();
    fetchCategories();
  }, []);

  return (
    <FoodContext.Provider value={{
      foodItems,
      categories,
      loading,
      error,
      addFoodItem,
      addCategory,
      updateFoodItem,
      deleteFoodItem,
      refreshFoodItems,
      refreshCategories,
    }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFood() {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
} 