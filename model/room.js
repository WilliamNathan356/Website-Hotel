// Modules/Library Import
const { DataTypes } = require("sequelize");

const roomModel = {
    roomID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomSize: {
        type: DataTypes.STRING,
        allowNull: false,
    }   
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("room", roomModel);
    },
    async createRoom(room) {
        try {
            return await this.model.create(room);
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    },

    async findRoom(query) {
        try {
            return await this.model.findOne({
                where: query,
            });
        } catch (error) {
            console.error('Error finding room:', error);
            throw error;
        }
    },
};