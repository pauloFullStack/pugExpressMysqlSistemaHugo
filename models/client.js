const Sequelize = require("sequelize");
const uuid = require("uuid");
const connectDB = require("../config/db");

const Client = connectDB.define("customers", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telephone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cpf_cnpj: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cep: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  neighborhood: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
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

module.exports = Client;
