import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
    completeStep,
    getAllRoadmaps,
    getMyRoadmaps,
    getRoadmapById,
    getUserRoadmapProgress,
    getUserRoadmaps,
    startRoadmap
} from "../controllers/roadmap.controllers.js";
import {
    validateCompleteStep,
    validateRoadmapQuery
} from "../middlewares/validateRoadmap.middleware.js";

const roadmapRouter = express.Router();

roadmapRouter.get("/getAll", isAuth, validateRoadmapQuery, getAllRoadmaps);
roadmapRouter.get("/my", isAuth, getMyRoadmaps);
roadmapRouter.get("/user/:userName", isAuth, getUserRoadmaps);
roadmapRouter.get("/progress/:roadmapId", isAuth, getUserRoadmapProgress);
roadmapRouter.post("/start/:roadmapId", isAuth, startRoadmap);
roadmapRouter.patch("/complete-step/:roadmapId", isAuth, validateCompleteStep, completeStep);
roadmapRouter.get("/:roadmapId", isAuth, getRoadmapById);

export default roadmapRouter;
