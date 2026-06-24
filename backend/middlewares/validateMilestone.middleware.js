export const validateMilestoneComment = (req, res, next) => {
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
