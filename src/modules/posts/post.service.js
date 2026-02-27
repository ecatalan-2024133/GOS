const Post = require("./post.model");


// CREAR POST
exports.createPost = async (data, userId) => {

    const post = new Post({
        title: data.title,
        category: data.category,
        content: data.content,
        author: userId
    });

    await post.save();

    return post;
};


// LISTAR POSTS
exports.getPosts = async () => {

    return await Post
        .find()
        .populate("author", "username email") // trae datos del autor
        .populate({
            path: "comments",
            populate: {
                path: "author",
                select: "username"
            }
        });

};


// OBTENER POST POR ID
exports.getPostById = async (id) => {

    const post = await Post
        .findById(id)
        .populate("author", "username email")
        .populate({
            path: "comments",
            populate: {
                path: "author",
                select: "username"
            }
        });

    if (!post) {
        const error = new Error("Post no encontrado");
        error.statusCode = 404;
        throw error;
    }

    return post;
};


// EDITAR POST
exports.updatePost = async (id, userId, data) => {

    const post = await Post.findById(id);

    if (!post)
        throw new Error("Post no encontrado");

    if (post.author.toString() !== userId)
        throw new Error("No autorizado");

    post.title = data.title || post.title;
    post.category = data.category || post.category;
    post.content = data.content || post.content;

    await post.save();

    return post;
};


// ELIMINAR POST
exports.deletePost = async (id, userId) => {

    const post = await Post.findById(id);

    if (!post)
        throw new Error("Post no encontrado");

    if (post.author.toString() !== userId)
        throw new Error("No autorizado");

    await post.deleteOne();

    return { message: "Post eliminado correctamente" };

};