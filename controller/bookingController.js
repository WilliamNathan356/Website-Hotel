const roomModel = require('../model/room');
const userModel = require('../model/user');
const bookingModel = require('../model/booking');
const moment = require('moment');

module.exports = {
    async bookRoom(req, res) {
        try {
            const payload = req.body;
            console.log(payload)
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
                
                // Check Room Availability
                if (room.available == true){
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
                    const apiResponse = Object.entries(bookedRoom.dataValues)

                    // Update Room Availability
                    roomModel.updateRoom(checkOutDate, roomId)
                    const response = {
                        status: 'Success!',
                    };
                    res.status(200).send(response);    
                } else {
                    alert(`The room is not available at this time! Try ${room.nextAvailableDate}`)
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
    }
}