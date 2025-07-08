var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getUserAuth = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/ Get huselt irlee");
});
export const getUserResetPassReq = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/ Get huselt irlee");
});
export const createUserSignIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/:foodId Get huselt irlee");
});
export const createUserSignUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/ Post huselt irlee");
});
export const createUserResetPassReq = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/:foodId Patch huselt irlee");
});
export const createUserResetPass = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send("food/:foodId Delete huselt irlee");
});
