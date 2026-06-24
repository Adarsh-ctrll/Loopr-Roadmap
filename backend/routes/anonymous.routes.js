import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
    commentAnonymousPost,
    createAnonymousPost,
    deleteOwnAnonymousPost,
    getAllAnonymousPosts,
    hideAnonymousPost,
    likeAnonymousPost,
    reportAnonymousPost
} from "../controllers/anonymous.controllers.js";
import {
    validateAnonymousCategoryQuery,
    validateAnonymousComment,
    validateAnonymousReport,
    validateCreateAnonymousPost
} from "../middlewares/validateAnonymous.middleware.js";

const anonymousRouter = express.Router();

anonymousRouter.post("/create", isAuth, validateCreateAnonymousPost, createAnonymousPost);
anonymousRouter.get("/getAll", isAuth, validateAnonymousCategoryQuery, getAllAnonymousPosts);
anonymousRouter.get("/like/:postId", isAuth, likeAnonymousPost);
anonymousRouter.post("/comment/:postId", isAuth, validateAnonymousComment, commentAnonymousPost);
anonymousRouter.post("/report/:postId", isAuth, validateAnonymousReport, reportAnonymousPost);
anonymousRouter.post("/hide/:postId", isAuth, hideAnonymousPost);
anonymousRouter.delete("/delete/:postId", isAuth, deleteOwnAnonymousPost);

export default anonymousRouter;
