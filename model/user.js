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

    createUser: (user) => {
        return this.model.create(user);
    },

    findUser: (query) => {
        return this.model.findOne({
            where: query, 
        });
    }
};