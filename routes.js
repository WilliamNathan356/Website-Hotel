// Module/Library Import
const router = require("express").Router();

// Controller Import
const userController = require("./controller/userController");
const roomController = require("./controller/roomController")
const authorizationController = require("./controller/authorizationController");

// Register/Login
router.post("/register", authorizationController.register);
router.post("/login", authorizationController.login);

// Rooms
router.post("/findRooms", roomController.getRooms)

// User
router.get("/:userId", userController.getUser)

module.exports = router;    