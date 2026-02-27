const jwt = require("jsonwebtoken");

module.exports = async (request, reply) => {

    try {

        const authHeader = request.headers.authorization;

        if (!authHeader)
            throw new Error("Token requerido");

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        request.user = decoded;

    } catch (error) {

        reply.code(401).send({
            message: "Token inválido"
        });

    }

};