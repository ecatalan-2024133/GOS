const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    };

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return token;
};


exports.verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

};