'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Item, { foreignKey: "itemId", as: "item" });
      this.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });
    }
  }
  ItemOrder.init({
    orderId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemOrder',
  });
  return ItemOrder;
};