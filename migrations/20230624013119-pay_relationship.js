"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('requests', 'form_of_payment', {
      type: Sequelize.BIGINT,
      allowNull: false, // Defina como true se o campo permitir valores nulos
    });
    await queryInterface.addConstraint("requests", {
      fields: ["form_of_payment"],
      type: "foreign key",
      references: {
        table: "type_payment",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('requests', 'form_of_payment', {
      type: Sequelize.STRING,
      allowNull: false, // Defina como true se o campo permitir valores nulos
    });
    await queryInterface.removeConstraint(
      "requests",
      "requests_form_of_payment"
    );
  },
};
