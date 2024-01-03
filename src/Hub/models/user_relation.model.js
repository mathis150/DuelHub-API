import Datatypes from 'sequelize'

module.exports = (instance) => {
    return instance.define("user_relations", {
        uuid_user_primary: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        uuid_user_secondary: {
            type: DataTypes.UUID,
            allowNull: false
        },
        relation: {
            type: Datatypes.STRING,
            allowNull: false
        }
    }, {timestamp: false})
}