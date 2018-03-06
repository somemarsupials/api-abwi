'use strict';
module.exports = (sequelize, DataTypes) => {

  var Project = sequelize.define('project', {
    title: DataTypes.STRING
  }, {});

  Project.associate = function(models) {
    Project.hasMany(models.item, { onDelete: 'cascade' });
    Project.belongsTo(models.client, { onDelete: 'cascade' });
  };

  Project.prototype._sumItems = function(items) {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  Project.prototype.json = async function(params = {}) {
    if (!params.detail) {
      return this.dataValues;
    };

    let items = await this.getItems();
    let itemsValue = this._sumItems(items);

    return Object.assign({}, this.dataValues, { 
      items: items,
      value: itemsValue,
    });
  };

  return Project;
};
