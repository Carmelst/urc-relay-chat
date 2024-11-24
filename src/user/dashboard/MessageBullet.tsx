import './MessageBullet.css'
import { useSelector} from "react-redux";
import { RootState} from "../../app/store";
import {Message} from "../../model/common";

export const MessageBullet = () => {
        const { externalId, messages} = useSelector((state: RootState) => state.user);

        return (
            <div className="discussion">
                    {
                        messages.length === 0 ?
                            <div className="loading-message">
                                <p>Aucun message échangé pour le moment</p>
                            </div>
                            :
                            messages.map((message: Message, index) => (
                                <div
                                    className={`message-bullet ${message.senderId === externalId ? 'sent' : 'received'}`}
                                    key={index}>
                                    {
                                        message.media !== '' && message.media !== undefined && message.media !== null ?
                                            (<img src={message.media} alt="Media failed to load...Sorry" className="message-image" />)
                                            :
                                            (<span>{message.content}</span>)
                                    }
                                    <span>{message.date}</span>
                                </div>
                            ))
                    }
            </div>
        );
}
