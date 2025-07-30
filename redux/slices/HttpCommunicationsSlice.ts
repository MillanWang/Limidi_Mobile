import { createSlice } from "@reduxjs/toolkit";

interface HttpCommunicationsState {
  httpCommunicationInfo: { baseAddress: string };
}

const initialState: HttpCommunicationsState = {
  httpCommunicationInfo: {
    baseAddress: "192.168.0.141:4849", // Apartment Wifi
  },
};

export const HttpCommunicationsSlice = createSlice({
  name: "HttpCommunications",
  initialState,
  reducers: {
    setBaseAddress: (state, action) => {
      state.httpCommunicationInfo.baseAddress = action.payload.baseAddress;
    },
  },
});

export const { setBaseAddress } = HttpCommunicationsSlice.actions;

export default HttpCommunicationsSlice.reducer;
