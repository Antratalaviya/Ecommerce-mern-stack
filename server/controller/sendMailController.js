const nodemailer = require("nodemailer");
const multiparty = require("multiparty");

const transporter = nodemailer.createTransport({
    service: "gmail", //replace with your email provider
    port: 587, 
    // 587
    secure : false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },      
});
  
// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      throw new Error(error)
    } 
});

const sendMailController = (req, res) =>{
    //1.
    const info = req.body;
  let form = new multiparty.Form(info);
  let data = {};
  form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });  

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: 'This is Ecommerce Customer Contact Message',
      text: `${data.name} <${data.email}> \n${data.message}`,  
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({
          success : false,
          message : "Something went wrong."
        });
      } else {
        res.status(200).send({
          success : true,
          message : "Email successfully sent to recipient!"
        });
      }
    });
  });
}

module.exports = sendMailController;