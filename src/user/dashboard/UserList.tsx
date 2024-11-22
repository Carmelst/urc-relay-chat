import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from '../../app/store';
import {RootState} from "../../app/store";
import './UserList.css';
import {useEffect, useState} from "react";
import {getMessagesAsync, getUsersAsync, saveMessage, selectDiscussion} from "../../app/userSlice";
import {Message} from "../../model/common";
import {useNavigate, useParams} from "react-router-dom";


export const UserList = () => {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { users, token, externalId } = useSelector((state:RootState) => state.user);
    const [selectedUser, setSelectedUser] = useState('');


    const handleSelectedUser = (selectedId : string) => {
        setSelectedUser(selectedId)
        dispatch(selectDiscussion(selectedId));
        dispatch(getMessagesAsync({senderId: externalId, receiverId : selectedId, token : token}));
        navigate(`/messages/user/${selectedId}`);
    }

    useEffect(() => {
        dispatch(getUsersAsync(token as string));
        if (user_id){
            handleSelectedUser(user_id);
        }
    }, [])

    const sw = navigator.serviceWorker;
    if (sw != null) {
        sw.onmessage = (event) => {
            const {message} : {message : Message}= event.data;
            if (selectedUser === message.senderId) {
                dispatch(saveMessage(message));
            }
            else {
                setSelectedUser(message.senderId);
                dispatch(selectDiscussion(message.senderId));
                dispatch(getMessagesAsync({senderId : message.senderId, receiverId : message.receiverId , token}))
            }

        }
    }
    return (
        <div className="userlist">
            {users.filter((user) => user.external_id !== externalId)
                .map((item) => (
                <div
                    key={item.external_id}
                    className={ selectedUser === item.external_id ? 'active' : ''}
                    onClick={() => handleSelectedUser(item.external_id as string)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleSelectedUser(item.external_id as string);
                        }
                    }}
                    tabIndex={0} // Makes the div focusable
                    role="button" // Indicates that the element is interactive
                    aria-pressed={selectedUser === item.external_id} // Accessibility for the active state
                >
                    <span>{item.username}</span>
                    <span>{item.last_login}</span>
                </div>
            ))}
        </div>
    );
}