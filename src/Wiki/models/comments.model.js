const { DataTypes } = require('sequelize')

module.exports = (instance) => {
    return instance.define("wiki_comments", {
        uuid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        uuid_author: {
            type: DataTypes.UUID,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT(long),
            allowNull: true
        },
        published: {
            type: DataTypes.DATE,
            defaultValues: DataTypes.NOW
        },
        modified: {
            type: DataTypes.BOOLEAN,
            defaultValues: false
        },
        uuid_article: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {timestamp: false})
}