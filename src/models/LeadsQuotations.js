import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LeadsQuotations = sequelize.define('LeadsQuotations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  id_lead: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'leads',
      key: 'id'
    }
  },
  quotation_reference: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'leads_quotations',
  timestamps: true,
  createdAt: 'date_creation',  // Maps to date_creation in DB
  updatedAt: 'date_update'     // Maps to date_update in DB
});

export default LeadsQuotations;
