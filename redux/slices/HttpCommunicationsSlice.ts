import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HttpCommunicationsState {
    httpCommunicationInfo: { baseAddress: string };
    mostRecentNetworkFailTime: number;
    mostRecentNetworkFixTime: number;
}

const initialState: HttpCommunicationsState = {
    httpCommunicationInfo: {
        baseAddress: "192.168.0.12", // Apartment Wifi
    },
    mostRecentNetworkFailTime: 0,
    mostRecentNetworkFixTime: 0,
};

export const HttpCommunicationsSlice = createSlice({
    name: "HttpCommunications",
    initialState,
    reducers: {
        setBaseAddress: (state, action) => {
            state.httpCommunicationInfo.baseAddress = action.payload.ip;
        },
        setMostRecentNetworkFailTime: (state, action) => {
            console.log(action.payload.mostRecentNetworkFailTime);
            state.mostRecentNetworkFailTime = action.payload.mostRecentNetworkFailTime;
        },
        setMostRecentNetworkFixTime: (state, action) => {
            state.mostRecentNetworkFixTime = action.payload.mostRecentNetworkFixTime;
        },
    },
});

export const { setBaseAddress, setMostRecentNetworkFailTime, setMostRecentNetworkFixTime } = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;
