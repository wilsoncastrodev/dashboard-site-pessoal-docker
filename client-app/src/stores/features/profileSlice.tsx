import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileStateType } from "../../types/profileType";
import { axiosErrorHandler } from "../../utils/errors";
import ProfileService from "../../services/profileService";

export const getProfileById = createAsyncThunk("profile/getProfileById", async (id: string, { rejectWithValue }) => {
        try {
            const response = await ProfileService.getProfileById(id);
            return response.data;
        } catch (err) {
            const error = axiosErrorHandler(err);
            return rejectWithValue(error);
        }
    }
);

const initialState: ProfileStateType = {
    profile: null,
    errors: null,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProfileById.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.isLoading = false;
            state.errors = null;
        });
        builder.addCase(getProfileById.rejected, (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        });
    },
});

export default profileSlice.reducer;
