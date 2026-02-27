const User = require("../users/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");


// REGISTER
exports.register = async (data) => {

    // verificar si ya existe
    const exists = await User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    });

    if (exists)
        throw new Error("Usuario ya existe");


    // encriptar password
    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );


    // crear usuario
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword
    });


    return {
        message: "Usuario creado correctamente"
    };

};



// LOGIN
exports.login = async (data) => {

    const user = await User.findOne({
        $or: [
            { email: data.identifier },
            { username: data.identifier }
        ]
    });

    if (!user)
        throw new Error("Usuario no existe");


    const validPassword = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!validPassword)
        throw new Error("Password incorrecto");


    const token = generateToken(user);


    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        token
    };

};