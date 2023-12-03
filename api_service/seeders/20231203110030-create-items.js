'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        name: '1K Ohm Resistor',
        description: 'A 1K Ohm resistor used in various electronic circuits.',
        manufacturerId: 1,
        available: 100,
        price: 0.10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1N4007 Diode',
        description: 'A popular 1A general-purpose diode.',
        manufacturerId: 2,
        available: 50,
        price: 0.50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Weller WLC100 Soldering Iron',
        description: 'A high-performance soldering iron from Weller.',
        manufacturerId: 3,
        available: 25,
        price: 44.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kester 44 Rosin Core Solder',
        description: 'A high activity, rosin activated flux for excellent performance.',
        manufacturerId: 4,
        available: 30,
        price: 24.99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Add similar bulkInsert calls for other tables as needed
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
    // Add similar bulkDelete calls for other tables as needed
  }
};
