"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("requests", "value_request", {
      allowNull: false,
      type: Sequelize.DECIMAL(15, 2),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("requests", "value_request");
  },
};
