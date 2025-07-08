import { Order } from "../models/index.js";
export const getFoodOrder = async (_request, response) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("orderItemSchema.Food");
        response.send({ success: true, data: orders });
    }
    catch (error) {
        response.status(303).json({ success: false, error: error });
    }
};
export const getFoodOrderById = async (request, response) => {
    try {
        const { userId } = request.params;
        const order = await Order.findById(userId).populate("user");
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
};
export const createFoodOrder = async (request, response) => {
    try {
        const order = request.body;
        const createdOrder = await Order.create(order);
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
};
export const updateFoodOrder = async (request, response) => {
    try {
        const { foodOrderId } = request.params;
        const updatedOrder = request.body;
        const order = await Order.findByIdAndUpdate(foodOrderId, updatedOrder, {
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
};
