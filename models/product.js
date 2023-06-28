const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");

const Product = connectDB.define("products", {
  id: { 
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  value_product: {
    allowNull: false,
    type: Sequelize.DECIMAL(15, 2),
  },
  quantity: {
    allowNull: false,
    type: Sequelize.INTEGER,
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
});

module.exports = Product;
