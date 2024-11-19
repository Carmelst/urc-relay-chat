import {createAsyncThunk, createSlice} from '@reduxjs/toolkit/react';
import {getUsers} from "./services";
import {UserUI} from "../model/common";

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

const userSlice = createSlice({
    name : 'user',
    initialState : {
        users : [] as UserUI[],
        token : sessionStorage.getItem('token') || '',
        username : sessionStorage.getItem('username') || '',
        externalId : sessionStorage.getItem( 'externalId') || '',
    },
    reducers : {
        connect : (state, action) => {
               const { token, username, externalId } = action.payload;
               state.token = token;
               state.username = username;
               state.externalId = externalId;
        }
        ,
        disconnect: (state) => {
            state.users = [] as UserUI[];
            state.token = "" ;
            state.username = "" ;
            state.externalId = "" ;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('externalId');
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.users = [...action.payload];
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                console.log(action.payload);
            })
    }


})

export const { connect, disconnect } = userSlice.actions;
export default  userSlice.reducer;