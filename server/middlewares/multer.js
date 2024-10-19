const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (re, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage });
module.exports = upload;
