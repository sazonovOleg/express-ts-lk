export type ChatModelType = {
    reactUserMessage: string,
    flutterUserMessage: string,
}

export type StreamSendMessageType = {
    isSendReactMsg: boolean,
    isSendFlutterMsg: boolean,
}

export const ChatModelEmpty: ChatModelType = {
    reactUserMessage: '',
    flutterUserMessage: '',
}