// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface Hackathon {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  hackathonData : Hackathon[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  hackathonData : [],
  loading: false,
  error: null,
};

// ✅ API call
// todo: make changes here.
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/event-grants-received");
  console.log(response.data)
  return response.data.eventGrants; // should be an array
});

const hackathon = createSlice({
  name: "hackathon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<Hackathon[]>) => {
      state.loading = false;
      state.hackathonData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default hackathon.reducer;
