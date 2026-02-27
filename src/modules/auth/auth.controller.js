const service = require("./auth.service");


// REGISTER
exports.register = async (request, reply) => {

    try {

        const result = await service.register(
            request.body
        );

        reply.send(result);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }

};


// LOGIN
exports.login = async (request, reply) => {

    try {

        const result = await service.login(
            request.body
        );

        reply.send(result);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }

};