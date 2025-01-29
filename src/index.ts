import express, {Express, json} from 'express';
import {routerProvider} from "./routes/router_provider";
import cors from 'cors'
import {ChatService} from "./services/chat_service";

const app: Express = express()
const dotenv = require("dotenv");

class App {
    private chatService: ChatService

    private initConfig() {
        dotenv.config()
        app.use(cors())
        app.use(json())
        app.use('/api', routerProvider)
    }

    constructor() {
        this.chatService = new ChatService()
        this.initConfig()
    }

    private appListenPort() {
        app.listen(3020, "127.0.0.1", () => {
            console.log("SERVER START: ---------- PORT ----------", 3020);
        }).on("error", (error: Error) => {
            throw new Error(error.message);
        })
    }

    startApp() {
        this.appListenPort()
        this.chatService.startReactWSS()
        this.chatService.startFlutterWSS()
    }
}

const startApp = new App()

startApp.startApp()

