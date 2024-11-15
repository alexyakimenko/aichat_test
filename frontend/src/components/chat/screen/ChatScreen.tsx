import React from "react"

interface Props {
    message: string
}

const ChatScreen: React.FC<Props> = ({message}) => {
    return (
        <div className={'flex flex-col items-start'}>
            {message}
        </div>
    );
};

export default ChatScreen;