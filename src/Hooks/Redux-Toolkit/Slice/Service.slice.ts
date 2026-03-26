import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bucket, databases, ID } from "../../../lib/AppwriteConfig";
import { toast } from "sonner";
import type { Servidestate } from "../../../Typescript/interface/Servideinterface";

const initialState: Servidestate = {
  items: [],
  loading: false,
  error: null,
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = "services";

//  FETCH
export const fetchServices = createAsyncThunk(
  "service/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
      );

      return response.documents;
    } catch (error: any) {
      return rejectWithValue(error.message || "Faild to fetch");
    }
  },
);

//  ADD
export const addService = createAsyncThunk(
  "service/add",
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
          category: formData.category,
          duration: formData.duration,
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

export const deleteService = createAsyncThunk(
  "service/delete",
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

export const updateService = createAsyncThunk(
  "service/update",
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
          category: formData.category,
          duration: formData.duration,
          description: formData.description,
          price: formData.price,
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

const Serviceslice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload as any);
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload as any;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.items = state.items.filter((i: any) => i.$id !== action.payload);
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      // UPDATE
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (item: any) => item.$id === action.payload.$id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default Serviceslice.reducer;
