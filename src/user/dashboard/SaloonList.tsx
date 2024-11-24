import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from '../../app/store';
import {RootState} from "../../app/store";
import './UserList.css';
import React, {useEffect, useState} from "react";
import {
    getMessagesAsync,
    getRoomsAsync,
    selectRoom
} from "../../app/userSlice";
import { useParams} from "react-router-dom";


export const SaloonList = () => {
    const { room_id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { rooms, token, externalId, selectedRoomId } = useSelector((state:RootState) => state.user);
    const [selectedRoom, setSelectedRoom] = useState(0);


    const handleSelectedRoom = (selectedId : number) => {
        setSelectedRoom(selectedId)
        dispatch(selectRoom(selectedId));
        dispatch(getMessagesAsync({senderId: externalId, receiverId : selectedId.toString() , token : token, selectedRoom : selectedRoomId.toString() }));
        //navigate(`/messages/rooms/${selectedId}`);
    }

    useEffect(() => {
        if (rooms.length === 0) dispatch(getRoomsAsync(token as string));
        if (room_id){
            handleSelectedRoom(parseInt(room_id));
        }
    }, [])

    return (
        <div className="userlist">
            {rooms.map((item) => (
                    <div
                        key={item.room_id}
                        className={ selectedRoom === item.room_id ? 'active' : ''}
                        onClick={() => handleSelectedRoom(item.room_id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleSelectedRoom(item.room_id);
                            }
                        }}
                        tabIndex={0} // Makes the div focusable
                        role="button" // Indicates that the element is interactive
                        aria-pressed={selectedRoom === item.room_id} // Accessibility for the active state
                    >
                        <span>{item.name}</span>
                        <span>{item.created_on}</span>
                    </div>
                ))}
        </div>
    );
}