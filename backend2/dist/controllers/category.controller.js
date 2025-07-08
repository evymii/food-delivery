var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Category } from "../models/index.js";
export const getFoodCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category.find();
        response.send({ success: true, data: categories });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
});
export const createFoodCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = request.body;
        const createdCategory = yield Category.create(category);
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
});
export const updateFoodCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodCategoryId } = request.params;
        const updatedCategory = request.body;
        const category = yield Category.findByIdAndUpdate(foodCategoryId, updatedCategory, {
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
});
export const deleteFoodCategory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodCategoryId } = request.params;
        const deletedCategory = yield Category.findByIdAndDelete(foodCategoryId);
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
});
