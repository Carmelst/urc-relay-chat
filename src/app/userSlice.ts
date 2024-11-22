import {createAsyncThunk, createSlice} from '@reduxjs/toolkit/react';
import {getMessages, getUsers} from "./services";
import {Message, UserUI} from "../model/common";
import {CustomError} from "../model/CustomError";


export const getUsersAsync = createAsyncThunk(
    'user/getUsers',
    async (token: string) => {
        try {
            return await getUsers(token);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const getMessagesAsync = createAsyncThunk(
    'user/getMessages',
    async ({senderId, receiverId, token} : {senderId : string, receiverId : string, token : string}) => {
        try {
            console.log('appel api messages');
            return await getMessages(senderId, receiverId, token);
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
        token : sessionStorage.getItem('token') || '',
        username : sessionStorage.getItem('username') || '',
        externalId : sessionStorage.getItem( 'externalId') || '',
        selectedDiscussionId : '',
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
    }
})


export const { connect, disconnect, selectDiscussion, saveMessage } = userSlice.actions;
export default  userSlice.reducer;