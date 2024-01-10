'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { username: "petar", password: "", admin: true, email: "petarpetrovic@gmail.com", createdAt: new Date(), updatedAt: new Date()  },
      { username: "luka", password: "", admin: true, email: "lukalukic@gmail.com", createdAt: new Date(), updatedAt: new Date()  },
      { username: "marko", password: "", admin: false, email: "markomarkovic@gmail.com", createdAt: new Date(), updatedAt: new Date()  },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
