import {Router} from "express";

const userRouter = Router()
const _controller = require('../controllers/user_controller')

userRouter.get('/', _controller.getData)

export {userRouter}