const service = require("./comment.service");
const Comment = require("./comment.model"); // ✅ IMPORTANTE

exports.createComment = async (request, reply) => {

    try {

        const result = await service.createComment(
            request.user.id,
            request.params.postId,
            request.body
        );

        reply.send(result);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }

};


exports.getCommentsByPost = async (request, reply) => {

    const comments = await service.getCommentsByPost(
        request.params.postId
    );

    reply.send(comments);

};


exports.updateComment = async (request, reply) => {

    try {

        const { id } = request.params;      // ✅ CORRECTO
        const { content } = request.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return reply.code(404).send({
                message: "Comentario no encontrado"
            });
        }

        if (comment.author.toString() !== request.user.id) {
            return reply.code(403).send({
                message: "No autorizado"
            });
        }

        comment.content = content;

        await comment.save();

        reply.send({
            message: "Comentario actualizado",
            comment
        });

    } catch (error) {

        reply.code(500).send({
            message: error.message
        });

    }

};


exports.deleteComment = async (request, reply) => {

    try {

        const result = await service.deleteComment(
            request.user.id,
            request.params.id
        );

        reply.send(result);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }

};