import {createAsyncThunk, createSlice} from '@reduxjs/toolkit/react';
import {getUsers} from "./services";
import {UserUI} from "../model/common";

export const getUsersAsync = createAsyncThunk(
    'user/getUsers',
    async (token: string) => {
        try {
            const users = await getUsers(token);
            return users ;
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
        token : '',
        username : '',
        externalId : '',
    },
    reducers : {
        connect : (state) => {
                state.token = sessionStorage.getItem('token') as string;
                state.username = sessionStorage.getItem('username') as string;
                state.externalId = sessionStorage.getItem('externalId') as string;
        }
        ,
        disconnect: (state) => {
            state.users = [] as UserUI[];
            state.token = '' ;
            state.username = '' ;
            state.externalId = '';
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