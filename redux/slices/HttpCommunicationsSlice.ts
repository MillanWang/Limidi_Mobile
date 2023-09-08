import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HttpCommunicationsState {
    httpCommunicationInfo: {
        ip: string;
        port: string;
        midiDeviceID: string;
    };
    mostRecentNetworkFailTime: number;
    mostRecentNetworkFixTime: number;
}

const initialState: HttpCommunicationsState = {
    httpCommunicationInfo: {
        ip: "192.168.0.14", // Apartment Wifi

        port: "4848",
        midiDeviceID: "2",
    },
    mostRecentNetworkFailTime: 0,
    mostRecentNetworkFixTime: 0,
};

export const HttpCommunicationsSlice = createSlice({
    name: "HttpCommunications",
    initialState,
    reducers: {
        setIP: (state, action) => {
            state.httpCommunicationInfo.ip = action.payload.ip;
        },
        setPort: (state, action) => {
            state.httpCommunicationInfo.port = action.payload.port;
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

export const { setIP, setPort, setMostRecentNetworkFailTime, setMostRecentNetworkFixTime } = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;
