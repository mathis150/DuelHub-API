import { DataTypes, Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql::memory:')

export const User_Room = sequelize.define("user_rooms",{
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
