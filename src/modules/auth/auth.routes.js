const controller = require("./auth.controller");

async function routes(fastify, options) {

    fastify.post(
        "/register",
        {
            schema: {
                description: "Registrar usuario",
                tags: ["Auth"],
                body: {
                    type: "object",
                    required: ["username", "email", "password"],
                    properties: {
                        username: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" }
                    }
                }
            }
        },
        controller.register   // 👈 ESTO FALTABA
    );


    fastify.post(
        "/login",
        {
            schema: {
                description: "Login usuario",
                tags: ["Auth"],
                body: {
                    type: "object",
                    required: ["identifier", "password"],
                    properties: {
                        identifier: { type: "string" },
                        password: { type: "string" }
                    }
                }
            }
        },
        controller.login   // 👈 ESTO FALTABA
    );

}

module.exports = routes;