const fastify = require("fastify")({
    logger: true
});

require("dotenv").config();

const connectDB = require("./config/db");

// swagger
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

// routes
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");

// registrar swagger PRIMERO
fastify.register(swagger, {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Gestor Opiniones API",
            description: "API del sistema de opiniones",
            version: "1.0.0"
        }
    }
});

fastify.register(swaggerUI, {
    routePrefix: "/docs",
    exposeRoute: true
});


// registrar rutas DESPUÉS
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(userRoutes, { prefix: "/api/users" });


// start server
const start = async () => {

    try {

        await connectDB();

        await fastify.listen({
            port: process.env.PORT || 3000
        });

        console.log("Servidor corriendo");

    } catch (error) {

        fastify.log.error(error);
        process.exit(1);

    }

};

start();