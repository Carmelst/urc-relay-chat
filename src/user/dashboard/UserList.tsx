import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from '../../app/store';
import {RootState} from "../../app/store";
import './UserList.css';
import {useEffect, useState} from "react";
import {getMessagesAsync, getUsersAsync, selectDiscussion} from "../../app/userSlice";


export const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, token, externalId } = useSelector((state:RootState) => state.user);
    const [selectedUser, setSelectedUser] = useState('');

    const handleSelectedUser = (selectedId : string) => {
        setSelectedUser(selectedId)
        dispatch(selectDiscussion(selectedId));
        dispatch(getMessagesAsync({senderId: externalId, receiverId : selectedId, token : token}));
    }

    useEffect(() => {
        dispatch(getUsersAsync(token as string));
    }, [])


    const sw = navigator.serviceWorker;
    if (sw != null) {
        sw.onmessage = (event) => {
            const {sender, receiver} : {sender : string, receiver : string}= event.data;
            dispatch(selectDiscussion(sender));
            dispatch(getMessagesAsync({senderId : sender, receiverId : receiver , token}))
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
                            handleSelectedUser(externalId);
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