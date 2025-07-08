var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Order } from "../models/index.js";
export const getFoodOrder = (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order.find()
            .populate("user")
            .populate("orderItemSchema.Food");
        response.send({ success: true, data: orders });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
});
export const getFoodOrderById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.params;
        const order = yield Order.findById(userId).populate("user");
        response.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const createFoodOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = request.body;
        const createdOrder = yield Order.create(order);
        response.json({
            success: true,
            data: createdOrder,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
export const updateFoodOrder = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodOrderId } = request.params;
        const updatedOrder = request.body;
        const order = yield Order.findByIdAndUpdate(foodOrderId, updatedOrder, {
            new: true,
        });
        response.json({
            success: true,
            data: order,
        });
    }
    catch (error) {
        response.status(444).json({
            success: false,
            error: error,
        });
    }
});
