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
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true,
    }

};

module.exports = {
    initialise(sequelize) {
        this.model = sequelize.define("room", roomModel);
        return this.model
    },

    async findRoom(uName){
        return await this.model.findOne({
            where: {
                roomName: uName
            }
        })
    },

    async findRooms(uDate, uGuestNum, uLocation) {
        if (uLocation == 'Any'){
            return await this.model.findAll({
                where: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('date', Sequelize.col('nextAvailableDate')), '<=', uDate),
                    ],
                    available: true ,
                    guestNumMin: { [Op.lte]: uGuestNum},
                    guestNumMax: { [Op.gte]: uGuestNum}
                },
            });
        } else {
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
        }
    },

    
    async updateRoom(checkOutDate, roomId){
        return this.model.update(
            { 
                available: false,
                nextAvailableDate: checkOutDate   
            },
            {
                where: {
                    roomID: roomId
                }
            }
        )
    }
};