import Sequelize from 'sequelize'

export const User = (sequelize) => {
    const model = sequelize.define("users",{
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        confirmed: {
            type: Datatypes.BOOLEAN,
            default: false
        },
        last_connection: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
        first_connection: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
    }, {timestamp: false})
    return model
}