const express = require("express");
const router = express.Router();
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware");
const { createCategory, updateCategory, getCategory, getSingleCategory, deleteCategory } = require("../controller/categoryController");

router.post('/create-category', authMiddleware, isAdmin, createCategory);
router.put('/update-category/:id', authMiddleware, isAdmin, updateCategory);
router.get('/get-category', getCategory);
router.get('/get-category/:slug', getSingleCategory);
router.delete('/delete-category/:id', authMiddleware, isAdmin, deleteCategory);

module.exports = router;