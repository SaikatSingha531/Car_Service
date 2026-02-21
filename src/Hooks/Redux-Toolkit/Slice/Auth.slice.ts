import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../Typescript/interface/Auth.interface";
import { toast } from "sonner";
import type { SignupData } from "../../../Typescript/interface/Signup.interface";
import { account, tablesDB } from "../../../lib/AppwriteConfig";
import { ID, Query } from "appwrite";
import Cookies from "js-cookie";

const role = Cookies.get("role") ?? null;
const token = Cookies.get("token") ?? null;
const userDetails = Cookies.get("userDetails");
const user = userDetails ? JSON.parse(userDetails) : null;

const initialState: AuthState = {
  loading: false,
  error: null,
  token: Boolean(token),
  role: role,
  user: user,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data: SignupData, thunkAPI) => {
    try {
      const signupAccount = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.fullName,
      );

      await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "signup",
        rowId: ID.unique(),
        data: {
          name: data.fullName,
          email: data.email,
          password: data.password,
          role: "user",
        },
      });

      toast.success("Account created successfully");
      return signupAccount;
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk<
  any,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userList = await tablesDB.listRows(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "signup",
        [Query.equal("email", data.email)],
      );

      // if (userList.rows.length === 0) {
      //   throw new Error("User not found");
      // }

      // try {
      //   await account.deleteSessions();
      // } catch (e) {}
      if (userList.total > 0) {
        const resp = await account.createEmailPasswordSession(
          data.email,
          data.password,
        );

        const user = userList?.rows?.[0];
        console.log("user coming in login slice", user);
        console.log("this is after login data", resp);

        return {
          message: "Login successfully",
          user: user,
          data: resp,
          status: true,
        };

        // return userList.rows[0];
      } else {
        toast.error("user not exists");
         return rejectWithValue("User not exists");
      }
    } catch (error: any) {
      console.log("login time error ", error);
      // const errMsg = error instanceof Error ? error.message : "Login failed";

      // toast.error(errMsg);
      return rejectWithValue(error?.message || "invalid email password");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = false;
      Cookies.remove("role");
      Cookies.remove("token");
      Cookies.remove("userDetails");
      account.deleteSession("current");
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        console.log("user coming in login fullfill", action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
        // console.log("user coming in login fullfill", action.payload);
        state.user = action.payload?.user;
        state.token = true;
        state.role = action.payload?.user.role;
        Cookies.set("token", "true", { expires: 1 });
        Cookies.set("role", action.payload?.user.role, { expires: 1 });
        Cookies.set("userDetails", JSON.stringify(action.payload?.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
