// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface InvitedTalks {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  invitedTalksData : InvitedTalks[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  invitedTalksData : [],
  loading: false,
  error: null,
};

// ✅ API call
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/event-grants-received");
  console.log(response.data)
  // todo : make changes in the line below
  return response.data.eventGrants; // should be an array
});

const invitedTalks = createSlice({
  name: "invitedTalks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<InvitedTalks[]>) => {
      state.loading = false;
      state.invitedTalksData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default invitedTalks.reducer;
