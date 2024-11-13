import {createSlice} from '@reduxjs/toolkit/react';


const userSlice = createSlice({
    name : 'user',
    initialState : {
        user : null,
        userToken : '',
        users : [] ,

    },
    reducers : {

    },

})


export default  userSlice.reducer;