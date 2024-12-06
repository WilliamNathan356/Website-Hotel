// Modules/Library Import
const { DataTypes, Op, Sequelize } = require("sequelize");

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
    guestNumMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    guestNumMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    nextAvailableDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }

};

module.exports = {
    initialise(sequelize) {
        this.model = sequelize.define("room", roomModel);
        return this.model
    },

    async findRooms(uDate, uGuestNum, uLocation) {
        return await this.model.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('date', Sequelize.col('nextAvailableDate')), '<=', uDate),
                ],
                available: true ,
                guestNumMin: { [Op.lte]: uGuestNum},
                guestNumMax: { [Op.gte]: uGuestNum}, 
                location: { [Op.startsWith]: uLocation } 
            },
        });
    },
};