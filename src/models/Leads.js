import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  origin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_customer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lastname: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  code_ital: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  company: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_leasing: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'leads',
  timestamps: true,
  createdAt: 'date_creation',  // Maps to date_creation in DB
  updatedAt: 'date_update'     // Maps to date_update in DB
});

export default Lead;
