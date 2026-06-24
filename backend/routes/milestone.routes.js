import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
    commentMilestone,
    getAllMilestones,
    likeMilestone
} from "../controllers/milestone.controllers.js";
import { validateMilestoneComment } from "../middlewares/validateMilestone.middleware.js";

const milestoneRouter = express.Router();

milestoneRouter.get("/getAll", isAuth, getAllMilestones);
milestoneRouter.get("/like/:milestoneId", isAuth, likeMilestone);
milestoneRouter.post("/comment/:milestoneId", isAuth, validateMilestoneComment, commentMilestone);

export default milestoneRouter;
