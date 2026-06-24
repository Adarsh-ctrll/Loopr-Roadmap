import { createSlice } from "@reduxjs/toolkit";

const anonymousSlice = createSlice({
    name: "anonymous",
    initialState: {
        anonymousPosts: [],
        category: null
    },
    reducers: {
        setAnonymousPosts: (state, action) => {
            state.anonymousPosts = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        updateAnonymousPost: (state, action) => {
            const index = state.anonymousPosts.findIndex(
                p => p._id === action.payload._id
            );
            if (index !== -1) {
                state.anonymousPosts[index] = action.payload;
            }
        },
        addAnonymousPost: (state, action) => {
            state.anonymousPosts.unshift(action.payload);
        }
    }
});

export const {
    setAnonymousPosts,
    setCategory,
    updateAnonymousPost,
    addAnonymousPost
} = anonymousSlice.actions;

export default anonymousSlice.reducer;
