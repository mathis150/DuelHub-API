import Sequelize from 'sequelize'

export const User_Room = (sequelize) => {
    const model = sequelize.define("user_users",{
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
    return model
}