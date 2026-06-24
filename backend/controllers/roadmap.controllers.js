import Roadmap from "../models/roadmap.model.js";
import User from "../models/user.model.js";
import UserRoadmap from "../models/userRoadmap.model.js";
import { applyStepCompletion } from "../utils/roadmapProgress.js";
import { createMilestoneUpdate } from "../utils/milestoneGenerator.js";

export const getAllRoadmaps = async (req, res) => {
    try {
        const filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.difficulty) {
            filter.difficulty = req.query.difficulty;
        }

        const roadmaps = await Roadmap.find(filter).sort({ title: 1 });
        return res.status(200).json(roadmaps);
    } catch (error) {
        return res.status(500).json({ message: `getAllRoadmaps error ${error}` });
    }
};

export const getRoadmapById = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const roadmap = await Roadmap.findById(roadmapId);

        if (!roadmap) {
            return res.status(404).json({ message: "roadmap not found" });
        }

        const userProgress = await UserRoadmap.findOne({
            user: req.userId,
            roadmap: roadmapId
        });

        return res.status(200).json({
            roadmap,
            userProgress
        });
    } catch (error) {
        return res.status(500).json({ message: `getRoadmapById error ${error}` });
    }
};

export const startRoadmap = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const roadmap = await Roadmap.findById(roadmapId);

        if (!roadmap) {
            return res.status(404).json({ message: "roadmap not found" });
        }

        let userRoadmap = await UserRoadmap.findOne({
            user: req.userId,
            roadmap: roadmapId
        });

        if (userRoadmap) {
            userRoadmap = await UserRoadmap.findById(userRoadmap._id).populate("roadmap");
            return res.status(200).json({
                message: "roadmap already started",
                userRoadmap
            });
        }

        userRoadmap = await UserRoadmap.create({
            user: req.userId,
            roadmap: roadmapId,
            completedSteps: [],
            progressPercentage: 0,
            startedAt: new Date()
        });

        userRoadmap = await UserRoadmap.findById(userRoadmap._id).populate("roadmap");

        return res.status(201).json({
            message: "roadmap started successfully",
            userRoadmap
        });
    } catch (error) {
        return res.status(500).json({ message: `startRoadmap error ${error}` });
    }
};

export const getMyRoadmaps = async (req, res) => {
    try {
        const userRoadmaps = await UserRoadmap.find({
            user: req.userId
        })
            .populate("roadmap")
            .sort({ updatedAt: -1 });

        return res.status(200).json(userRoadmaps);
    } catch (error) {
        return res.status(500).json({ message: `getMyRoadmaps error ${error}` });
    }
};

export const getUserRoadmaps = async (req, res) => {
    try {
        const { userName } = req.params;
        const user = await User.findOne({ userName }).select("_id userName name");

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        const userRoadmaps = await UserRoadmap.find({
            user: user._id
        })
            .populate("roadmap", "title category difficulty estimatedDuration")
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            user: {
                _id: user._id,
                userName: user.userName,
                name: user.name
            },
            userRoadmaps
        });
    } catch (error) {
        return res.status(500).json({ message: `getUserRoadmaps error ${error}` });
    }
};

export const getUserRoadmapProgress = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const userRoadmap = await UserRoadmap.findOne({
            user: req.userId,
            roadmap: roadmapId
        }).populate("roadmap");

        if (!userRoadmap) {
            return res.status(404).json({ message: "roadmap progress not found" });
        }

        return res.status(200).json(userRoadmap);
    } catch (error) {
        return res.status(500).json({ message: `getUserRoadmapProgress error ${error}` });
    }
};

export const completeStep = async (req, res) => {
    try {
        const { roadmapId } = req.params;
        const { stepOrder } = req.body;

        const roadmap = await Roadmap.findById(roadmapId);

        if (!roadmap) {
            return res.status(404).json({ message: "roadmap not found" });
        }

        let userRoadmap = await UserRoadmap.findOne({
            user: req.userId,
            roadmap: roadmapId
        });

        if (!userRoadmap) {
            return res.status(400).json({ message: "start the roadmap before completing steps" });
        }

        const step = roadmap.steps.find((item) => item.order === stepOrder);

        if (!step) {
            return res.status(400).json({ message: "step not found" });
        }

        const completionResult = applyStepCompletion(userRoadmap, roadmap, stepOrder);
        userRoadmap = completionResult.userRoadmap;

        await userRoadmap.save();

        let milestoneUpdate = null;

        if (completionResult.isNewCompletion) {
            milestoneUpdate = await createMilestoneUpdate(req.userId, roadmap, step);
        }

        userRoadmap = await UserRoadmap.findById(userRoadmap._id).populate("roadmap");

        return res.status(200).json({
            message: completionResult.isNewCompletion
                ? "step completed successfully"
                : "step already completed",
            userRoadmap,
            milestoneUpdate
        });
    } catch (error) {
        return res.status(500).json({ message: `completeStep error ${error}` });
    }
};
