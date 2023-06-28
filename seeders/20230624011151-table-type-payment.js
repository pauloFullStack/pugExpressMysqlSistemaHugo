"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("type_payment", [
      {
        name: "Cartão de crédito",
      },
      {
        name: "Pix",
      },
      {
        name: "Boleto",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("type_payment", null, {});
  },
};
