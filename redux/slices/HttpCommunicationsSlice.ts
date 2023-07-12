import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


interface HttpCommunicationsState {
    httpCommunicationInfo:
    {
        ip: string,
        port: string,
        midiDeviceID: string,
    },
}

const initialState: HttpCommunicationsState = {
    httpCommunicationInfo: {
        ip: "192.168.0.14", // Apartment Wifi

        port: "4848",
        midiDeviceID: '2',
    },
}

export const HttpCommunicationsSlice = createSlice({
    name: 'HttpCommunications',
    initialState,
    reducers: {
        setIP: (state, action) => {
            state.httpCommunicationInfo.ip = action.payload.ip;
        },
        setPort: (state, action) => {
            state.httpCommunicationInfo.port = action.payload.port;
        },
    }
});

export const {
    setIP,
    setPort,

} = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;