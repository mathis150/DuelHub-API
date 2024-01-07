import { DataTypes, Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql::memory:')

export const Relation = sequelize.define("user_relations",{
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
