var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Food } from "../models/index.js";
export const getAllFoods = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foods = yield Food.find();
        response.send({ success: true, data: foods });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
});
export const getFoodByid = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodId } = request.params;
        const food = yield Food.findById(foodId);
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
});
export const createFood = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = request.body;
        const createdFood = yield Food.create(food);
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
});
export const updateFood = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodId } = request.params;
        const updatedFood = request.body;
        const food = yield Food.findByIdAndUpdate(foodId, updatedFood, {
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
});
export const deleteFood = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodId } = request.params;
        const deletedFood = yield Food.findByIdAndDelete(foodId);
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
});
