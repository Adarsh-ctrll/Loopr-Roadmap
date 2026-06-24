export const sanitizeAnonymousPost = (post, options = {}) => {
    const doc = post.toObject ? post.toObject() : { ...post };

    delete doc.author;

    doc.comments = (doc.comments || []).map((comment) => ({
        _id: comment._id,
        message: comment.message,
        createdAt: comment.createdAt,
        displayName: "Anonymous"
    }));

    delete doc.reports;

    if (!options.includeReportCount) {
        delete doc.reportCount;
    }

    if (options.isOwner) {
        doc.isOwner = true;
    }

    return doc;
};

export const sanitizeAnonymousPosts = (posts, options = {}) => {
    return posts.map((post) => sanitizeAnonymousPost(post, options));
};
