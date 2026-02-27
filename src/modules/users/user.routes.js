const controller = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

async function routes(fastify, options) {

    // Obtener perfil
    fastify.get(
        "/profile",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Users"],
                security: [{ bearerAuth: [] }]
            }
        },
        async (request, reply) => {
            reply.send({ user: request.user });
        }
    );


    // Actualizar perfil
    fastify.put(
        "/profile",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Users"],
                security: [{ bearerAuth: [] }],
                body: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            minLength: 3,
                            maxLength: 50
                        },
                        email: {
                            type: "string",
                            format: "email"
                        }
                    }
                }
            }
        },
        controller.updateProfile
    );


    // Cambiar contraseña
    fastify.put(
        "/change-password",
        {
            preHandler: authMiddleware,
            schema: {
                tags: ["Users"],
                security: [{ bearerAuth: [] }],
                body: {
                    type: "object",
                    required: ["currentPassword", "newPassword"],
                    properties: {
                        currentPassword: {
                            type: "string",
                            minLength: 6
                        },
                        newPassword: {
                            type: "string",
                            minLength: 6
                        }
                    }
                }
            }
        },
        controller.changePassword
    );

}

module.exports = routes;