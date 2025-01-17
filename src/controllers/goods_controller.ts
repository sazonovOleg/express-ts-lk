import {Request, Response} from "express";

class GoodsController {
    async getGoods(req: Request, res: Response) {
        const list: string[] = ['a','b','c','d']

        return res.status(200).json({list})
    }
}

module.exports = new GoodsController()