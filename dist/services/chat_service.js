"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ws_1 = require("ws");
const chat_model_1 = require("../models/chat_model");
const rxjs_1 = require("rxjs");
const sendMessageStream = new rxjs_1.BehaviorSubject({
    isSendFlutterMsg: false,
    isSendReactMsg: false,
});
const messagesStreamObj = new rxjs_1.BehaviorSubject({
    reactUserMessage: '',
    flutterUserMessage: '',
});
function resetSendMsgStream() {
    sendMessageStream.next({
        isSendReactMsg: false,
        isSendFlutterMsg: false,
    });
}
let messageObject = {
    reactUserMessage: '',
    flutterUserMessage: '',
};
class ChatService {
    constructor() {
        this.flutterWSS = new ws_1.WebSocketServer({ port: 3030 });
        this.reactWSS = new ws_1.WebSocketServer({ port: 3040 });
    }
    startReactWSS() {
        try {
            this.reactWSS.on('connection', (ws) => {
                console.log(`WEBSOCKET CONNECTION`);
                ws.on('open', () => {
                    ws.send('open');
                });
                ws.onmessage = function (event) {
                    const chatModel = JSON.parse((event.data));
                    messagesStreamObj.subscribe((value) => {
                        messageObject.reactUserMessage = chatModel.reactUserMessage;
                        messageObject.flutterUserMessage = value.flutterUserMessage;
                    });
                    messagesStreamObj.next(messageObject);
                    sendMessageStream.next({
                        isSendFlutterMsg: true,
                        isSendReactMsg: false,
                    });
                    resetSendMsgStream();
                    messagesStreamObj.next(chat_model_1.ChatModelEmpty);
                };
                sendMessageStream.subscribe((value) => {
                    if (value.isSendReactMsg) {
                        ws.send(JSON.stringify(messagesStreamObj.value));
                    }
                });
                ws.on('close', () => {
                    console.log('Client disconnected');
                });
            });
        }
        catch (e) {
            console.error(`ERROR ---------- ${e}`);
        }
    }
    startFlutterWSS() {
        try {
            this.flutterWSS.on('connection', (ws) => {
                console.log(`WEBSOCKET CONNECTION`);
                ws.on('open', () => ws.send('open'));
                ws.onmessage = function (event) {
                    const chatModel = JSON.parse((event.data));
                    messagesStreamObj.subscribe((value) => {
                        messageObject.reactUserMessage = value.reactUserMessage;
                        messageObject.flutterUserMessage = chatModel.flutterUserMessage;
                    });
                    messagesStreamObj.next(messageObject);
                    sendMessageStream.next({
                        isSendFlutterMsg: false,
                        isSendReactMsg: true,
                    });
                    resetSendMsgStream();
                    messagesStreamObj.next(chat_model_1.ChatModelEmpty);
                };
                sendMessageStream.subscribe((value) => {
                    if (value.isSendFlutterMsg) {
                        ws.send(JSON.stringify(messagesStreamObj.value));
                    }
                });
                ws.on('close', () => {
                    console.log('Client disconnected');
                });
            });
        }
        catch (e) {
            console.error(`ERROR ---------- ${e}`);
        }
    }
}
exports.ChatService = ChatService;
