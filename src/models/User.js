import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'date_creation',  // Maps to date_creation in DB
  updatedAt: 'date_update'     // Maps to date_update in DB
});

export default User;
