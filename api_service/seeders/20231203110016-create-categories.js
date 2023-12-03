'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Resistors', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Diodes', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Soldering Equipment', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Capacitors', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Transistors', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
