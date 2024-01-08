import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const User_Room = dbHub.define("user_rooms",{
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        uuid_room: {
            type: DataTypes.UUID,
            allowNull: false
        },
        uuid_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        rank: {
            type: DataTypes.STRING,
            default: "member"
        }
    }, {timestamp: false})
