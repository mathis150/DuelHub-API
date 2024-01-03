import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("room_users", {
        uuid_room: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        uuid_user: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {timestamp: false})
}