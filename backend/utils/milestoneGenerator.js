import MilestoneUpdate from "../models/milestoneUpdate.model.js";
import User from "../models/user.model.js";

export const buildMilestoneMessage = (userName, stepTitle) => {
    return `🎯 ${userName} completed ${stepTitle}`;
};

export const createMilestoneUpdate = async (userId, roadmap, step) => {
    const user = await User.findById(userId).select("name");

    if (!user || !step) {
        return null;
    }

    const milestone = await MilestoneUpdate.create({
        author: userId,
        message: buildMilestoneMessage(user.name, step.title),
        roadmap: roadmap._id,
        stepTitle: step.title,
        stepOrder: step.order
    });

    return MilestoneUpdate.findById(milestone._id)
        .populate("author", "name userName profileImage")
        .populate("roadmap", "title category");
};
