const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");

const RequestItem = connectDB.define(
  "request_item",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.BIGINT,
    },
    id_requests: {
      allowNull: false,
      type: Sequelize.BIGINT,
    },
    id_products: {
      allowNull: false,
      type: Sequelize.BIGINT,
    },
    value_request_item: {
      allowNull: false,
      type: Sequelize.DECIMAL(15, 2),
    },
    createdBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("NOW()"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("NOW()"),
    },
    deleteAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = RequestItem;
