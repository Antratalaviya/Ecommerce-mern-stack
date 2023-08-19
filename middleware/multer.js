const multer = require('multer');

const storage = multer.memoryStorage();

const singleUpload = multer({storage}).single('file');
// Wrap the singleUpload middleware with a custom function that includes a callback
function uploadFile(req, res, callback) {
    singleUpload(req, res, (err) => {
      if (err) {
        // Handle the error, if any, and pass it to the callback
        callback(err, null);
      } else {
        // Upload successful, call the callback with null error and the request object
        callback(null, req);
      }
    });
  }

module.exports =  uploadFile;