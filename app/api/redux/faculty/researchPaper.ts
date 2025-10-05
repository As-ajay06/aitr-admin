// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface ResearchPaper {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  reseachPaperData : ResearchPaper[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  reseachPaperData : [],
  loading: false,
  error: null,
};

// ✅ API call
// todo : change the names also
export const fetchEventGrants = createAsyncThunk("eventGrant/fetch", async () => {
  const response = await axios.get("http://localhost:3000/api/v1/department/event-grants-received");
  console.log(response.data)
  // todo : make changes in the line below
  return response.data.eventGrants; // should be an array
});

const reseachPaper = createSlice({
  name: "reseachPaper",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<ResearchPaper[]>) => {
      state.loading = false;
      state.reseachPaperData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

// todo: make changed here also
export default reseachPaper.reducer;
