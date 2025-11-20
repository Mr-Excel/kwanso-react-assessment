import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserApiResponse, ApiInfo } from "@interface/index";

interface UserState {
  users: User[];
  apiInfo: ApiInfo | null;
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  apiInfo: null,
  loading: false,
  error: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserApiResponse>) => {
      state.users = action.payload.results;
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    addUsers: (state, action: PayloadAction<UserApiResponse>) => {
      state.users = [...state.users, ...action.payload.results];
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    appendUsers: (state, action: PayloadAction<UserApiResponse>) => {
      state.users = [...state.users, ...action.payload.results];
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.login.uuid === action.payload.login.uuid
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
      if (
        state.selectedUser &&
        state.selectedUser.login.uuid === action.payload.login.uuid
      ) {
        state.selectedUser = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.login.uuid !== action.payload
      );
      if (
        state.selectedUser &&
        state.selectedUser.login.uuid === action.payload
      ) {
        state.selectedUser = null;
      }
    },
    clearUsers: (state) => {
      state.users = [];
      state.apiInfo = null;
      state.selectedUser = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setUsers,
  addUsers,
  appendUsers,
  setSelectedUser,
  updateUser,
  deleteUser,
  clearUsers,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
