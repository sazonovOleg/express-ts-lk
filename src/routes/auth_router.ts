import {Router} from "express";

const authRouter = Router()
const _controller = require('../controllers/auth_controller')
const authMiddleware = require('../middleware/auth_middleware')

authRouter.get('/auth', authMiddleware, _controller.checkAuth)
authRouter.post('/login', _controller.login)
authRouter.post('/registration', _controller.registration)

export {authRouter}