import {Router} from "express";
import {authRouter} from "./auth_router";
import {goodsRouter} from "./goods_router";
import {userRouter} from "./user_router";

const routerProvider = Router()

routerProvider.use('/auth', authRouter)
routerProvider.use('/goods', goodsRouter)
routerProvider.use('/user', userRouter)

export {routerProvider}