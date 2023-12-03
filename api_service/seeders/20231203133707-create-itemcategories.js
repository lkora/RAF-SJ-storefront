'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ItemCategories', [
      { itemId: 1, categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 2, categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 3, categoryId: 3, createdAt: new Date(), updatedAt: new Date() },
      { itemId: 4, categoryId: 4, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ItemCategories', null, {});
  }
};
