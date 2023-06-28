const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");

const Request = connectDB.define("requests", {
  id: { 
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  id_client: {
    allowNull: false,
    type: Sequelize.UUID,
  },
  comments: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  form_of_payment: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  value_request: {
    allowNull: false,
    type: Sequelize.DECIMAL(15, 2),
  },
  delivery_date: {
    allowNull: false,
    type: Sequelize.DATE,
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
// Request.removeAttribute('id');
module.exports = Request;
