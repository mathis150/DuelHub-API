import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("users", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        last_connection: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
        first_connection: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
    }, {timestamp: false})
}