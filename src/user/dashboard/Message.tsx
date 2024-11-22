import type { AppDispatch } from '../../app/store';
import {Button} from "@chakra-ui/react";
import "./Message.css";
import {MessageBullet} from "./MessageBullet";
import React, {useEffect, useRef, useState} from "react";
import {sendMessage} from "../../app/services";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {saveMessage} from "../../app/userSlice";

export const Message = () => {
    const conversationRef = useRef<HTMLDivElement>(null);
    const { token, externalId, selectedDiscussionId, messages} = useSelector((state: RootState) => state.user);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleMessageWriting = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    const send =() => {
        setLoading(true);
        const newMessage = { content : message, senderId: externalId, receiverId: selectedDiscussionId, date : new Date().toLocaleString()};
        sendMessage(newMessage, token)
            .then((response) => {console.log(response); setMessage(""); dispatch(saveMessage(newMessage)) ;setLoading(false);})
            .catch((error) => {console.log(error)});
    }

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="messages">
                <div className="conversation" ref={conversationRef}>
                    <MessageBullet/>
                </div>
                <div className="message">
                    <textarea id="message" name="message" placeholder="Message" onChange={handleMessageWriting} value={message}></textarea>
                    <Button marginLeft="20px" onClick={send}>{ loading ? 'Envoi en cours...' : 'Envoyer' }</Button>
                </div>
            </div>
        </>
    );
}