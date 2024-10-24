const express = require("express");
const { clerkWebhooks, userCredits } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/webhooks", clerkWebhooks);
router.get("/credits", auth, userCredits);

module.exports = router;