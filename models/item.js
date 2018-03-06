'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('item', {
    description: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});

  Item.associate = function(models) {
    Item.belongsTo(models.project, { onDelete: 'CASCADE' });
  };

  Item.prototype.json = function(params = {}) {
    return this.dataValues;
  };

  return Item;
};
