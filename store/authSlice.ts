// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  isAnonymous?: boolean;
};

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

const initialState: AuthState = { user: null, status: "idle", error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.status = action.payload ? "succeeded" : "idle";
      state.error = null;
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action: PayloadAction<string | null>) {
      state.status = "failed";
      state.error = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;
export type { User };
