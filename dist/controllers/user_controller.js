"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
let user = {
    name: '',
    token: '',
};
class UserController {
    getData(res) {
        const tokenKey = 'token_key';
        const loginKey = 'login_key';
        try {
            const name = localStorage.getItem(loginKey);
            const token = localStorage.getItem(tokenKey);
            user = {
                name: name,
                token: token,
            };
            return res.status(200).json({ user });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}
module.exports = new UserController();
