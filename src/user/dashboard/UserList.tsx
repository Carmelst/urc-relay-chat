import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from '../../app/store';
import {RootState} from "../../app/store";
import './UserList.css';
import {useEffect, useState} from "react";
import {getUsersAsync, selectDiscussion} from "../../app/userSlice";


export const UserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, token, externalId } = useSelector((state:RootState) => state.user);
    const [selectedUser, setSelectedUser] = useState(0);
    const handleSelectedUser = (index : number, selectedId : string) => {
        setSelectedUser(index)
        dispatch(selectDiscussion(selectedId));
    }
    useEffect(() => {
        dispatch(getUsersAsync(token as string));
    }, [])
    
    return (
        <div className="userlist">
            {users.filter((user) => user.external_id !== externalId)
                .map((item, index) => (
                <div
                    key={index}
                    className={ selectedUser === index ? 'active' : ''}
                    onClick={() => handleSelectedUser(index, item.external_id as string)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleSelectedUser(index, externalId);
                        }
                    }}
                    tabIndex={0} // Makes the div focusable
                    role="button" // Indicates that the element is interactive
                    aria-pressed={selectedUser === index} // Accessibility for the active state
                >
                    <span>{item.username}</span>
                    <span>{item.last_login}</span>
                </div>
            ))}
        </div>
    );
}