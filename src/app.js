const fastify = require("fastify")({
    logger: true
});

require("dotenv").config();

const connectDB = require("./config/db");

// importar rutas
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const postRoutes = require("./modules/posts/post.routes");

const start = async () => {

    try {

        // registrar swagger
        await fastify.register(require("@fastify/swagger"), {
            openapi: {
                openapi: "3.0.0",
                info: {
                    title: "Gestor Opiniones API",
                    version: "1.0.0"
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security: [
                    {
                        bearerAuth: []
                    }
                ]
            }
        });

    await fastify.register(require("@fastify/swagger-ui"), {
        routePrefix: "/docs"
    });

    // conectar DB
    connectDB();

    // registrar rutas
    fastify.register(authRoutes, { prefix: "/api/auth" });
    fastify.register(userRoutes, { prefix: "/api/users" });
    fastify.register(postRoutes, { prefix: "/api/posts" });

    // iniciar servidor
    await fastify.listen({
        port: process.env.PORT || 3000
    });

    console.log("Servidor corriendo en puerto 3000");

} catch (error) {

    fastify.log.error(error);
    process.exit(1);

}
};

start();