import { Food } from "../models/index.js";
export const getAllFoods = async (_request, response) => {
    try {
        const foods = await Food.find();
        response.send({ success: true, data: foods });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
};
export const getFoodByid = async (request, response) => {
    try {
        const { foodId } = request.params;
        const food = await Food.findById(foodId);
        response.json({
            success: true,
            data: food,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
export const createFood = async (request, response) => {
    try {
        const food = request.body;
        const createdFood = await Food.create(food);
        response.json({
            success: true,
            data: createdFood,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
export const updateFood = async (request, response) => {
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
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
};
export const deleteFood = async (request, response) => {
    try {
        const { foodId } = request.params;
        const deletedFood = await Food.findByIdAndDelete(foodId);
        response.json({
            success: true,
            data: deletedFood,
        });
    }
    catch (error) {
        response.status(500).json({
            success: false,
            error: error,
        });
    }
};
