'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('client', {
    name: DataTypes.STRING
  }, {});

  Client.associate = function(models) {
    Client.hasMany(models.project, { onDelete: 'cascade' });
  };

  Client.prototype.json = async function(params = {}) {
    if (!params.detail || params.detail === 'false') {
      return this.dataValues;
    };

    let projects = await this.getProjects();

    return Object.assign({}, this.dataValues, { 
      projects: projects
    });
  };

  return Client;
};
