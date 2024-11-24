import {createAsyncThunk, createSlice} from '@reduxjs/toolkit/react';
import {getMessages, getRooms, getUsers} from "./services";
import {Message, Room, UserUI} from "../model/common";
import {CustomError} from "../model/CustomError";


export const getUsersAsync = createAsyncThunk(
    'user/getUsers',
    async (token: string) => {
        try {
            console.log('appel api users');
            return await getUsers(token);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const getRoomsAsync = createAsyncThunk(
    'user/getRooms',
    async (token :string) => {
        try {
            console.log('appel api rooms');
            return await getRooms(token);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const getMessagesAsync = createAsyncThunk(
    'user/getMessages',
    async ({senderId, receiverId, token, selectedRoom} : {senderId : string, receiverId : string, token : string , selectedRoom : string}) => {
        try {
            console.log('appel api messages');
            return await getMessages(senderId, receiverId, token, selectedRoom);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
);

const userSlice = createSlice({
    name : 'user',
    initialState : {
        users : [] as UserUI[],
        rooms : [] as Room[],
        token : sessionStorage.getItem('token') || '',
        username : sessionStorage.getItem('username') || '',
        externalId : sessionStorage.getItem( 'externalId') || '',
        selectedDiscussionId : '',
        selectedRoomId : 0,
        showRoomMessage : false,
        messages : [] as Message[],
        error : {} as CustomError
    },
    reducers : {
        connect : (state, action) => {
               const { token, username, externalId } = action.payload;
               state.token = token;
               state.username = username;
               state.externalId = externalId;
        },
        disconnect: (state) => {
            state.users = [] as UserUI[];
            state.messages = [] as Message[];
            state.rooms = [] as Room[];
            state.token = "" ;
            state.username = "" ;
            state.externalId = "" ;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('externalId');
        },
        selectDiscussion: (state, action) => {
            state.selectedDiscussionId = action.payload;
        },
        saveMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        selectRoom: (state, action) => {
            state.selectedRoomId = action.payload;

        },
        showRoomMessage: (state, action) => {
            state.showRoomMessage = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users = [...action.payload];
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload as CustomError;
            })
            .addCase(getMessagesAsync.fulfilled, (state, action) => {
                state.messages  = [...action.payload];
            })
            .addCase(getMessagesAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload as CustomError;
            })
            .addCase(getRoomsAsync.fulfilled, (state, action) => {
                state.rooms =  [...action.payload];
            })
            .addCase(getRoomsAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload as CustomError;
            })
    }
})


export const { connect, disconnect, selectDiscussion, selectRoom, saveMessage, showRoomMessage } = userSlice.actions;
export default  userSlice.reducer;