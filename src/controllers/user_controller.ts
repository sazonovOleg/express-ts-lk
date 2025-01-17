import {UserModelsType} from "../models/user_models";
import {Response} from "express";

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

let user: UserModelsType = {
    name: '',
    token: '',
}

class UserController {
    getData(res: Response) {
        const tokenKey: string = 'token_key'
        const loginKey: string = 'login_key'

        try {
            const name: string = localStorage.getItem(loginKey)
            const token: string = localStorage.getItem(tokenKey)

            user = {
                name: name,
                token: token,
            }

            return res.status(200).json({user})
        } catch (e) {
            console.error(e)

            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }
}

module.exports = new UserController()