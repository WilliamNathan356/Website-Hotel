// Module/Library Import
const router = require("express").Router();

// Controller Import
const userController = require("./controller/userController");
const roomController = require("./controller/roomController")
const authorizationController = require("./controller/authorizationController");
const bookingController = require("./controller/bookingController");

// Register/Login
router.post("/register", authorizationController.register);
router.post("/login", authorizationController.login);

// Rooms
router.post("/findRooms", roomController.getRooms);
router.post("/findRoom", roomController.findRoom);
router.get("/rooms/:roomID", roomController.findRoomWID);

// Room Booking
router.post('/book', bookingController.bookRoom);
router.get('/bookings/:email', bookingController.findBooking);

// User
router.get("/:userId", userController.getUser)

module.exports = router;    