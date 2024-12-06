import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Zipcode = sequelize.define(
  'Zipcode',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'zipcode',
    timestamps: true,
    createdAt: 'date_creation', // Maps to date_creation in DB
    updatedAt: 'date_update', // Maps to date_update in DB
  }
);

export default Zipcode;
