import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const User_Game = dbHub.define("user_games",{
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
