"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Camera, X } from "lucide-react";
import { useFood, FoodItem, Category } from "@/context/foodContext";

const AdminFoodMenu: React.FC = () => {
  const { foodItems, categories, addFoodItem, addCategory, loading, error } =
    useFood();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDish, setNewDish] = useState({
    foodName: "",
    price: "",
    ingredients: "",
    image: null as File | null,
    category: "",
  });
  const [newCategory, setNewCategory] = useState({ categoryName: "" });

  // Set default category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && selectedCategory === "All") {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  const handleAddDish = async () => {
    if (!newDish.foodName || !newDish.price || !newDish.ingredients || !newDish.category) {
      alert("Please fill in all required fields: Dish name, Price, Ingredients, and Category");
      return;
    }
    
    setIsAddingDish(true);
    
    try {
      const foodData: any = {
        foodName: newDish.foodName,
        price: parseFloat(newDish.price),
        ingredients: newDish.ingredients,
        category: newDish.category,
      };

      if (newDish.image) {
        foodData.image = newDish.image;
      } else {
        foodData.image = "/images/saladImage.png";
      }

      await addFoodItem(foodData);
      // Set the category of the newly added dish as selected
      if (newDish.category) {
        setSelectedCategory(newDish.category);
      }
      setNewDish({
        foodName: "",
        price: "",
        ingredients: "",
        image: null,
        category: "",
      });
      setShowAddDishModal(false);
    } catch (err) {
      console.error("Error adding dish:", err);
      alert("Error adding dish. Please check all fields and try again.");
    } finally {
      setIsAddingDish(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.categoryName) {
      try {
        await addCategory({
          categoryName: newCategory.categoryName,
        });
        // Set the newly created category as selected
        setSelectedCategory(newCategory.categoryName);
        setNewCategory({ categoryName: "" });
        setShowAddCategoryModal(false);
      } catch (err) {
        console.error("Error adding category:", err);
      }
    }
  };

  // Always show all categories, regardless of filtering
  const groupedFoodItems = categories.reduce((acc, category) => {
    const items = foodItems.filter(
      (item) => item.category === category.categoryName
    );
    acc[category.categoryName] = items;
    return acc;
  }, {} as Record<string, FoodItem[]>);

  // Filter categories based on selection
  const filteredGroupedItems =
    selectedCategory === "All"
      ? groupedFoodItems
      : { [selectedCategory]: groupedFoodItems[selectedCategory] || [] };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Add new dishes & category
          </h1>
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-600">Loading food items...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            onClick={() => setSelectedCategory("All")}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category._id}
              variant={
                selectedCategory === category.categoryName
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedCategory(category.categoryName)}
              className="rounded-full"
            >
              {category.categoryName}
            </Button>
          ))}
          <Button
            onClick={() => setShowAddCategoryModal(true)}
            className="rounded-full bg-black text-white hover:bg-gray-800"
          >
            Add new category
          </Button>
        </div>

        {/* Food Items by Category */}
        <div className="space-y-8 min-h-0 flex-1 pb-8">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No categories yet
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Create your first category to start adding food items
              </p>
              <Button
                onClick={() => setShowAddCategoryModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Add First Category
              </Button>
            </div>
          ) : (
            Object.entries(filteredGroupedItems).map(
              ([categoryName, items]) => (
                <div key={categoryName} className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      {categoryName} ({items.length} items)
                    </h2>
                    <Button
                      onClick={() => {
                        setNewDish({ ...newDish, category: categoryName });
                        setShowAddDishModal(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add to {categoryName}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Add New Dish Card for this category */}
                    <div
                      onClick={() => {
                        setNewDish({ ...newDish, category: categoryName });
                        setShowAddDishModal(true);
                      }}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors min-h-[200px]"
                    >
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
                        <Plus className="text-white" size={24} />
                      </div>
                      <p className="text-gray-600 font-medium text-center">
                        Add new dish to {categoryName}
                      </p>
                    </div>

                    {/* Existing Food Items */}
                    {items.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.foodName}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute bottom-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <Plus className="text-white" size={12} />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.foodName}
                          </h3>
                          <p className="text-red-500 font-semibold mb-2">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.ingredients}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </div>

      {/* Add Dish Modal */}
      {showAddDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <button
                onClick={() => setShowAddDishModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-4">Add new dish</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dish name
                </label>
                <Input
                  value={newDish.foodName}
                  onChange={(e) =>
                    setNewDish({ ...newDish, foodName: e.target.value })
                  }
                  placeholder="Enter dish name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <Input
                  type="number"
                  value={newDish.price}
                  onChange={(e) =>
                    setNewDish({ ...newDish, price: e.target.value })
                  }
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients
                </label>
                <Textarea
                  value={newDish.ingredients}
                  onChange={(e) =>
                    setNewDish({ ...newDish, ingredients: e.target.value })
                  }
                  placeholder="Enter ingredients"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newDish.category}
                  onChange={(e) =>
                    setNewDish({ ...newDish, category: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewDish({ ...newDish, image: file });
                    }
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors"
                >
                  {newDish.image ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(newDish.image)}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg mb-2"
                      />
                      <p className="text-sm text-green-600">Image selected</p>
                    </div>
                  ) : (
                    <>
                      <Camera className="text-gray-400 mb-2" size={24} />
                      <p className="text-sm text-gray-500">
                        Click to upload image
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleAddDish}
                disabled={isAddingDish}
                className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isAddingDish ? "Adding..." : "Add dish"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-4">Add new category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category name
                </label>
                <Input
                  value={newCategory.categoryName}
                  onChange={(e) =>
                    setNewCategory({ categoryName: e.target.value })
                  }
                  placeholder="Enter category name"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleAddCategory}
                className="bg-black text-white hover:bg-gray-800"
              >
                Add category
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFoodMenu;
