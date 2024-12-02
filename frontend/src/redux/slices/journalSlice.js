import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/journal";

export const addJournal = createAsyncThunk(
  "journal/addJournal",
  async (journalData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.post(`${API_URL}/add`, journalData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateJournalContent = createAsyncThunk(
  "journal/updateJournalContent",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.put(`${API_URL}/update/content/${id}`, {
        content,
      }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateJournal = createAsyncThunk(
  "journal/updateJournalImages",
  async ({ id, content ,images }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.put(`${API_URL}/update/${id}`, { content, images }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllJournals = createAsyncThunk(
  "journal/getAllJournals",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.get(`${API_URL}/alljournal`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOneJournal = createAsyncThunk(
  "journal/getOneJournal",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.get(`${API_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteJournal = createAsyncThunk(
  "journal/deleteJournal",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const response = await axios.delete(`${API_URL}/delete/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    entries: null,
    entry: null,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add journal
    builder
      .addCase(addJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Journal added successfully";
      })
      .addCase(addJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Update journal content
    builder
      .addCase(updateJournalContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJournalContent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Journal content updated successfully";
      })
      .addCase(updateJournalContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Update journal images
    builder
      .addCase(updateJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Journal images updated successfully";
      })
      .addCase(updateJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Get all journals
    builder
      .addCase(getAllJournals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload.journals;
      })
      .addCase(getAllJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Get one journal
    builder
      .addCase(getOneJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.entry = action.payload.journal;
      })
      .addCase(getOneJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    // Delete journal
    builder
      .addCase(deleteJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = state.entries.filter(
          (entry) => entry._id !== action.payload.journal._id
        );
        state.message = "Journal deleted successfully";
      })
      .addCase(deleteJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessage } = journalSlice.actions;

export default journalSlice.reducer;
