'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("request_item", "value_request_item", {
      allowNull: false,
      type: Sequelize.DECIMAL(15, 2),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("request_item", "value_request_item");
  }
};
