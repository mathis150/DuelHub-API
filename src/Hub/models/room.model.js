import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("rooms", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        uuid_owner: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: true
        },
        message_count: {
            type: Datatypes.INTEGER,
            allowNull: true

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