import React, {FormEventHandler, HTMLProps, Ref, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {SendJsonMessage} from "react-use-websocket/dist/lib/types";

interface Props extends HTMLProps<HTMLFormElement> {
    sendMessage: SendJsonMessage;
    setResponse: React.Dispatch<React.SetStateAction<string>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    inputRef: Ref<HTMLInputElement>;
}

const UserInput: React.FC<Props> = ({sendMessage, setResponse, disabled, setDisabled, inputRef, ...props}) => {
    const [value, setValue] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setResponse('');
        sendMessage({message: value});
        setDisabled(true)
        setValue('');
    }

    return (
        <form {...props} onSubmit={handleSubmit}>
            <Input
                name={"input"}
                className="h-auto font-semibold"
                value={value}
                onChange={(e) => !disabled && setValue(e.target.value)}
                disabled={disabled}
                ref={inputRef}
            />
        </form>
    );
};

export default UserInput;