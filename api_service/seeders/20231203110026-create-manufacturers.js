'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Manufacturers', [
      { name: 'Texas Instruments', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fairchild Semiconductor', createdAt: new Date(), updatedAt: new Date() },
      { name: 'NXP Semiconductors', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Infineon Technologies', createdAt: new Date(), updatedAt: new Date() },
      { name: 'STMicroelectronics', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Manufacturers', null, {});
  }
};
