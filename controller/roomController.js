const roomModel = require("../model/room");
const moment = require("moment");

module.exports = {
    async getRooms(req, res) {
        try {
            // Set Payload
            const payload = req.body;
            const date = moment(payload.date).format('YYYY-MM-DD');
            const guest = payload.guestNum;
            const location = payload.location;
            const locate = location.charAt(0).toUpperCase() + location.slice(1);

            const rooms = JSON.parse(JSON.stringify(await roomModel.findRooms(date, guest, locate)));

            if (Object.keys(rooms).length > 0){
                const response = {
                    status: "Rooms Available",
                    rooms
                }
                res.status(200).send(response);
            } else {
                const response = {
                    status: "No Rooms Available",
                }
                res.status(200).send(response);
            }
        } catch(err) {
            console.log(err);
            const response = {
                status: 500,
                error: err, 
            }
            res.send(response);
        }
    }
}
