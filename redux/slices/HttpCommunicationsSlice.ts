import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { HttpCommunicationInfo } from '../../services/MIDI_HTTP_Service';

// TODO
interface HttpCommunicationsState {
    httpCommunicationInfo: HttpCommunicationInfo,
    //Evnetually, might want a feature to have each GE choose a midi device.
    //That would be useful for setting up one just for DAW controls and one for instruments
    //It would be a list of states for each grid elem similar to midi and color slice
    //Desktop app changes would be needed for this. 
}

const initialState: HttpCommunicationsState = {
    httpCommunicationInfo: {
        ip: "192.168.0.13",
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
            console.log("x")
        },
        setMidiOutputDeviceID: (state, action) => { }, // TODO: Awaiting desktop update for this functionality
    }
});

export const {
    setIP,
    setPort,
    setMidiOutputDeviceID,

} = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;