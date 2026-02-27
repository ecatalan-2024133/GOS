const service = require("./post.service");


exports.createPost = async (request, reply) => {

    try {

        const post = await service.createPost(
            request.body,
            request.user.id
        );

        reply.send(post);

    } catch (error) {

        reply.code(400).send({ message: error.message });

    }

};


exports.getPosts = async (request, reply) => {

    const posts = await service.getPosts();
    reply.send(posts);

};


exports.getPostById = async (request, reply) => {

    try {

        const post = await service.getPostById(
            request.params.id
        );

        reply.send(post);

    } catch (error) {

        reply.code(404).send({ message: error.message });

    }

};


exports.updatePost = async (request, reply) => {

    try {

        const post = await service.updatePost(
            request.params.id,
            request.user.id,
            request.body
        );

        reply.send(post);

    } catch (error) {

        reply.code(400).send({ message: error.message });

    }

};


exports.deletePost = async (request, reply) => {

    try {

        const result = await service.deletePost(
            request.params.id,
            request.user.id
        );

        reply.send(result);

    } catch (error) {

        reply.code(400).send({ message: error.message });

    }

};