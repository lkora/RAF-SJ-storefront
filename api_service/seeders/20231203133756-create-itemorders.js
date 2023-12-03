'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ItemOrders', [
      { itemId: 1, orderId: 1, quantity: 10, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 2, orderId: 2, quantity: 5, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 3, orderId: 3, quantity: 2, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 4, orderId: 4, quantity: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ItemOrders', null, {});
  }
};
