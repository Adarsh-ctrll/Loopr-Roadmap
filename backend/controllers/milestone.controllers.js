import MilestoneUpdate from "../models/milestoneUpdate.model.js";
import { io } from "../socket.js";

export const getAllMilestones = async (req, res) => {
    try {
        const milestones = await MilestoneUpdate.find()
            .populate("author", "name userName profileImage")
            .populate("roadmap", "title category")
            .populate("comments.author", "name userName profileImage")
            .sort({ createdAt: -1 });

        return res.status(200).json(milestones);
    } catch (error) {
        return res.status(500).json({ message: `getAllMilestones error ${error}` });
    }
};

export const likeMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const milestone = await MilestoneUpdate.findById(milestoneId);

        if (!milestone) {
            return res.status(404).json({ message: "milestone not found" });
        }

        const alreadyLiked = milestone.likes.some(
            (id) => id.toString() === req.userId.toString()
        );

        if (alreadyLiked) {
            milestone.likes = milestone.likes.filter(
                (id) => id.toString() !== req.userId.toString()
            );
        } else {
            milestone.likes.push(req.userId);
        }

        await milestone.save();
        await milestone.populate("author", "name userName profileImage");
        await milestone.populate("roadmap", "title category");
        await milestone.populate("comments.author", "name userName profileImage");

        io.emit("likedMilestone", {
            milestoneId: milestone._id,
            likes: milestone.likes
        });

        return res.status(200).json(milestone);
    } catch (error) {
        return res.status(500).json({ message: `likeMilestone error ${error}` });
    }
};

export const commentMilestone = async (req, res) => {
    try {
        const { milestoneId } = req.params;
        const { message } = req.body;
        const milestone = await MilestoneUpdate.findById(milestoneId);

        if (!milestone) {
            return res.status(404).json({ message: "milestone not found" });
        }

        milestone.comments.push({
            author: req.userId,
            message
        });

        await milestone.save();
        await milestone.populate("author", "name userName profileImage");
        await milestone.populate("roadmap", "title category");
        await milestone.populate("comments.author", "name userName profileImage");

        io.emit("commentedMilestone", {
            milestoneId: milestone._id,
            comments: milestone.comments
        });

        return res.status(200).json(milestone);
    } catch (error) {
        return res.status(500).json({ message: `commentMilestone error ${error}` });
    }
};
