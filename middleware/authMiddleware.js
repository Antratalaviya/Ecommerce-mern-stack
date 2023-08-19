const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization || req.headers.Authorization) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.SECREAT_KEY);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            return res.status(404).send({
                success: 'false',
                message: 'Not authorized user'
            });
        };
    }
    else {
        return res.status(404).send({
            success: 'false',
            message: 'token not available in bearer'
        });
    };
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({email});
    if (user?.role !== 1) {
        return res.status(404).send({
            success: 'false',
            message: 'User is not admin'
        });
    }
    else{
        next();
    }
})

module.exports = { authMiddleware, isAdmin }