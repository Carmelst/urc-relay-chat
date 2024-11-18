import {Button} from "@chakra-ui/react";
import "./Message.css";

export const Message = () => {
    return (
        <>
            <div className="messages">
                <div className="conversation">

                </div>
                <div className="message">
                    <textarea id="message" name="message" placeholder="Message"></textarea>
                    <Button marginLeft="20px">Envoyer</Button>
                </div>
            </div>
        </>
    );
}