export const calculateProgressPercentage = (completedStepsCount, totalSteps) => {
    if (!totalSteps || totalSteps <= 0) {
        return 0;
    }

    const percentage = Math.round((completedStepsCount / totalSteps) * 100);

    if (percentage < 0) {
        return 0;
    }

    if (percentage > 100) {
        return 100;
    }

    return percentage;
};

export const findStepByOrder = (roadmap, stepOrder) => {
    return roadmap.steps.find((step) => step.order === stepOrder);
};

export const isStepCompleted = (userRoadmap, stepOrder) => {
    return userRoadmap.completedSteps.some((order) => order === stepOrder);
};

export const applyStepCompletion = (userRoadmap, roadmap, stepOrder) => {
    if (isStepCompleted(userRoadmap, stepOrder)) {
        return {
            userRoadmap,
            isNewCompletion: false,
            step: findStepByOrder(roadmap, stepOrder)
        };
    }

    userRoadmap.completedSteps.push(stepOrder);
    userRoadmap.progressPercentage = calculateProgressPercentage(
        userRoadmap.completedSteps.length,
        roadmap.steps.length
    );
    userRoadmap.lastCompletedAt = new Date();

    if (userRoadmap.progressPercentage === 100) {
        userRoadmap.completedAt = new Date();
    }

    return {
        userRoadmap,
        isNewCompletion: true,
        step: findStepByOrder(roadmap, stepOrder)
    };
};
