const express = require("express");
const { removeBgImage } = require("../controllers/imageController");
const upload = require("../middlewares/multer");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/remove-bg", upload.single("image"), auth, removeBgImage);

module.exports = router;