"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const _controller = require('../controllers/user_controller');
userRouter.get('/getData', _controller.getData);
