import mongoose from "mongoose";

const milestoneUpdateSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roadmap: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roadmap"
    },
    stepTitle: {
        type: String
    },
    stepOrder: {
        type: Number
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String
        }
    }]
}, { timestamps: true });

const MilestoneUpdate = mongoose.model("MilestoneUpdate", milestoneUpdateSchema);

export default MilestoneUpdate;
