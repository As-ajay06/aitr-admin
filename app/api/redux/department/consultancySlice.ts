// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface Consultancy {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  consultancyData: Consultancy[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  consultancyData : [],
  loading: false,
  error: null,
};

// ✅ API call
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/mous");
  console.log(response.data)
  return response.data.mous; // should be an array
});

const consultancySlice = createSlice({
  name: "consultancy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<Consultancy[]>) => {
      state.loading = false;
      state.consultancyData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default consultancySlice.reducer;
