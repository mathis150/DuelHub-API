import { dbHub } from '../services/sequelize.service.js'
import { DataTypes,Sequelize } from 'sequelize'

export const Relation = dbHub.define("user_relations",{
        uuid_user_primary: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        uuid_user_secondary: {
            type: DataTypes.UUID,
            allowNull: false
        },
        relation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamp: false})
