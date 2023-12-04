import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("studios", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        studio_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
        },
    }, {timestamp: false})
}