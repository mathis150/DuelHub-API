import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const Room = dbHub.define("rooms",{
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
        created_at: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
    }, {timestamp: false})
