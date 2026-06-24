const allowedCategories = [
    "College",
    "Placement",
    "Relationships",
    "Career",
    "Confessions",
    "Funny",
    "Advice"
];

export const validateCreateAnonymousPost = (req, res, next) => {
    const { content, category } = req.body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
        return res.status(400).json({ message: "content is required" });
    }

    if (content.trim().length > 2000) {
        return res.status(400).json({ message: "content must be 2000 characters or less" });
    }

    if (!category || !allowedCategories.includes(category)) {
        return res.status(400).json({ message: "valid category is required" });
    }

    req.body.content = content.trim();
    next();
};

export const validateAnonymousComment = (req, res, next) => {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({ message: "message is required" });
    }

    if (message.trim().length > 500) {
        return res.status(400).json({ message: "message must be 500 characters or less" });
    }

    req.body.message = message.trim();
    next();
};

export const validateAnonymousReport = (req, res, next) => {
    const { reason } = req.body;

    if (reason !== undefined && reason !== null) {
        if (typeof reason !== "string") {
            return res.status(400).json({ message: "reason must be a string" });
        }

        if (reason.trim().length > 500) {
            return res.status(400).json({ message: "reason must be 500 characters or less" });
        }

        req.body.reason = reason.trim();
    }

    next();
};

export const validateAnonymousCategoryQuery = (req, res, next) => {
    const { category } = req.query;

    if (category && !allowedCategories.includes(category)) {
        return res.status(400).json({ message: "invalid category filter" });
    }

    next();
};

export const allowedAnonymousCategories = allowedCategories;
