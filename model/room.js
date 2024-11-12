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
    createRoom: (room) => {
        return this.model.create(room);
    },
    findRoom: (query) => {
        return this.model.findOne({
            where: query,
        });
    },
};