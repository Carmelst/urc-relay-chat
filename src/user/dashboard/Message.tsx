import {Button} from "@chakra-ui/react";
import "./Message.css";
import {MessageBullet} from "./MessageBullet";
import {useEffect, useRef} from "react";

export const Message = () => {

    const conversationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Défile automatiquement vers le bas
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, []); // Défile lorsque "messages" est mis à jour
    return (
        <>
            <div className="messages">
                <div className="conversation" ref={conversationRef}>
                    <MessageBullet />
                </div>
                <div className="message">
                    <textarea id="message" name="message" placeholder="Message"></textarea>
                    <Button marginLeft="20px">Envoyer</Button>
                </div>
            </div>
        </>
    );
}