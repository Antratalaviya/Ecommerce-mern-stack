const generateToken = require("../config/jwtToken");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
    try {

        const { name, email, password, phone, address, answer } = req.body;
        // validation check
        if (!name) {
            return res.status(404).send({
                success: false,
                message: "please enter your name"
            });
        };
        if (!email) {
            return res.status(404).send({
                success: false,
                message: "please enter your email"
            });
        };
        if (!password) {
            return res.status(404).send({
                success: false,
                message: "please enter your password"
            });
        };
        if (!phone) {
            return res.status(404).send({
                success: false,
                message: "please enter your mobile"
            });
        };
        if (!address) {
            return res.status(404).send({
                success: false,
                message: "please enter your address"
            });
        };
        if (!answer) {
            return res.status(404).send({
                success: false,
                message: "please enter your answer"
            });
        };

        // check for already exist
        const user = await User.findOne({ email });
        if (user) {
            return res.status(404).send({
                success: false,
                message: 'User already exist'
            })
        }
        else {
            //  create user
            const newUser = await User.create(req.body);
            return res.status(201).send({
                success: true,
                message: 'user created successfully',
                newUser
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in registartion",
            error
        })
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {

        // validation check 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            });
        };

        // ckeck user availability
        const user = await User.findOne({ email });

        if (user && (await user.isPasswordMatch(password))) {
            return res.status(200).send({
                success: true,
                message: 'User login Successfully',
                user: {
                    _id: user?._id,
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                    address: user?.address,
                    answer: user?.answer,
                    role: user?.role,
                },
                token: generateToken(user?._id)

            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: 'User not available'
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
        })
    }

})

const getUser = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById(_id);
        if (user) {
            return res.status(200).send({
                success: true,
                user
            });
        }
        else {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in get user",
            error
        })
    }
})

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in get users",
            error
        })
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const { password } = req.body;
        const user = await User.findById(_id);
        if (user) {
            user.password = password;
            await user.save();
            return res.status(200).send({
                success: true,
                message: "Password updated successfully",
                user
            })
        } else {
            return res.status(404).send({
                success: false,
                message: "user not available"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in password update",
            error
        })
    }
})

const forgetPassword = asyncHandler(async (req, res) => {
    try {
        const { newPassword, email, answer } = req.body;
        const user = await User.findOne({ email, answer });
        if (user) {
            user.password = newPassword;
            await user.save();
            return res.status(200).send({
                success: true,
                message: "Password reset successfully",
                user
            })
        }
        else {
            return res.status(404).send({
                success: false,
                message: "user with this email not available"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in reset password",
            error
        })
    }
})

const updateProfile = async (req, res) => {
    const {name, email, password, phone, address} = req.body;
    try {
        const user = await User.findOne({email});
        user.name = name;
        user.password = password;
        user.phone = phone;
        user.address = address;
        await user.save();
        res.status(200).send({
            success:true,
            message:'User updated Successfully',
            user
        });
    } catch (error) {
        res.status(500).send({
            success:false,
            error
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    getUsers,
    forgetPassword,
    updatePassword,
    updateProfile
}