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
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
let user = {
    name: '',
    token: '',
};
class UserController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenKey = 'token_key';
            const loginKey = 'login_key';
            try {
                const name = localStorage.getItem(loginKey);
                const token = localStorage.getItem(tokenKey);
                user = {
                    name: name,
                    token: token,
                };
                return res.status(200).json({ user: user });
            }
            catch (e) {
                console.error(e);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
        });
    }
}
module.exports = new UserController();
