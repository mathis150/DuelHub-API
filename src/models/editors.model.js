const { DataTypes } = require('sequelize')

module.exports = (instance) => {
    return instance.define("wiki_editors", {
        uuid_author: {
            type: DataTypes.UUID,
            allowNull: false
        },
        uuid_article: {
            type: DataTypes.UUID,
            allowNull: false
        },
        numEdit: {
            type: DataTypes.INTEGER,
            defaultValues: 0
        },
        pushRequest: {
            type: DataTypes.BOOLEAN,
            defaultValues: false
        }
    }, {timestamp: false})
}