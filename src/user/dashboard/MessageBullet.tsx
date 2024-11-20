import './MessageBullet.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../../app/store";
import {getMessagesAsync} from "../../app/userSlice";
import {Message} from "../../model/common";

export const MessageBullet = () => {
        const { externalId, selectedDiscussionId, token, messages } = useSelector((state: RootState) => state.user);
        const dispatch = useDispatch<AppDispatch>();
        useEffect(() => {
                dispatch(getMessagesAsync({senderId: externalId, receiverId : selectedDiscussionId, token : token}));
        },[selectedDiscussionId]);
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