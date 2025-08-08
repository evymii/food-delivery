import { Request, Response } from "express";
import { Food, Category } from "../models/index.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const getAllFoods = async (_request: Request, response: Response) => {
  try {
    const foods = await Food.find();
    response.send({ success: true, data: foods });
  } catch (error) {
    response.status(303).json({ success: false, error: error });
  }
};

export const getFoodByid = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const food = await Food.findById(foodId);

    response.json({
      success: true,
      data: food,
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};
export const createFood = async (request: Request, response: Response) => {
  try {
    const food = request.body;

    // Handle image upload if file is present
    if (request.file) {
      const uploadResult = await uploadImage(request.file);
      food.image = uploadResult.url;
      food.cloudinaryPublicId = uploadResult.publicId;
    }

    // Handle category lookup if category name is provided
    if (food.category && typeof food.category === 'string') {
      const category = await Category.findOne({ categoryName: food.category });
      if (category) {
        food.category = category._id;
      } else {
        return response.status(400).json({
          success: false,
          error: "Category not found",
        });
      }
    }

    const createdFood = await Food.create(food);

    response.json({
      success: true,
      data: createdFood,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const updateFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const updatedFood = request.body;

    const food = await Food.findByIdAndUpdate(foodId, updatedFood, {
      new: true,
    });

    response.json({
      success: true,
      data: food,
    });
  } catch (error) {
    response.status(444).json({
      success: false,
      error: error,
    });
  }
};
export const deleteFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;

    const food = await Food.findById(foodId);

    if (!food) {
      return response.status(404).json({
        success: false,
        error: "Food not found",
      });
    }

    // Delete image from Cloudinary if it exists
    if (food.cloudinaryPublicId) {
      try {
        await deleteImage(food.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error(
          "Failed to delete image from Cloudinary:",
          cloudinaryError
        );
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    const deletedFood = await Food.findByIdAndDelete(foodId);

    response.json({
      success: true,
      data: deletedFood,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error,
    });
  }
};
