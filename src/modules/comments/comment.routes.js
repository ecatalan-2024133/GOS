const controller = require("./comment.controller");
const authMiddleware = require("../../middleware/auth.middleware");

async function routes(fastify, options) {

    // CREAR
    fastify.post("/:postId", {
        preHandler: authMiddleware,
        schema: {
            tags: ["Comments"],
            security: [{ bearerAuth: [] }],
            params: {
                type: "object",
                required: ["postId"],
                properties: {
                    postId: { type: "string" }
                }
            },
            body: {
                type: "object",
                required: ["content"],
                properties: {
                    content: {
                        type: "string",
                        minLength: 2,
                        maxLength: 500
                    }
                }
            }
        }
    }, controller.createComment);


    // LISTAR
    fastify.get("/post/:postId", {
        schema: {
            tags: ["Comments"],
            params: {
                type: "object",
                required: ["postId"],
                properties: {
                    postId: { type: "string" }
                }
            }
        }
    }, controller.getCommentsByPost);


    // EDITAR
    fastify.put("/:id", {
        preHandler: authMiddleware,
        schema: {
            tags: ["Comments"],
            security: [{ bearerAuth: [] }],
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "string" }
                }
            },
            body: {
                type: "object",
                required: ["content"],
                properties: {
                    content: {
                        type: "string",
                        minLength: 2,
                        maxLength: 500
                    }
                }
            }
        }
    }, controller.updateComment);


    // ELIMINAR
    fastify.delete("/:id", {
        preHandler: authMiddleware,
        schema: {
            tags: ["Comments"],
            security: [{ bearerAuth: [] }],
            params: {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "string" }
                }
            }
        }
    }, controller.deleteComment);

}

module.exports = routes;