import { Category } from "../models/index.js";
export const getFoodCategory = async (request, response) => {
    try {
        const categories = await Category.find();
        response.send({ success: true, data: categories });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
};
export const createFoodCategory = async (request, response) => {
    try {
        const category = request.body;
        const createdCategory = await Category.create(category);
        response.json({
            success: true,
            data: createdCategory,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
export const updateFoodCategory = async (request, response) => {
    try {
        const { foodCategoryId } = request.params;
        const updatedCategory = request.body;
        const category = await Category.findByIdAndUpdate(foodCategoryId, updatedCategory, {
            new: true,
        });
        response.json({
            success: true,
            data: category,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
export const deleteFoodCategory = async (request, response) => {
    try {
        const { foodCategoryId } = request.params;
        const deletedCategory = await Category.findByIdAndDelete(foodCategoryId);
        response.json({
            success: true,
            data: deletedCategory,
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            error: error,
        });
    }
};
