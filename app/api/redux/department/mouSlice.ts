// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface Mou {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface EventGrantState {
  mouData : Mou[];
  loading: boolean;
  error: string | null;
}

const initialState: EventGrantState = {
  mouData : [],
  loading: false,
  error: null,
};

// ✅ API call
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/mou");
  console.log(response.data)
  return response.data.mous; // should be an array
});

const mouSlice = createSlice({
  name: "mou",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<Mou[]>) => {
      state.loading = false;
      state.mouData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default mouSlice.reducer;
