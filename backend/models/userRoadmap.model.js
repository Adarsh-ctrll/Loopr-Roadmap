import mongoose from "mongoose";

const userRoadmapSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap",
        required: true
    },
    completedSteps: [{
        type: Number
    }],
    progressPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    },
    lastCompletedAt: {
        type: Date
    }
}, { timestamps: true });

userRoadmapSchema.index({ user: 1, roadmap: 1 }, { unique: true });

const UserRoadmap = mongoose.model("UserRoadmap", userRoadmapSchema);

export default UserRoadmap;
