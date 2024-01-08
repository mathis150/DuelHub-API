import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const Game = dbHub.define("games",{
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        series: {
            type: DataTypes.STRING,
        },
        studio: {
            type: DataTypes.STRING,
        },
        genre: {
            type: DataTypes.STRING,
        },
        desc: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.STRING,
        },
        added_at: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        }
    }
    ,{timestamp: false})
