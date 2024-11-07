import { Email, EmailBody } from "@/types/types";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface EmailState {
  emails: Email[];
  total: number;
  emailBody: EmailBody | null;
  loading: boolean;
  error: string | null;
  bodyLoading: boolean;
  bodyLoadingError: string | null;
  activeFilter: "all" | "unread" | "read" | "favourites";
}

const initialState: EmailState = {
  emails: [],
  total: 0,
  emailBody: null,
  loading: false,
  error: null,
  bodyLoading: false,
  bodyLoadingError: null,
  activeFilter: "all",
};

// Fetching email list
export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (page: number) => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?page=${page}`
    );
    const data = await response.json();

    // Adding default `read` and `favourite` properties while maintaining type safety
    const emails: Email[] = data.list.map((item: Email) => ({
      id: item.id,
      from: {
        name: item.from.name,
        email: item.from.email,
      },
      date: item.date,
      subject: item.subject,
      short_description: item.short_description,
      read: false,
      favourite: false,
    }));

    return { emails, total: data.total };
  }
);

// Fetching email body
export const fetchEmailBody = createAsyncThunk(
  "emails/fetchEmailBody",
  async (id: string, { dispatch }) => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${id}`
    );
    const data = await response.json();
    dispatch(markAsRead(id));
    return data;
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    togglefavourite: (state, action) => {
      const emailId = action.payload;
      const email = state.emails.find((e) => e.id === emailId);
      if (email) {
        email.favourite = !email.favourite;
      }
    },
    markAsRead: (state, action) => {
      const emailId = action.payload;
      const email = state.emails.find((e) => e.id === emailId);
      if (email && !email.read) {
        email.read = true;
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload.emails;
        state.total = action.payload.total;

        // Preserve read and favourite states when updating email list
        const existingEmails = new Map(
          state.emails.map((email) => [email.id, email])
        );
        state.emails = action.payload.emails.map((email) => ({
          ...email,
          read: existingEmails.get(email.id)?.read || false,
          favourite: existingEmails.get(email.id)?.favourite || false,
        }));
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch emails";
      })
      .addCase(fetchEmailBody.pending, (state) => {
        state.bodyLoading = true;
        state.bodyLoadingError = null;
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.bodyLoading = false;
        state.emailBody = action.payload;
      })
      .addCase(fetchEmailBody.rejected, (state, action) => {
        state.bodyLoading = false;
        state.bodyLoadingError =
          action.error.message || "Failed to fetch email body";
      });
  },
});

// Memoized selectors for better performance
export const selectEmails = (state: RootState) => state.emails.emails;
export const selectActiveFilter = (state: RootState) =>
  state.emails.activeFilter;

export const selectFilteredEmails = createSelector(
  [selectEmails, selectActiveFilter],
  (emails, activeFilter) => {
    switch (activeFilter) {
      case "unread":
        return emails.filter((email) => !email.read);
      case "read":
        return emails.filter((email) => email.read);
      case "favourites":
        return emails.filter((email) => email.favourite);
      default:
        return emails;
    }
  }
);

export const { togglefavourite, markAsRead, setActiveFilter } =
  emailSlice.actions;
export const emailReducer = emailSlice.reducer;
