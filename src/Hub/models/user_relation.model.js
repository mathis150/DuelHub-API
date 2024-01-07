import Sequelize from 'sequelize'

export const Relation = (sequelize) => {
    const model = sequelize.define("user_relations",{
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
    return model
}