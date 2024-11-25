const { DataTypes } = require("sequelize");

const bookingModel = {
    bookingID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
};

module.exports = {
    initialise(sequelize) {
        this.model = sequelize.define("booking", bookingModel);
        return this.model;
    },

    async createBooking(data){
        try {
            return await this.model.create({
                bookingID: data.bookingID,
                userID: data.userID,
                roomID: data.roomID,
                checkInDate: data.checkIn,
                checkOutDate: data.checkOut,
            });
        } catch (error) {
            console.error('Error craeting booking: ', error);
            throw error;
        }
        
    },

    async findBooking(query){
        try {
            return await this.model.findOne({
                where: query,
            });
        } catch (error) {
            console.erorr('Error finding booking: ', err);
            throw error;
        }
    },
}