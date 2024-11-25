// Modules/Library Import
const { DataTypes} = require("sequelize");
const { ROLES } = require("../config")

const userModel = {
    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,   
        defaultValue: ROLES.USER
    }
};

module.exports = {
    initialise(sequelize) {
        this.model = sequelize.define("user", userModel);
        return this.model
    },

    async createUser(user) {
        try {
            return await this.model.create({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            });
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async findUser(email) {
        return await this.model.findOne({
            where: {
            email: email
        }});
    },

    async findBooking(bookingModel){
        try {
            return this.model.findAll({ 
                include: bookingModel
            });
        } catch (error) {
            console.error('Error finding associated booking to this user: ', error);
            throw error;
        }
    }
};