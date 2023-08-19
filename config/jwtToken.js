const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    const token = jwt.sign({id}, process.env.SECREAT_KEY, {expiresIn: "1d"});
    return token;
}

module.exports = generateToken;