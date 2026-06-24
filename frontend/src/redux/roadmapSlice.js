import { createSlice } from "@reduxjs/toolkit";

const roadmapSlice = createSlice({
    name: "roadmap",
    initialState: {
        roadmaps: [],
        myRoadmaps: [],
        currentRoadmap: null,
        milestones: []
    },
    reducers: {
        setRoadmaps: (state, action) => {
            state.roadmaps = action.payload;
        },
        setMyRoadmaps: (state, action) => {
            state.myRoadmaps = action.payload;
        },
        setCurrentRoadmap: (state, action) => {
            state.currentRoadmap = action.payload;
        },
        setMilestones: (state, action) => {
            state.milestones = action.payload;
        },
        updateMyRoadmap: (state, action) => {
            const index = state.myRoadmaps.findIndex(
                r => r._id === action.payload._id
            );
            if (index !== -1) {
                state.myRoadmaps[index] = action.payload;
            } else {
                state.myRoadmaps.unshift(action.payload);
            }
        },
        updateMilestone: (state, action) => {
            const index = state.milestones.findIndex(
                m => m._id === action.payload._id
            );
            if (index !== -1) {
                state.milestones[index] = action.payload;
            }
        }
    }
});

export const {
    setRoadmaps,
    setMyRoadmaps,
    setCurrentRoadmap,
    setMilestones,
    updateMyRoadmap,
    updateMilestone
} = roadmapSlice.actions;

export default roadmapSlice.reducer;
