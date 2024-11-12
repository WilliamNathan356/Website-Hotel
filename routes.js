// Module/Library Import
const router = require("express").Router();

// Controller Import
const userController = require("./controller/userController");
const authorizationController = require("./controller/authorizationController");

// Register/Login
router.post("/register", authorizationController.register);
router.post("/login", authorizationController.login);

// User
router.get("/:userId", userController.getUser)

module.exports = router;