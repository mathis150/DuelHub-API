import { DataTypes, Sequelize} from 'sequelize'

const sequelize = new Sequelize('mysql::memory:')

export const Message = sequelize.define("messages",{
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        uuid_room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        uuid_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        uuid_reply: {
            type: DataTypes.UUID,
        },
        published: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
    }, {timestamp: false})