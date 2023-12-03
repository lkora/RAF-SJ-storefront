'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.OrderStatus, { foreignKey: "statusId", as: "status" });
      this.belongsToMany(models.Item, { through: models.ItemOrder, foreignKey: "orderId", as: "items" });
    }
  }
  Order.init({
    orderedAt: DataTypes.DATE,
    statusId: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};