"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const tokenKey = 'token_key';
const loginKey = 'login_key';
const passKey = 'pass_key';
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
function generateJwt(name, pass) {
    return jwt.sign({ id: name, pass }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
}
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let isLogin = false;
            try {
                const { name, password } = req.body;
                const userName = localStorage.getItem(loginKey);
                const userPass = localStorage.getItem(passKey);
                if (name.toString() != userName && password.toString() != userPass) {
                    return res.status(403).json({ message: 'Неверные данные' });
                }
                isLogin = true;
                return res.status(200).json({ isLogin });
            }
            catch (e) {
            }
        });
    }
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const token = generateJwt(name, password);
            return res.json({ token });
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password } = req.body;
                if (!name && !password) {
                    return res.status(403).json({ message: 'Заполните данные' });
                }
                const token = generateJwt(name, password);
                localStorage.setItem(tokenKey, token);
                localStorage.setItem(loginKey, name);
                localStorage.setItem(passKey, password);
                return res.json({ token });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
module.exports = new AuthController();
