const { DataTypes } = require("sequelize");
const roomModel = require('../model/room');
const userModel = require('../model/user');

const bookingModel = {
    bookingID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    userID: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'userID'
        }
    },
    roomID: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'rooms',
          key: 'roomID'
        }
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
            const done = await this.model.create({
                bookingID: data.bookingID,
                userID: data.userID,
                roomID: data.roomID,
                checkInDate: data.checkInDate,
                checkOutDate: data.checkOutDate,
            });

            return done;
        } catch (error) {
            console.error('Error creating booking: ', error);
            throw error;
        }  
    },
}