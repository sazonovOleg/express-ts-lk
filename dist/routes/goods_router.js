"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodsRouter = void 0;
const express_1 = require("express");
const goodsRouter = (0, express_1.Router)();
exports.goodsRouter = goodsRouter;
const _controller = require('../controllers/goods_controller');
goodsRouter.get('/', _controller.getGoods);
