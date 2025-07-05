const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUser);

module.exports = router;

// const express = require("express");
// const { loginUser } = require("../controllers/authController");
// const router = express.Router();

// router.post("/login", loginUser);

// module.exports = router;
