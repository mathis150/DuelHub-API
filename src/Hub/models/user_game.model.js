import Sequelize from 'sequelize'

export const User_Game = (sequelize) => {
    const model = sequelize.define("user_games",{
        uuid_user: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        uuid_game: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {timestamp: false})
    return model
}