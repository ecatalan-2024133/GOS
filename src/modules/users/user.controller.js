const service = require("./user.service");

exports.getProfile = async (request, reply) => {

    try {

        const user = await service.getProfile(
            request.user.id
        );

        reply.send(user);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }
};


exports.updateProfile = async (request, reply) => {

    try {

        const user = await service.updateProfile(
            request.user.id,
            request.body
        );

        reply.send(user);

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }
};


exports.changePassword = async (request, reply) => {

    try {

        await service.changePassword(
            request.user.id,
            request.body
        );

        reply.send({
            message: "Password actualizado"
        });

    } catch (error) {

        reply.code(400).send({
            message: error.message
        });

    }
};