const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true,
    },
    slug : {
        type : String,
        lowercase : true,
    },
}, {timestamps : true});

module.exports = mongoose.model("Category", categorySchema);