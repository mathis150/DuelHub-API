import { DataTypes, Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql::memory:')

export const Room = sequelize.define("rooms",{
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
