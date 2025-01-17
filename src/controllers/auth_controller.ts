import {Request, Response} from "express";

const jwt = require('jsonwebtoken')
const tokenKey: string = 'token_key'
const loginKey: string = 'login_key'
const passKey: string = 'pass_key'
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

function generateJwt(name: string, pass: string) {
    return jwt.sign({id: name, pass}, process.env.SECRET_KEY, {
        expiresIn: '24h',
    })
}

class AuthController {
    async login(req: Request, res: Response) {
        let isLogin = false

        try {
            const {name, password} = req.body

            const userName: string = localStorage.getItem(loginKey)
            const userPass: string = localStorage.getItem(passKey)

            if (name.toString() != userName && password.toString() != userPass) {
                return res.status(403).json({message: 'Неверные данные'})
            }

            isLogin = true

            return res.status(200).json({isLogin})
        } catch (e) {

        }
    }

    async checkAuth(req: Request, res: Response) {
        const {name, password} = req.body
        const token = generateJwt(name, password)

        return res.json({token})
    }

    async registration(req: Request, res: Response) {
        try {
            const {name, password} = req.body

            if (!name && !password) {
                return res.status(403).json({message: 'Заполните данные'})
            }

            const token = generateJwt(name, password)

            localStorage.setItem(tokenKey, token)
            localStorage.setItem(loginKey, name)
            localStorage.setItem(passKey, password)

            return res.json({token})
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = new AuthController()