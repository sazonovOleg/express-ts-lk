import {Request, Response} from "express";
import {goodsModels} from "../models/goods_models";

class GoodsController {
    async getGoods(req: Request, res: Response) {
        try {
            return res.status(200).json({goods: goodsModels})
        } catch (e) {
            console.error(`Error goods`)

            return res.status(500).json({message: 'Ошибка при получении данных'})
        }
    }
}

module.exports = new GoodsController()