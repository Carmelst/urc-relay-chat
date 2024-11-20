import {Button} from "@chakra-ui/react";
import "./Message.css";
import {MessageBullet} from "./MessageBullet";
import React, {useEffect, useRef, useState} from "react";
import {sendMessage} from "../../app/services";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const Message = () => {
    const conversationRef = useRef<HTMLDivElement>(null);
    const { token, externalId, selectedDiscussionId } = useSelector((state: RootState) => state.user);
    const [message, setMessage] = useState("");

    const handleMessageWriting = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    const send =() => {
        sendMessage({content : message, senderId : externalId, receiverId : selectedDiscussionId, date : new Date().toLocaleString()}, token)
            .then((response) => {console.log(response); setMessage("")})
            .catch((error) => {console.log(error)});

    }

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, []);

    return (
        <>
            <div className="messages">
                <div className="conversation" ref={conversationRef}>
                    <MessageBullet/>
                </div>
                <div className="message">
                    <textarea id="message" name="message" placeholder="Message" onChange={handleMessageWriting} value={message}></textarea>
                    <Button marginLeft="20px" onClick={send}>Envoyer</Button>
                </div>
            </div>
        </>
    );
}