const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const app = express();
//port
const port = process.env.PORT || 8080;

// database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (error) {
        process.exit(1);
    }
}
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded
// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));


//rest api
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

connectDb().then(()=>{
    app.listen(port);  
})
