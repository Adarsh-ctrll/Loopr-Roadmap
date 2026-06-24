import mongoose from "mongoose";

const anonymousPostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        select: false
    },
    content: {
        type: String,
        required: true,
        maxlength: 2000
    },
    category: {
        type: String,
        enum: ["College", "Placement", "Relationships", "Career", "Confessions", "Funny", "Advice"],
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            select: false
        },
        message: {
            type: String,
            maxlength: 500
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    reports: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reason: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    reportCount: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

anonymousPostSchema.index({ category: 1, createdAt: -1 });
anonymousPostSchema.index({ isDeleted: 1, createdAt: -1 });

const AnonymousPost = mongoose.model("AnonymousPost", anonymousPostSchema);

export default AnonymousPost;
