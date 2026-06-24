import AnonymousPost from "../models/anonymousPost.model.js";
import HiddenAnonymousPost from "../models/hiddenAnonymousPost.model.js";
import { sanitizeAnonymousPost, sanitizeAnonymousPosts } from "../utils/sanitizeAnonymousPost.js";

export const createAnonymousPost = async (req, res) => {
    try {
        const { content, category } = req.body;

        const post = await AnonymousPost.create({
            author: req.userId,
            content,
            category
        });

        const sanitizedPost = sanitizeAnonymousPost(post, { isOwner: true });

        return res.status(201).json({
            message: "anonymous post created successfully",
            post: sanitizedPost
        });
    } catch (error) {
        return res.status(500).json({ message: `createAnonymousPost error ${error}` });
    }
};

export const getAllAnonymousPosts = async (req, res) => {
    try {
        const filter = {
            isDeleted: false
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const hiddenPosts = await HiddenAnonymousPost.find({
            user: req.userId
        }).select("post");

        const hiddenPostIds = hiddenPosts.map((item) => item.post);

        if (hiddenPostIds.length > 0) {
            filter._id = { $nin: hiddenPostIds };
        }

        const posts = await AnonymousPost.find(filter)
            .select("-author -reports")
            .sort({ createdAt: -1 });

        return res.status(200).json(sanitizeAnonymousPosts(posts));
    } catch (error) {
        return res.status(500).json({ message: `getAllAnonymousPosts error ${error}` });
    }
};

export const likeAnonymousPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await AnonymousPost.findOne({
            _id: postId,
            isDeleted: false
        }).select("-author -reports");

        if (!post) {
            return res.status(404).json({ message: "anonymous post not found" });
        }

        const alreadyLiked = post.likes.some(
            (id) => id.toString() === req.userId.toString()
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== req.userId.toString()
            );
        } else {
            post.likes.push(req.userId);
        }

        await post.save();

        return res.status(200).json(sanitizeAnonymousPost(post));
    } catch (error) {
        return res.status(500).json({ message: `likeAnonymousPost error ${error}` });
    }
};

export const commentAnonymousPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { message } = req.body;

        const post = await AnonymousPost.findOne({
            _id: postId,
            isDeleted: false
        }).select("-author -reports");

        if (!post) {
            return res.status(404).json({ message: "anonymous post not found" });
        }

        post.comments.push({
            author: req.userId,
            message
        });

        await post.save();

        return res.status(200).json(sanitizeAnonymousPost(post));
    } catch (error) {
        return res.status(500).json({ message: `commentAnonymousPost error ${error}` });
    }
};

export const reportAnonymousPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { reason } = req.body;

        const post = await AnonymousPost.findOne({
            _id: postId,
            isDeleted: false
        }).select("+author");

        if (!post) {
            return res.status(404).json({ message: "anonymous post not found" });
        }

        const alreadyReported = post.reports.some(
            (report) => report.user.toString() === req.userId.toString()
        );

        if (alreadyReported) {
            return res.status(400).json({ message: "you have already reported this post" });
        }

        post.reports.push({
            user: req.userId,
            reason: reason || "No reason provided"
        });
        post.reportCount = post.reports.length;

        await post.save();

        return res.status(200).json({ message: "post reported successfully" });
    } catch (error) {
        return res.status(500).json({ message: `reportAnonymousPost error ${error}` });
    }
};

export const hideAnonymousPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await AnonymousPost.findOne({
            _id: postId,
            isDeleted: false
        });

        if (!post) {
            return res.status(404).json({ message: "anonymous post not found" });
        }

        const existingHidden = await HiddenAnonymousPost.findOne({
            user: req.userId,
            post: postId
        });

        if (existingHidden) {
            return res.status(200).json({ message: "post already hidden" });
        }

        await HiddenAnonymousPost.create({
            user: req.userId,
            post: postId
        });

        return res.status(200).json({ message: "post hidden successfully" });
    } catch (error) {
        return res.status(500).json({ message: `hideAnonymousPost error ${error}` });
    }
};

export const deleteOwnAnonymousPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await AnonymousPost.findOne({
            _id: postId,
            isDeleted: false
        }).select("+author");

        if (!post) {
            return res.status(404).json({ message: "anonymous post not found" });
        }

        if (post.author.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "you can only delete your own anonymous post" });
        }

        post.isDeleted = true;
        await post.save();

        return res.status(200).json({ message: "anonymous post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `deleteOwnAnonymousPost error ${error}` });
    }
};
