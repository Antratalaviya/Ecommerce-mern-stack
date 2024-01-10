const express = require("express");
const { createUser, loginUser, getUser, getUsers, forgetPassword, updatePassword, updateProfile } = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const sendMailController = require("../controller/sendMailController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-user", authMiddleware, isAdmin, getUsers);
router.post("/forget-password", forgetPassword);
router.post("/update-password", authMiddleware, updatePassword);
router.get("/getuser", authMiddleware, isAdmin, getUser);
router.put("/profile", authMiddleware, updateProfile);
router.get("/user-auth", authMiddleware, (req, res) => {
    res.status(200).send({ ok: true })
});
router.get("/admin-auth", authMiddleware, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});

router.post('/send', sendMailController);


module.exports = router;