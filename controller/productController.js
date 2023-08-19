const slugify = require("slugify");
const Product = require("../model/productSchema");
const Category = require("../model/categorySchema");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary").v2;

const createProduct = async (req, res) => {
    try {
        const file = req.file;

        if (!req.body.name || !req.body.description || !req.body.category || !req.body.price || !req.body.quantity) {
            return res.status(404).send({
                success: false,
                message: "all fields are medetory"
            })
        }
        // upload image here
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.uploader.upload(fileUri.content);

        const product = await new Product({
            ...req.body,
            slug: slugify(req.body.name),
            image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }).save();
        res.status(201).send({
            success: true,
            message: 'New product created',
            product
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error
        })
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const existProduct = await Product.findById(id)
        if (req.file) {
            const file = req.file;
            // upload image here
            const fileUri = getDataUri(file);
            const myCloud = await cloudinary.uploader.upload(fileUri.content);
            existProduct.image = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
            await existProduct.save();
        }
        const product = await Product.findByIdAndUpdate(id, {
            ...req.body,
            slug: slugify(req.body.name),
        }, { new: true });
        res.status(201).send({
            success: true,
            message: 'product updated',
            product
        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error
        })
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.find({}).populate("category").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All products",
            product
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        });
    };
}

const getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug }).populate("category");
        if (product) {
            res.status(200).send({
                success: true,
                message: "required product",
                product
            })
        }
        else {
            res.status(404).send({
                success: true,
                message: "product not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product) {
            await Product.findByIdAndDelete(id);
            res.status(200).send({
                success: true,
                message: "Product is deleted"
            })
        } else {
            res.status(404).send({
                success: true,
                message: "Product is not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: true,
            error
        })
    }
}

const filterProduct = async (req, res) => {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
    try {
        const product = await Product.find(args).populate('category');
        if (product) {
            return res.status(200).send({
                success: true,
                message: "Products filtered",
                product

            });
        } else {
            return res.status(404).send({
                success: false,
                message: "No product available"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const totalProduct = async (req, res) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: 'Total Products',
            total
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const pageProduct = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const product = await Product.find({})
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('category')
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'products page',
            product
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        });
    }
}

const searchResult = async (req, res) => {
    const { keyword } = req.params;
    try {
        const results = await Product.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.json(results);
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        });
    }
}

const similarProduct = async (req, res) => {
    const { pid, cid } = req.params;
    try {
        const product = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).limit(3).populate('category').sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Similar products",
            product
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        });
    }
}

const categoryProduct = async (req, res) => {
    const {slug} = req.params;
    try {
        const category = await Category.findOne({slug});
        const product = await Product.find({category}).populate('category').sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:"category Products",
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        });
    } 
}

module.exports = {
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
}