import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserApiResponse, ApiInfo } from "@interfaces/index";

interface UserState {
  users: User[];
  usersById: Record<string, User>; // Index users by UUID for quick lookup
  apiInfo: ApiInfo | null;
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  usersById: {},
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
      // Index users by UUID for quick lookup
      action.payload.results.forEach((user) => {
        state.usersById[user.login.uuid] = user;
      });
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    addUsers: (state, action: PayloadAction<UserApiResponse>) => {
      state.users = [...state.users, ...action.payload.results];
      // Index users by UUID for quick lookup
      action.payload.results.forEach((user) => {
        state.usersById[user.login.uuid] = user;
      });
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    appendUsers: (state, action: PayloadAction<UserApiResponse>) => {
      state.users = [...state.users, ...action.payload.results];
      // Index users by UUID for quick lookup
      action.payload.results.forEach((user) => {
        state.usersById[user.login.uuid] = user;
      });
      state.apiInfo = action.payload.info;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      // Add or update a single user in both arrays and index
      const existingIndex = state.users.findIndex(
        (u) => u.login.uuid === action.payload.login.uuid
      );
      if (existingIndex !== -1) {
        state.users[existingIndex] = action.payload;
      } else {
        state.users.push(action.payload);
      }
      state.usersById[action.payload.login.uuid] = action.payload;
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
      state.usersById = {};
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
  setUser,
  setSelectedUser,
  updateUser,
  deleteUser,
  clearUsers,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
