import { DataTypes, Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql::memory:')

export const User_Game = sequelize.define("user_games",{
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
