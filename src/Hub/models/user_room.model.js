import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const User_Room = dbHub.define("user_rooms",{
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
