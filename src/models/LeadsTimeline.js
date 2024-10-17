import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LeadsTimeline = sequelize.define('LeadsTimeline', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'leads_timeline',
  timestamps: true,
  createdAt: 'date_creation',  // Maps to date_creation in DB
  updatedAt: 'date_update'     // Maps to date_update in DB
});

export default LeadsTimeline;
