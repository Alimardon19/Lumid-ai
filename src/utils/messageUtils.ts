// messageUtils.ts
import {message as staticMessage} from 'antd';
import {MessageInstance} from "antd/es/message/interface";

let contextMessage: MessageInstance = staticMessage;

export const setMessageContext = (msg: MessageInstance) => {
    contextMessage = msg;
};

export const showMessage = {
    success: (text: string) => contextMessage.success(text),
    error: (text: string) => contextMessage.error(text),
    info: (text: string) => contextMessage.info(text),
};
