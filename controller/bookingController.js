const roomModel = require('../model/room');
const userModel = require('../model/user');
const bookingModel = require('../model/booking');
const moment = require('moment');

module.exports = {
    async bookRoom(req, res) {
        try {
            const payload = req.body;
            const uEmail = payload.email;
            const uRoomLocation = payload.location; 
            if (uEmail && uRoomLocation){
                const adultNum = payload.adultNum;
                if(payload.childNum > 0){
                    const childNum = payload.adultNum / 2;
                } else {
                    const childNum = 0;
                }
                
                const checkInDate = payload.checkInDate;
                const checkOutDate = payload.checkOutDate;

                // Book Function
                const user = JSON.parse(JSON.stringify(await userModel.findUser(uEmail)));
                const room = JSON.parse(JSON.stringify(await roomModel.findRoom(uRoomLocation)));
                
                // Format Dates
                const formatNextAvailable = moment(room.nextAvailableDate).format('YYYY-MM-DD');
                const formatCheckIn = moment(checkInDate).format('YYYY-MM-DD');

                // Check Room Availability
                if (room.available == true || formatNextAvailable <= formatCheckIn){
                    const userId = user.userID;
                    const roomId = room.roomID;
                    
                    // Create bookingID
                    const bookID = `${user.email};${moment(checkInDate).format('YYYYMMDD')};${moment(checkOutDate).format('YYYYMMDD')};${roomId}`

                    const data = {
                        bookingID: bookID,
                        userID: userId,
                        roomID: roomId,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate
                    }

                    console.log(data)

                    const bookedRoom = await bookingModel.createBooking(data);
                    const apiResponse = Object.entries(bookedRoom.dataValues);

                    // Update Room Availability
                    roomModel.updateRoom(checkOutDate, roomId)
                    const response = {
                        status: 'Success!',
                    };
                    res.status(200).send(response);    
                } else {
                    const response = {
                        status: 'The room is not available at this time! Try',
                        next: room.nextAvailableDate
                    }
                    res.status(200).send(response); 
                }

                
            } else {
                const response = {
                    status: 'Please Login/Register'
                }
                res.status(200).send(response);
            }

        } catch (err) {
            const response = {
                status: 500,
                error: err
            };
            res.send(response);
        }
    },

    async findBooking(req, res) {
        try{
            const payload = req.params;
            const uEmail = payload.email;

            const bookings = await userModel.findBooking(uEmail);

            const response = {
                status: 'Booking Retrieved!',
                booking: bookings
            }
            res.status(200).send(response);
            
        } catch (err) {
            const response = {
                status: 'Cannot Retrieve Booking',
                error: err
            }
            res.status(500).send(response);
        }
    }
}