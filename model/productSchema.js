const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    }],
    shipping: {
        type: Boolean,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);