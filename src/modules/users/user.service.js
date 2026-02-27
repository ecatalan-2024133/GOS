const User = require("./user.model");
const bcrypt = require("bcrypt");

exports.getProfile = async (userId) => {

    const user = await User.findById(userId).select("-password");

    if (!user)
        throw new Error("Usuario no encontrado");

    return user;
};


exports.updateProfile = async (userId, data) => {

    const updateData = {};

    if (data.username)
        updateData.username = data.username;

    if (data.email)
        updateData.email = data.email;

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
    ).select("-password");

    return user;
};


exports.changePassword = async (userId, data) => {

    const user = await User.findById(userId);

    const validPassword = await bcrypt.compare(
        data.currentPassword,
        user.password
    );

    if (!validPassword)
        throw new Error("Password actual incorrecto");

    const hashedPassword = await bcrypt.hash(
        data.newPassword,
        10
    );

    user.password = hashedPassword;

    await user.save();

    return true;
};