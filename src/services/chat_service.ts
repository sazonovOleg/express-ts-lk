import WebSocket, {WebSocketServer} from 'ws'
import {ChatModelEmpty, ChatModelType, StreamSendMessageType} from "../models/chat_model";
import {BehaviorSubject} from "rxjs";

const sendMessageStream = new BehaviorSubject<StreamSendMessageType>({
    isSendFlutterMsg: false,
    isSendReactMsg: false,
})

const messagesStreamObj = new BehaviorSubject<ChatModelType>({
    reactUserMessage: '',
    flutterUserMessage: '',
})

function resetSendMsgStream() {
    sendMessageStream.next(<StreamSendMessageType>{
        isSendReactMsg: false,
        isSendFlutterMsg: false,
    })
}

let messageObject = {
    reactUserMessage: '',
    flutterUserMessage: '',
}

export class ChatService {
    private flutterWSS: WebSocketServer
    private reactWSS: WebSocketServer

    constructor() {
        this.flutterWSS = new WebSocketServer({port: 3030})
        this.reactWSS = new WebSocketServer({port: 3040})
    }

    startReactWSS(): void {
        try {
            this.reactWSS.on('connection', (ws: WebSocket) => {
                console.log(`WEBSOCKET CONNECTION`)

                ws.on('open', () => {
                    ws.send('open')
                })

                ws.onmessage = function (event) {
                    const chatModel: ChatModelType = JSON.parse((event.data) as string)

                    messagesStreamObj.subscribe((value) => {
                        messageObject.reactUserMessage = chatModel.reactUserMessage
                        messageObject.flutterUserMessage = value.flutterUserMessage
                    })

                    messagesStreamObj.next(messageObject)
                    sendMessageStream.next({
                        isSendFlutterMsg: true,
                        isSendReactMsg: false,
                    })

                    resetSendMsgStream()
                    messagesStreamObj.next(ChatModelEmpty)
                }

                sendMessageStream.subscribe((value) => {
                    if (value.isSendReactMsg) {
                        ws.send(JSON.stringify(messagesStreamObj.value))
                    }
                })

                ws.on('close', () => {
                    console.log('Client disconnected');
                });
            })

        } catch (e) {
            console.error(`ERROR ---------- ${e}`)
        }
    }

    startFlutterWSS(): void {
        try {
            this.flutterWSS.on('connection', (ws: WebSocket) => {
                console.log(`WEBSOCKET CONNECTION`)

                ws.on('open', () => ws.send('open'))

                ws.onmessage = function (event) {
                    const chatModel: ChatModelType = JSON.parse((event.data) as string)

                    messagesStreamObj.subscribe((value) => {
                        messageObject.reactUserMessage = value.reactUserMessage
                        messageObject.flutterUserMessage = chatModel.flutterUserMessage
                    })

                    messagesStreamObj.next(messageObject)
                    sendMessageStream.next({
                        isSendFlutterMsg: false,
                        isSendReactMsg: true,
                    })

                    resetSendMsgStream()
                    messagesStreamObj.next(ChatModelEmpty)
                }

                sendMessageStream.subscribe((value) => {
                    if (value.isSendFlutterMsg) {
                        ws.send(JSON.stringify(messagesStreamObj.value))
                    }
                })

                ws.on('close', () => {
                    console.log('Client disconnected');
                });
            })
        } catch (e) {
            console.error(`ERROR ---------- ${e}`)
        }
    }
}