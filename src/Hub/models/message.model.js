import Sequelize from 'sequelize'

export const Message = (sequelize) => {
    const model = sequelize.define("messages",{
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
            type: DataTypes.TEXT(long),
            allowNull: true
        },
        uuid_user: {
            type: DataTypes.UUID,
            allowNull: false
        },
        uuid_reply: {
            type: Datatypes.UUID
        },
        published: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
    }, {timestamp: false})
    return model
}