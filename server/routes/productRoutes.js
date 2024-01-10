const express = require("express");
const { 
    createProduct, 
    getProduct, 
    getSingleProduct, 
    deleteProduct, 
    updateProduct, 
    filterProduct, 
    totalProduct, 
    pageProduct,
    searchResult,
    similarProduct,
    categoryProduct
} = require("../controller/productController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const uploadFile = require("../middleware/multer");
const router = express.Router();

router.post('/create-product', authMiddleware, isAdmin,uploadFile ,createProduct);
router.get('/get-product',getProduct);
router.get('/get-product/:slug' ,getSingleProduct);
router.delete('/delete-product/:id', authMiddleware, isAdmin ,deleteProduct);
router.put('/update-product/:id', authMiddleware, isAdmin,uploadFile ,updateProduct);
router.post('/product-filter', filterProduct);
router.get('/product-total', totalProduct);
router.get('/product-list/:page', pageProduct);
router.get('/search/:keyword', searchResult);
router.get('/product-similar/:pid/:cid', similarProduct);
router.get('/category-product/:slug', categoryProduct);


module.exports = router;