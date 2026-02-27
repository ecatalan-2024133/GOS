const controller = require("./post.controller");
const authMiddleware = require("../../middleware/auth.middleware");

async function routes(fastify, options) {

    // CREAR POST
    fastify.post(
        "/",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Posts"],
                security: [{ bearerAuth: [] }],
                body: {
                    type: "object",
                    required: ["title", "category", "content"],
                    properties: {
                        title: {
                            type: "string",
                            minLength: 3,
                            maxLength: 100
                        },
                        category: {
                            type: "string",
                            minLength: 3,
                            maxLength: 50
                        },
                        content: {
                            type: "string",
                            minLength: 5
                        }
                    }
                },
                response: {
                    201: {
                        type: "object",
                        properties: {
                            _id: { type: "string" },
                            title: { type: "string" },
                            category: { type: "string" },
                            content: { type: "string" },
                            author: { type: "string" },
                            createdAt: { type: "string" }
                        }
                    }
                }
            }
        },
        controller.createPost
    );

    // LISTAR POSTS
    fastify.get(
        "/",
        {
            schema: {
                tags: ["Posts"],
                response: {
                    200: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                _id: { type: "string" },
                                title: { type: "string" },
                                category: { type: "string" },
                                content: { type: "string" },
                                author: { type: "object" },
                                createdAt: { type: "string" }
                            }
                        }
                    }
                }
            }
        },
        controller.getPosts
    );

    // OBTENER POST POR ID
    fastify.get(
        "/:id",
        {
            schema: {
                tags: ["Posts"],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" }
                    }
                }
            }
        },
        controller.getPostById
    );

    // EDITAR POST (solo autor)
    fastify.put(
        "/:id",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Posts"],
                security: [{ bearerAuth: [] }],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" }
                    }
                },
                body: {
                    type: "object",
                    properties: {
                        title: { type: "string" },
                        category: { type: "string" },
                        content: { type: "string" }
                    }
                }
            }
        },
        controller.updatePost
    );

    // ELIMINAR POST (solo autor)
    fastify.delete(
        "/:id",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Posts"],
                security: [{ bearerAuth: [] }],
                params: {
                    type: "object",
                    properties: {
                        id: { type: "string" }
                    }
                }
            }
        },
        controller.deletePost
    );

}

module.exports = routes;