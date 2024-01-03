import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("user_games", {
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
}