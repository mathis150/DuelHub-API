const { DataTypes } = require('sequelize')

module.exports = (instance) => {
    return instance.define("wiki_articles", {
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
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT(long),
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING(32),
            allowNull: true
        },
        uuid_author: {
            type: DataTypes.UUID,
            allowNull: false
        },
        published: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
        visibility: {
            type: DataType.TINY(1),
            defaultValues: 0,
            Comment: "0: Private, 1: Editor Only, 2: Visible"
        }
    }, {timestamp: false})
}