module.exports = function (error, request, reply) {

    request.log.error(error);

    reply.status(error.statusCode || 500).send({

        message: error.message || "Error interno del servidor"

    });

};