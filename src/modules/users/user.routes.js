const controller = require("./user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

async function routes(fastify, options) {

    fastify.get(
        "/profile",
        {
            preHandler: authMiddleware,
            schema: {
                security: [{ bearerAuth: [] }]
            }
        },
        async (request, reply) => {
            reply.send({ user: request.user });
        }
    );

    fastify.put(
        "/profile",
        { preHandler: authMiddleware },
        controller.updateProfile
    );

    fastify.put(
        "/change-password",
        { preHandler: authMiddleware },
        controller.changePassword
    );

}

module.exports = routes;