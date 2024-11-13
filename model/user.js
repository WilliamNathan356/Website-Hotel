// Modules/Library Import
const { DataTypes} = require("sequelize");
const { ROLES } = require("../config")

const userModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    initialise: (sequelize) => {
        this.model = sequelize.define("user", userModel);
    },

    async createUser(user) {
        try {
            return await this.model.create(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async findUser(query) {
        try {
            return await this.model.findOne({
                where: query,
            });
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }
};