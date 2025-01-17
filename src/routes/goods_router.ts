import {Router} from "express";

const goodsRouter = Router()
const _controller = require('../controllers/goods_controller')

goodsRouter.get('/', _controller.getGoods)

export {goodsRouter}