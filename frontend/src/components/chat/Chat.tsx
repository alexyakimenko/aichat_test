import React, {useEffect, useRef, useState} from "react";
import ChatScreen from "@/components/chat/screen/ChatScreen.tsx";
import UserInput from "@/components/chat/UserInput.tsx";
import './chat.css'
import useWebSocket from "react-use-websocket";
import debounce from "@/lib/debounce.ts";

const Chat: React.FC = () => {
    const [response, setResponse] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

    const WS_URL = 'ws://localhost:8000';
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL);

    const enableInput = useRef(debounce(() => {
        setDisabled(false);
    }, 500));

    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, [disabled]);

    useEffect(() => {
        if(lastJsonMessage !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setResponse(str => str + (lastJsonMessage?.response ?? ''))
        }
        enableInput.current();
    }, [lastJsonMessage]);

    return (
        <div className={' chat_grid h-screen w-full pb-12 pt-4'}>
            <ChatScreen message={response} />
            <UserInput
                className={"h-full"}
                sendMessage={sendJsonMessage}
                setResponse={setResponse}
                disabled={disabled}
                setDisabled={setDisabled}
                inputRef={inputRef}
            />
        </div>
    );
};

export default Chat;