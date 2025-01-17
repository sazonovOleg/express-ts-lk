import express, {Request, Response, Express, json} from 'express';
import {routerProvider} from "./routes/router_provider";
import cors from 'cors'

const app: Express = express()
const dotenv = require("dotenv");

class App {
    initConfig() {
        dotenv.config()
        app.use(cors())
        app.use(json())
        app.use('/api', routerProvider)
    }

    appListenPort() {
        //const port: string = process.env.PORT || 3020

        app.listen(3020, () => {
            console.log("SERVER START: ---------- PORT ----------", 3020);
        }).on("error", (error: Error) => {
            throw new Error(error.message);
        })
    }

    startApp() {
        this.initConfig()
        this.appListenPort()
    }
}

const startApp = new App()

startApp.startApp()

