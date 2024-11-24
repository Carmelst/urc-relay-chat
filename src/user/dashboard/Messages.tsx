import type { AppDispatch } from '../../app/store';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button, useDisclosure
} from "@chakra-ui/react";
import "./Messages.css";
import {MessageBullet} from "./MessageBullet";
import React, {useEffect, useRef, useState} from "react";
import {sendMessage, sendMessageWithMedia} from "../../app/services";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {saveMessage, selectRoom} from "../../app/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Message} from "../../model/common";


export const Messages = () => {
    const conversationRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const { token, externalId, selectedDiscussionId, selectedRoomId, messages, showRoomMessage} = useSelector((state: RootState) => state.user);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [savingMedia, setSavingMedia] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);


    const handleMessageWriting = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    }

    const send =() => {
        if (!message) {
            onOpen();
            return;
        }
        setLoading(true);
        let newMessage = {} as Message;
        if (showRoomMessage){
            console.log("sending showroom message");
            newMessage = { content : message, senderId: externalId, receiverId: selectedRoomId.toString(), date : new Date().toLocaleString()};
            console.log(newMessage);
            sendMessage(newMessage, selectedRoomId.toString(), token)
                .then((response) => {console.log(response); setMessage(""); dispatch(saveMessage(newMessage)) ;setLoading(false);})
                .catch((error) => {console.log(error); setLoading(false);});
        }
        else{
            console.log("sending user message");
            console.log(newMessage);
            newMessage = { content : message, senderId: externalId, receiverId: selectedDiscussionId , date : new Date().toLocaleString()};
            sendMessage(newMessage, "0", token)
                .then((response) => {console.log(response); setMessage(""); dispatch(saveMessage(newMessage)) ;setLoading(false);})
                .catch((error) => {console.log(error); setLoading(false);});
        }

    }

    const sendImage = () => {
        setSavingMedia(true);
        if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
        }
        const file = inputFileRef.current.files[0];
        sendMessageWithMedia(file, token)
            .then((response) => {
                console.log(response) ;
                let mediaMessage = {} as Message;
                if (showRoomMessage){
                    mediaMessage = { content : message, senderId: externalId, receiverId: selectedRoomId.toString(), date : new Date().toLocaleString(), media: response as string };
                    sendMessage(mediaMessage, selectedRoomId.toString(), token)
                        .then((response) => {console.log(response); setMessage(""); dispatch(saveMessage(mediaMessage)) ;setSavingMedia(false)})
                        .catch((error) => {console.log(error); setSavingMedia(false)});
                }
                else{
                    mediaMessage = { content : message, senderId: externalId, receiverId: selectedDiscussionId , date : new Date().toLocaleString(), media: response as string };
                    sendMessage(mediaMessage, "0", token)
                        .then((response) => {console.log(response); setMessage(""); dispatch(saveMessage(mediaMessage)) ;setSavingMedia(false);})
                        .catch((error) => {console.log(error);setSavingMedia(false)});
                }

            })
            .catch((error) => {console.log(error); setSavingMedia(false);});

    }

    const imageSelection = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click(); // Programmatically click the file input
        }
    }

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Message
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Your message is empty.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} colorScheme="blue">
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <div className="messages">
                <div className="conversation" ref={conversationRef}>
                    <MessageBullet/>
                </div>
                <div className="message">
                    <textarea id="message" name="message" placeholder="Message" onChange={handleMessageWriting}
                              value={message}>
                    </textarea>
                    <input
                        name="file"
                        ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}} // Hide the input element
                        onChange={sendImage}
                        required
                    />
                    <Button marginLeft="20px" onClick={imageSelection}>{savingMedia ? 'Sending...' :
                        <FontAwesomeIcon icon={faFileImage}/>}</Button>
                    <Button marginLeft="10px" onClick={send}>{loading ? 'Sending...' :
                        <FontAwesomeIcon icon={faPaperPlane}/>}</Button>
                </div>
            </div>
        </>
    );
}