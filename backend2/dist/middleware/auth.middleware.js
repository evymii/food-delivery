var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
// import { User } from "../models";
export const verifyToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.header("Authorization");
    const user = yield User.findOne(request.userId);
    console.log("user", user);
    if (!token)
        return response.status(401).json({ error: "Access denied" });
    if ((user === null || user === void 0 ? void 0 : user.role) === "User") {
        try {
            const decoded = jwt.verify(token, "meow-test");
            request.userId = decoded.userId;
            next();
        }
        catch (error) {
            response.status(400).json({ error: error });
        }
    }
    else {
        response.status(400).json({ error: "Access denied!" });
    }
});
