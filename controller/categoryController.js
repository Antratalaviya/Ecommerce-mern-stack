const slugify = require("slugify");
const Category = require("../model/categorySchema");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        //validation
        if (!name) {
            return res.status(401).send("Name is required");
        }
        const existedCategory = await Category.findOne({ name });
        if (existedCategory) {
            return res.status(200).send({
                success: false,
                message: 'Category already Exists'
            });
        };
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: 'new Category Created',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const categoryExist = await Category.findById(id);
        if (categoryExist) {
            categoryExist.name = name;
            categoryExist.slug = slugify(name);
            await categoryExist.save();
            return res.status(200).send({
                success: true,
                message: 'Category updated'
            })
        } else {
            return res.status(404).send({
                success: true,
                message: 'Category not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
            success: true,
            message: 'All Category',
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug });
        if (category) {
            return res.status(200).send({
                success: true,
                message: "required Category",
                category
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (category) {
            await Category.findByIdAndDelete(id);
            return res.status(200).send({
                success: true,
                message: "Category deleted"
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'Category not Found'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error
        })
    }

}

module.exports = {
    createCategory,
    updateCategory,
    getCategory,
    getSingleCategory,
    deleteCategory
}