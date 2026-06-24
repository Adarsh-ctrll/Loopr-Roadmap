import mongoose from "mongoose";

const hiddenAnonymousPostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnonymousPost",
        required: true
    }
}, { timestamps: true });

hiddenAnonymousPostSchema.index({ user: 1, post: 1 }, { unique: true });

const HiddenAnonymousPost = mongoose.model("HiddenAnonymousPost", hiddenAnonymousPostSchema);

export default HiddenAnonymousPost;
