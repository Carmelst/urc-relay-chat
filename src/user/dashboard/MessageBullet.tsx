import './MessageBullet.css'
import { useSelector} from "react-redux";
import { RootState} from "../../app/store";
import {Message} from "../../model/common";
import {Spinner} from "@chakra-ui/react";

export const MessageBullet = () => {
        const { externalId, messages} = useSelector((state: RootState) => state.user);

        if (!messages) {
                return <Spinner />;
        }
        return (
        <div className="discussion">
                {
                        messages.map((message: Message, index) => (
                            <div className={`message-bullet ${ message.senderId === externalId ? 'sent' : 'received'}`} key={index}>
                                    <span>{message.content}</span>
                                    <span>{message.date}</span>
                            </div>
                        ))
                }
        </div>
    );
}