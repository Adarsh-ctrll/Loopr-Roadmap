import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        required: true
    },
    estimatedDuration: {
        type: String,
        required: true
    },
    steps: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        resources: [{
            title: String,
            url: String,
            type: {
                type: String,
                enum: ["article", "video", "course", "docs", "book"]
            }
        }],
        order: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

roadmapSchema.index({ category: 1 });
roadmapSchema.index({ difficulty: 1 });

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;
