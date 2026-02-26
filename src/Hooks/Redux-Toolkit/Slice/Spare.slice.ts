import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bucket, databases, ID } from "../../../lib/AppwriteConfig";
import { toast } from "sonner";
import type { Sparestate } from "../../../Typescript/interface/SpareInterface";

const initialState: Sparestate = {
  items: [],
  loading: false,
  error: null,
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "spares";

//  FETCH
export const fetchSpare = createAsyncThunk(
  "spare/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );

      return response.documents as unknown;
    } catch (error: any) {
      return rejectWithValue(error.message || "Faild to fetch");
    }
  },
);

//  ADD
export const addSpare = createAsyncThunk(
  "spare/add",
  async (formData: any, { rejectWithValue }) => {
    try {
      let imageUrl = "";

      // Upload image
      if (formData.image) {
        const file = await bucket.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET as string,
          ID.unique(),
          formData.image,
        );

        imageUrl = bucket.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET as string,
          file.$id,
        );
      }

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          name: formData.name,
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          image: imageUrl,
        },
      );

      toast.success("Product added successfully!");
      console.log("after add response ", response);
      return response;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message || "Failed to add");
    }
  },
);

export const deleteSpare = createAsyncThunk(
  "spare/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      toast.success("Deleted successfully");
      return id;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateSpare = createAsyncThunk(
  "spare/update",
  async (
    { id, formData }: { id: string; formData: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        {
          name: formData.name,
          brand: formData.brand,
          description: formData.description,
          price: formData.price,
          // image not changing
        },
      );

      toast.success("Product updated successfully!");
      return response;
    } catch (error: any) {
      toast.error(error.message);
      return rejectWithValue(error.message || "Failed to update");
    }
  },
);

const Spareslice = createSlice({
  name: "spare",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSpare.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSpare.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addSpare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSpare.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpare.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any;
      })
      .addCase(fetchSpare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSpare.fulfilled, (state, action) => {
        state.items = state.items.filter((i: any) => i.$id !== action.payload);
      })
      // UPDATE
      .addCase(updateSpare.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSpare.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (item: any) => item.$id === action.payload.$id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateSpare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default Spareslice.reducer;
