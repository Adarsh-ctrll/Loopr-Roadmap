export const validateCompleteStep = (req, res, next) => {
    const { stepOrder } = req.body;

    if (stepOrder === undefined || stepOrder === null) {
        return res.status(400).json({ message: "stepOrder is required" });
    }

    const parsedStepOrder = Number(stepOrder);

    if (!Number.isInteger(parsedStepOrder) || parsedStepOrder < 1) {
        return res.status(400).json({ message: "stepOrder must be a positive integer" });
    }

    req.body.stepOrder = parsedStepOrder;
    next();
};

export const validateRoadmapQuery = (req, res, next) => {
    const { difficulty } = req.query;
    const allowedDifficulties = ["beginner", "intermediate", "advanced"];

    if (difficulty && !allowedDifficulties.includes(difficulty)) {
        return res.status(400).json({ message: "invalid difficulty filter" });
    }

    next();
};
