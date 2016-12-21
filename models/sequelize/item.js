const DataTypes = require('sequelize');

module.exports = function (sequelize) {
    let Item = sequelize.define("item", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT
    }, {
        tableName: 'item',
        schema: 'item',
        timestamps: false
    });

    Item.sync();
    return Item
};