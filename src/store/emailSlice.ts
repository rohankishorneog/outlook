import { Email, EmailBody } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface EmailState {
  emails: Email[];
  total: number;
  emailBody: EmailBody | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  emails: [],
  total: 0,
  emailBody: null,
  loading: false,
  error: null,
};

// Fetching email list
export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (page: number) => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?page=${page}`
    );
    return response.json();
  }
);

// Fetching email body
export const fetchEmailBody = createAsyncThunk(
  "emails/fetchEmailBody",
  async (id: string) => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${id}`
    );
    return response.json();
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload.list;
        state.total = action.payload.total;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch emails";
      })
      .addCase(fetchEmailBody.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.loading = false;
        state.emailBody = action.payload;
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch email body";
      });
  },
});

export const emailReducer = emailSlice.reducer;
