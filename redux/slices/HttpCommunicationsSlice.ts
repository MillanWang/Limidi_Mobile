import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { MIDI_HTTP_Service } from '../../services/MIDI_HTTP_Service';

// TODO
interface HttpCommunicationsState {
    midiHttpService: MIDI_HTTP_Service,
    //Evnetually, might want a feature to have each GE choose a midi device.
    //That would be useful for setting up one just for DAW controls and one for instruments
    //It would be a list of states for each grid elem similar to midi and color slice
    //Desktop app changes would be needed for this. 
}

const initialState: HttpCommunicationsState = {
    midiHttpService: new MIDI_HTTP_Service("192.168.0.12", "4848"),
}

export const HttpCommunicationsSlice = createSlice({
    name: 'HttpCommunications',
    initialState,
    reducers: {
        setIP: (state, action) => { },
        setPort: (state, action) => { },
        setMidiOutputDeviceID: (state, action) => { },
    }
});

export const { } = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;