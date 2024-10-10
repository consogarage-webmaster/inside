import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Affaire = sequelize.define('Affaire', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  date_update: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  origine: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  id_customer: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  current_state: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  quote_reference: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  customer_validation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  initial_query: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  zipcode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_order: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  code_ital: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  company: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'affaires',
  timestamps: false, // Désactive les timestamps automatiques de Sequelize si tu préfères gérer manuellement
});

export default Affaire;
