import Chat from "@/components/chat/Chat.tsx";
import React from "react";

const App: React.FC = () => {
    return (
        <div className={'max-w-screen-lg w-full mx-auto px-8'}>
            <Chat />
        </div>
    );
};

export default App;