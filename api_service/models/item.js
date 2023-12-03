'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Manufacturer, { foreignKey: "manufacturerId", as: "manufacturer" });
      this.belongsToMany(models.Category, { through: models.ItemCategory, foreignKey: "itemId", as: "categories" });
      this.belongsToMany(models.Order, { through: models.ItemOrder, foreignKey: "itemId", as: "orders" });
    }
    }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    manufacturerId: DataTypes.INTEGER,
    available: DataTypes.NUMBER,
    price: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};