import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("genres", {
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
        desc: {
            type: DataTypes.TEXT,
        },
    }, {timestamp: false})
}