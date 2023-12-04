import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("games", {
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
        desc: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.DATE,
        },
        added_at: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        }
    }, {timestamp: false})
}