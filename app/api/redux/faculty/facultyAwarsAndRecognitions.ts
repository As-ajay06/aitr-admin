// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface FacultyAwardRecogntion {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  facultyAwardRecogntionData : FacultyAwardRecogntion[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  facultyAwardRecogntionData : [],
  loading: false,
  error: null,
};

// ✅ API call
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/event-grants-received");
  console.log(response.data)
  return response.data.eventGrants; // should be an array
});

const faculyAwardsAndRecognition = createSlice({
  name: "faculyAwardsAndRecognition",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<FacultyAwardRecogntion[]>) => {
      state.loading = false;
      state.facultyAwardRecogntionData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default faculyAwardsAndRecognition.reducer;
