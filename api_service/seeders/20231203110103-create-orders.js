'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      { orderedAt: new Date(), statusId: 1, price: 100.00, address: '123 Main St', createdAt: new Date(), updatedAt: new Date() },
      { orderedAt: new Date(), statusId: 2, price: 200.00, address: '456 Oak St', createdAt: new Date(), updatedAt: new Date() },
      { orderedAt: new Date(), statusId: 3, price: 150.00, address: '789 Pine St', createdAt: new Date(), updatedAt: new Date() },
      { orderedAt: new Date(), statusId: 1, price: 175.00, address: '321 Elm St', createdAt: new Date(), updatedAt: new Date() },
      { orderedAt: new Date(), statusId: 2, price: 225.00, address: '654 Maple St', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
