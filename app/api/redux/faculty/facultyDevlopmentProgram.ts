// src/redux/eventGrantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// this is the type of data to be recieved
// todo: make changes here in future
interface FacultyDevlopmentProgram {
  id: string;
  title: string;
  department: string;
  amount: number;
}

interface State {
  facultyDevlopmentProgramData : FacultyDevlopmentProgram[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  facultyDevlopmentProgramData : [],
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

const facultyDevlopmentProgram = createSlice({
  name: "facultyDevlopmentProgram",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventGrants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEventGrants.fulfilled, (state, action: PayloadAction<FacultyDevlopmentProgram[]>) => {
      state.loading = false;
      state.facultyDevlopmentProgramData = action.payload;
    });
    builder.addCase(fetchEventGrants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch";
    });
  },
});

export default facultyDevlopmentProgram.reducer;
