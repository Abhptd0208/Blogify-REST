'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();
    return queryInterface.bulkInsert('categories', [
      { name: 'NodeJs', createdAt: timestamp, updatedAt: timestamp },
      { name: 'Oracle', createdAt: timestamp, updatedAt: timestamp },
      { name: 'MOngo', createdAt: timestamp, updatedAt: timestamp },
      { name: 'php', createdAt: timestamp, updatedAt: timestamp },
      { name: 'java', createdAt: timestamp, updatedAt: timestamp }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', {}, null);
  }
};
