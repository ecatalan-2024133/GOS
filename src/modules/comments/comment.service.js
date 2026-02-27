const Comment = require("./comment.model");
const Post = require("../posts/post.model");

exports.createComment = async (userId, postId, data) => {

    const post = await Post.findById(postId);

    if (!post)
        throw new Error("Publicación no encontrada");

    const comment = new Comment({
        content: data.content,
        author: userId,
        post: postId
    });

    return await comment.save();
};


exports.getCommentsByPost = async (postId) => {

    return await Comment.find({ post: postId })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

};


exports.updateComment = async (userId, commentId, data) => {

    const comment = await Comment.findById(commentId);

    if (!comment) {
        const error = new Error("Comentario no encontrado");
        error.statusCode = 404;
        throw error;
    }

    if (comment.author.toString() !== userId) {
        const error = new Error("No autorizado");
        error.statusCode = 403;
        throw error;
    }

    comment.content = content;

    await comment.save();

    return comment;
};


exports.deleteComment = async (userId, commentId) => {

    const comment = await Comment.findById(commentId);

    if (!comment)
        throw new Error("Comentario no encontrado");

    if (comment.author.toString() !== userId)
        throw new Error("No autorizado");

    await comment.deleteOne();

    return { message: "Comentario eliminado" };

};